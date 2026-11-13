#!/bin/bash
# ==============================================================================
# CENTEKS Destek - Otomatik Nginx & API Teşhis ve Düzeltme Aracı (fix.sh)
# ==============================================================================
set -e

echo "=========================================================="
echo " [1/3] Köprü Servisi (centeks-bridge) Kontrol Ediliyor... "
echo "=========================================================="
sudo systemctl daemon-reload
sudo systemctl enable centeks-bridge
sudo systemctl restart centeks-bridge
sleep 2

if curl -s http://127.0.0.1:8000/api/health | grep -q "ok"; then
    echo "✅ Köprü servisi (Python Port 8000) ÇALIŞIYOR!"
else
    echo "⚠️ Köprü servisi başlatılamadı, loglar:"
    sudo journalctl -u centeks-bridge -n 10 --no-pager
fi

echo "=========================================================="
echo " [2/3] Nginx Konfigürasyonuna /api/ Enjekte Ediliyor...   "
echo "=========================================================="
sudo python3 -c '
import os, glob, subprocess

# Nginx dosyalarini tara
found = []
for p in ["/etc/nginx/sites-enabled/*", "/etc/nginx/conf.d/*.conf", "/etc/nginx/sites-available/*"]:
    for f in glob.glob(p):
        if os.path.isfile(f):
            try:
                with open(f, "r", encoding="utf-8") as fp:
                    c = fp.read()
                    if "panel.centeks.com" in c or "centeks-panel" in c:
                        found.append(f)
            except Exception:
                pass

if not found:
    for f in ["/etc/nginx/sites-available/default", "/etc/nginx/conf.d/default.conf"]:
        if os.path.isfile(f):
            found.append(f)
            break

print("Bulunan Nginx dosyalari:", found)

api_block = """
    # CENTEKS Destek Canli API Koprusu
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
"""

for target in found:
    with open(target, "r", encoding="utf-8") as fp:
        content = fp.read()

    if "location /api/" in content:
        print("-> /api/ zaten ekli:", target)
        continue

    # root /var/www/centeks-panel varsa hemen arkasina ekle
    if "centeks-panel" in content:
        pos = content.find("centeks-panel")
        end_line = content.find(";", pos)
        if end_line != -1:
            new_content = content[:end_line+1] + api_block + content[end_line+1:]
        else:
            idx = content.rfind("}")
            new_content = content[:idx] + api_block + content[idx:]
    else:
        idx = content.rfind("}")
        new_content = content[:idx] + api_block + content[idx:]

    with open(target, "w", encoding="utf-8") as fp:
        fp.write(new_content)
    print("-> /api/ basariyla enjekte edildi:", target)

subprocess.run(["nginx", "-t"], check=True)
subprocess.run(["systemctl", "reload", "nginx"], check=True)
print("✅ Nginx basariyla test edildi ve yenilendi!")
'

echo "=========================================================="
echo " [3/3] Canlı Uç Nokta Testi (/api/devices)                "
echo "=========================================================="
HTTP_CODE=$(curl -s -o /dev/null -w "%{http_code}" https://panel.centeks.com/api/devices || echo "000")
if [ "$HTTP_CODE" = "200" ]; then
    echo "🎉 TEBRİKLER! https://panel.centeks.com/api/devices 200 OK yanıtı veriyor!"
    echo "Şimdi panel.centeks.com sayfasını yenileyin; yeşil ışık yanacak ve istemci panele düşecektir."
else
    echo "Yanıt Kodu: $HTTP_CODE. Yerel test:"
    curl -i http://127.0.0.1:8000/api/devices
fi
echo "=========================================================="
