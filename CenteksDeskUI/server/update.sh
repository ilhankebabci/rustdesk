#!/bin/bash
set -e
echo ">>> [1/3] Güncel Web Arayüzü (standalone.html -> index.html) indiriliyor..."
sudo curl -sSL https://raw.githubusercontent.com/ilhankebabci/rustdesk/master/CenteksDeskUI/standalone.html -o /var/www/centeks-panel/index.html

echo ">>> [2/3] Güncel Köprü Servisi (bridge.py) indiriliyor..."
sudo curl -sSL https://raw.githubusercontent.com/ilhankebabci/rustdesk/master/CenteksDeskUI/server/bridge.py -o /opt/centeks-bridge/bridge.py
sudo chmod +x /opt/centeks-bridge/bridge.py

echo ">>> [3/3] Köprü Servisi ve Nginx yeniden başlatılıyor..."
sudo systemctl daemon-reload
sudo systemctl restart centeks-bridge
sudo systemctl reload nginx

echo "------------------------------------------------------------------"
echo "✅ CENTEKS Destek Paneli & Köprü Servisi başarıyla güncellendi!"
echo "------------------------------------------------------------------"
