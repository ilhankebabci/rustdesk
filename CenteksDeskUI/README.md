# CENTEKS Destek - RMM & Uzak Masaüstü Yönetim Paneli

TeamViewer / AnyDesk muadili, kurumsal IT operasyonları için geliştirilmiş modern, minimalist ve karanlık temalı (Dark Mode / Slate-950) Uzak Masaüstü ve Cihaz Yönetim Paneli (RMM Dashboard).

## 🚀 Özellikler

1. **Üst Bar (Header):**
   - Centeks Destek kurumsal logosu ve Bilgi İşlem başlığı.
   - Gerçek zamanlı arama ve filtreleme çubuğu (Cihaz adı, IP, kullanıcı ve RustDesk ID).
   - Sunucu canlı bağlantı rozeti (`destek.centeks.com`).
   - Yönetici profil menüsü ve `+ Yeni Ajan / İstemci İndir` aksiyon butonu.

2. **Sol Kenar Çubuğu (Sidebar):**
   - Departman bazlı cihaz grupları (*Tümü, Fabrika, Ofis / Muhasebe, Sunucular, Bilgi İşlem*).
   - Canlı bağlı cihaz sayaçları (Aktif / Toplam rozetleri).
   - Çevrimiçi/Çevrimdışı durum filtreleme düğmeleri.
   - Hızlı RustDesk ID ile doğrudan uzak bağlantı kutusu.
   - Sunucu port ve servis sağlık durumu (*Rendezvous 21116, Relay 21117, API panel.centeks.com*).

3. **Cihaz Yönetim Tablosu ve Grid Kartları:**
   - Dinamik `devices` state ve telemetri verileri.
   - Grid Kart ve Detaylı Liste / Tablo görünüm değiştirici.
   - Cihaz Adı, IP, İşletim Sistemi ikonu (Windows/Linux), yeşil yanıp sönen canlı durum göstergesi.
   - Hafif CPU ve RAM kullanım barları.
   - RustDesk ID tek tıkla kopyalama.
   - Aksiyon Butonları: **Bağlan** (Desktop), **Terminal** (PowerShell/CMD), **Dosyalar** (File Explorer).

4. **Uzak Bağlantı Çalışma Alanı (Remote Session Modal):**
   - WebRTC / Canvas canlı akış çalışma alanı.
   - Yarı saydam asılı (floating) araç çubuğu:
     - `Ctrl+Alt+Del Gönder` (CAD)
     - `Görüntü Kalitesi Seçimi` (*Hızlı Düşük Gecikme, Dengeli 60 FPS, HD Kayıpsız*)
     - `Uzak Ses Aç/Kapat`
     - `Tam Ekran`
     - `Bağlantıyı Kes`
   - Canlı telemetri: Gecikme süresi (~11ms), FPS (60 FPS), TLS 1.3 ChaCha20-Poly1305 şifreleme rozeti.

5. **Terminal ve Dosya Yönetici Modalları:**
   - **PowerShell / Bash Konsolu:** `ping`, `dir`, `ls`, `ipconfig`, `Get-Service`, `Get-Process` gibi interaktif komutları çalıştırabilen terminal.
   - **Çift Taraflı Dosya Yöneticisi:** Yerel IT İstasyonu $\leftrightarrow$ Hedef Cihaz arasında dosya transferi.

6. **Backend Entegrasyon Servisi (`src/services/api.js`):**
   - `handleConnect(device)`: WebRTC / WebSocket bağlantısı başlatır.
   - `handleTerminal(device)`: Uzak PowerShell oturumu açar.
   - `handleFileManager(device)`: Dosya gezgini oturumu açar.
   - `handleDownloadAgent(os)`: Windows portable tek dosya `.exe` veya Linux istemcisini indirir.

## 🛠️ Kurulum ve Çalıştırma

```bash
# Bağımlılıkları yükle
npm install

# Geliştirme sunucusunu başlat (http://localhost:3000)
npm run dev

# Canlı dağıtım için derle
npm run build
```

