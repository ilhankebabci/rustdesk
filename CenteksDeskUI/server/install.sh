#!/bin/bash
# ==============================================================================
# CENTEKS Destek - Canlı RustDesk API Köprüsü Otomatik Kurulum Scripti
# ==============================================================================
set -e

echo ">>> [1/5] Dizinler oluşturuluyor..."
sudo mkdir -p /opt/centeks-bridge
sudo mkdir -p /var/lib/centeks-bridge
sudo mkdir -p /var/www/centeks-panel/downloads

echo ">>> [2/5] Köprü servisi (bridge.py) indiriliyor..."
sudo curl -sSL https://raw.githubusercontent.com/ilhankebabci/rustdesk/master/CenteksDeskUI/server/bridge.py -o /opt/centeks-bridge/bridge.py
sudo chmod +x /opt/centeks-bridge/bridge.py

echo ">>> [3/5] Güncel Web Arayüzü (index.html) çekiliyor..."
sudo curl -sSL https://raw.githubusercontent.com/ilhankebabci/rustdesk/master/CenteksDeskUI/standalone.html -o /var/www/centeks-panel/index.html

echo ">>> [4/5] Windows İstemcisi indiriliyor..."
sudo curl -L https://github.com/ilhankebabci/rustdesk/releases/download/v1.5.3/CenteksDestek-x86_64.exe -o /var/www/centeks-panel/downloads/CenteksDestek-x86_64.exe

echo ">>> [5/5] Systemd servisi yapılandırılıyor..."
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

echo "------------------------------------------------------------------"
echo "✅ CENTEKS Destek Köprüsü başarıyla kuruldu ve başlatıldı!"
echo "Durumu kontrol etmek için: sudo systemctl status centeks-bridge"
echo "------------------------------------------------------------------"
