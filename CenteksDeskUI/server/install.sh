#!/bin/bash
# ==============================================================================
# CENTEKS Destek - Canlı RustDesk API Köprüsü Otomatik Kurulum Scripti
# ==============================================================================
set -e

echo ">>> [1/6] Dizinler oluşturuluyor..."
sudo mkdir -p /opt/centeks-bridge
sudo mkdir -p /var/lib/centeks-bridge
sudo mkdir -p /var/www/centeks-panel/downloads

echo ">>> [2/6] Köprü servisi (bridge.py) indiriliyor..."
sudo curl -sSL https://raw.githubusercontent.com/ilhankebabci/rustdesk/master/CenteksDeskUI/server/bridge.py -o /opt/centeks-bridge/bridge.py
sudo chmod +x /opt/centeks-bridge/bridge.py

echo ">>> [3/6] Güncel Web Arayüzü (index.html) çekiliyor..."
sudo curl -sSL https://raw.githubusercontent.com/ilhankebabci/rustdesk/master/CenteksDeskUI/standalone.html -o /var/www/centeks-panel/index.html

echo ">>> [4/6] Windows İstemcisi indiriliyor..."
sudo curl -L https://github.com/ilhankebabci/rustdesk/releases/download/v1.5.3/CenteksDestek-x86_64.exe -o /var/www/centeks-panel/downloads/CenteksDestek-x86_64.exe

echo ">>> [5/6] Systemd servisi yapılandırılıyor..."
cat << 'EOF' | sudo tee /etc/systemd/system/centeks-bridge.service > /dev/null
[Unit]
Description=CENTEKS Destek - RustDesk Cihaz & API Koprusu
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/opt/centeks-bridge
ExecStart=/usr/bin/python3 /opt/centeks-bridge/bridge.py
Restart=always
RestartSec=5
Environment=CENTEKS_PORT=8000
Environment=RUSTDESK_DB_PATH=/root/db.sqlite3

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable centeks-bridge
sudo systemctl restart centeks-bridge

echo ">>> [6/6] Nginx API yönlendirmesi otomatik yapılandırılıyor..."
sudo python3 -c '
import os, glob, subprocess

candidates = glob.glob("/etc/nginx/sites-enabled/*") + glob.glob("/etc/nginx/conf.d/*.conf") + glob.glob("/etc/nginx/sites-available/*")
target_file = None

for f in candidates:
    if os.path.isfile(f):
        try:
            with open(f, "r", encoding="utf-8") as fp:
                c = fp.read()
                if "panel.centeks.com" in c or "centeks-panel" in c:
                    target_file = f
                    break
        except Exception:
            pass

if not target_file:
    for f in ["/etc/nginx/sites-available/default", "/etc/nginx/conf.d/default.conf"]:
        if os.path.isfile(f):
            target_file = f
            break

if target_file and os.path.isfile(target_file):
    with open(target_file, "r", encoding="utf-8") as fp:
        cfg = fp.read()

    if "location /api/" not in cfg:
        block = """
    # CENTEKS Destek API Koprusu
    location /api/ {
        proxy_pass http://127.0.0.1:8000/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }
}"""
        idx = cfg.rfind("}")
        if idx != -1:
            new_cfg = cfg[:idx] + block + cfg[idx+1:]
            with open(target_file, "w", encoding="utf-8") as fp:
                fp.write(new_cfg)
            print("Nginx dosyasina (/api/) eklendi:", target_file)

try:
    subprocess.run(["nginx", "-t"], check=True)
    subprocess.run(["systemctl", "reload", "nginx"], check=True)
    print("Nginx basariyla test edildi ve yenilendi!")
except Exception as e:
    print("Nginx yenileme uyarisi:", e)
'

echo "------------------------------------------------------------------"
echo "✅ CENTEKS Destek Köprüsü & Nginx API yönlendirmesi başarıyla tamamlandı!"
echo "Durum: sudo systemctl status centeks-bridge"
echo "------------------------------------------------------------------"
