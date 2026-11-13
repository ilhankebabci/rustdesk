#!/bin/bash
# ==============================================================================
# CENTEKS Destek - Nginx HTTPS Port 443 /api/ Enjektörü ve Teşhis Aracı (v3.0)
# ==============================================================================
set -e

echo ">>> [1/3] Mevcut Nginx Dosyası İnceleniyor..."
sudo python3 -c '
import os, re, subprocess

config_path = "/etc/nginx/sites-available/panel.centeks.com"
if not os.path.exists(config_path):
    for f in ["/etc/nginx/sites-enabled/panel.centeks.com", "/etc/nginx/conf.d/panel.conf", "/etc/nginx/sites-available/default"]:
        if os.path.exists(f):
            config_path = f
            break

print("Hedef dosya:", config_path)
with open(config_path, "r", encoding="utf-8") as f:
    text = f.read()

# Eski/hatali eklenmis location /api/ bloklarini temizle
text = re.sub(r"\s*#\s*CENTEKS Destek.*?\n\s*location /api/ \{.*?\n\s*\}", "", text, flags=re.DOTALL)
text = re.sub(r"\s*location /api/ \{.*?\n\s*\}", "", text, flags=re.DOTALL)

api_block = """
    # CENTEKS Destek Canli API Koprusu (Port 8000)
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
"""

# Dosyada birden fazla server { ... } blogu olabilir (orn: 80 ve 443)
# Her server blogunun sonuna (kapanis parantezinden hemen once) ekle
parts = text.split("server {")
new_parts = [parts[0]]

for part in parts[1:]:
    # Bu server blogunun son } karakterini bul
    idx = part.rfind("}")
    if idx != -1:
        mod_part = part[:idx] + api_block + part[idx:]
        new_parts.append(mod_part)
    else:
        new_parts.append(part)

final_text = "server {".join(new_parts)

with open(config_path, "w", encoding="utf-8") as f:
    f.write(final_text)

print("✅ Hem HTTP (80) hem HTTPS (443) bloklarina /api/ eklendi!")

subprocess.run(["nginx", "-t"], check=True)
subprocess.run(["systemctl", "reload", "nginx"], check=True)
print("✅ Nginx basariyla yenilendi!")
'

echo ">>> [2/3] Canlı Uç Nokta Doğrulaması Yapılıyor..."
sleep 1
curl -i -k https://127.0.0.1/api/devices -H "Host: panel.centeks.com"

echo ""
echo "=========================================================="
echo "✅ İŞLEM TAMAMLANDI! Tarayıcınızda panel.centeks.com açın."
echo "=========================================================="
