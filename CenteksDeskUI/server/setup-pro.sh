#!/bin/bash
# ==============================================================================
# CENTEKS Destek - RustDesk API Server Pro Otomatik Kurulum Scripti
# ==============================================================================
set -e

echo "=========================================================="
echo " [1/4] Docker ve Bağımlılıklar Kontrol Ediliyor..."
echo "=========================================================="
if ! command -v docker &> /dev/null; then
    echo "Docker bulunamadı, otomatik kuruluyor..."
    curl -fsSL https://get.docker.com -o get-docker.sh
    sh get-docker.sh
    rm -f get-docker.sh
    systemctl enable docker
    systemctl start docker
    echo "✅ Docker başarıyla kuruldu!"
else
    echo "✅ Docker zaten kurulu."
fi

echo "=========================================================="
echo " [2/4] Dizin ve Konfigürasyon Dosyaları Hazırlanıyor..."
echo "=========================================================="
mkdir -p /opt/rustdesk-api-pro

cat << 'EOF' > /opt/rustdesk-api-pro/server.yaml
debugMode: false
signKey: "centeks-super-secret-key-2026-auth-32chars"

db:
  driver: "sqlite"
  dsn: "/app/data/server.db"
  timeZone: "Europe/Istanbul"
  showSql: false

httpConfig:
  printRequestLog: false
  port: ":8080"
  staticdir: "/app/dist"

smtpConfig: null

jobsConfig:
  deviceCheckJob:
    duration: 30
EOF

echo "=========================================================="
echo " [3/4] Konteyner İndiriliyor ve Başlatılıyor..."
echo "=========================================================="
# Eski konteyner varsa temizle
if [ "$(docker ps -aq -f name=rustdesk-api-server-pro)" ]; then
    echo "Eski konteyner durduruluyor ve kaldırılıyor..."
    docker stop rustdesk-api-server-pro > /dev/null 2>&1 || true
    docker rm rustdesk-api-server-pro > /dev/null 2>&1 || true
fi

docker run -d \
  --name rustdesk-api-server-pro \
  --restart unless-stopped \
  -e ADMIN_USER=admin \
  -e ADMIN_PASS=Centeks2027! \
  -e TZ=Europe/Istanbul \
  -p 8080:8080 \
  -v /opt/rustdesk-api-pro/server.yaml:/app/server.yaml \
  -v /opt/rustdesk-api-pro/server.yaml:/app/data/server.yaml \
  -v /opt/rustdesk-api-pro:/app/data \
  ghcr.io/lantongxue/rustdesk-api-server-pro:latest

sleep 5

echo "Admin kullanıcısı doğrulanıyor..."
docker exec rustdesk-api-server-pro rustdesk-api-server-pro user add admin Centeks2027! --admin > /dev/null 2>&1 || true

echo "=========================================================="
echo " [4/4] Kurulum Tamamlandı!"
echo "=========================================================="
echo "🚀 RustDesk API Server Pro çalışıyor!"
echo ""
echo "🌐 Web Yönetim Paneli: http://panel.centeks.com:8080 (veya http://192.168.16.19:8080)"
echo "👤 Kullanıcı Adı: admin"
echo "🔑 Parola: Centeks2027!"
echo "=========================================================="
