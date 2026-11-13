#!/usr/bin/env python3
"""
CENTEKS Destek - RustDesk Canlı Cihaz & API Köprüsü (Bridge Service) v2.0
-----------------------------------------------------------------------
RustDesk istemcisinin dahili HTTP senkronizasyon protokolünü (/api/sysinfo ve /api/heartbeat)
dinler. İstemci açıldığı anda otomatik olarak sisteme kaydolur ve canlı olarak web paneline yansır.
"""

import sys
import os
import json
import sqlite3
import time
from http.server import HTTPServer, BaseHTTPRequestHandler
from urllib.parse import urlparse

PORT = int(os.environ.get("CENTEKS_PORT", 8000))
CONFIG_DIR = os.environ.get("CENTEKS_CONFIG_DIR", "/var/lib/centeks-bridge")
ALIASES_FILE = os.path.join(CONFIG_DIR, "devices_meta.json")

# Bellekte tutulan canlı heartbeat tablosu (client_id -> timestamp)
LIVE_HEARTBEATS = {}

def format_rustdesk_id(raw_id):
    """268304385 -> 268 304 385 formatına dönüştürür."""
    s = str(raw_id).replace(" ", "").strip()
    if len(s) == 9:
        return f"{s[0:3]} {s[3:6]} {s[6:9]}"
    return s

def load_metadata():
    if not os.path.exists(CONFIG_DIR):
        try:
            os.makedirs(CONFIG_DIR, exist_ok=True)
        except Exception:
            pass
    if os.path.exists(ALIASES_FILE):
        try:
            with open(ALIASES_FILE, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception as e:
            print(f"[Bridge] Meta veri okuma hatası: {e}")
    return {}

def save_metadata(meta):
    try:
        os.makedirs(CONFIG_DIR, exist_ok=True)
        with open(ALIASES_FILE, "w", encoding="utf-8") as f:
            json.dump(meta, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"[Bridge] Meta veri kaydetme hatası: {e}")

def get_devices():
    meta = load_metadata()
    devices = []
    now = time.time()

    # Varsayılan veya kaydedilmiş tüm istemcileri tara
    for clean_id, info in meta.items():
        clean_id = str(clean_id).replace(" ", "").strip()
        formatted_id = format_rustdesk_id(clean_id)
        
        last_seen_ts = LIVE_HEARTBEATS.get(clean_id, info.get("last_seen_ts", 0))
        # 90 saniye içinde sinyal geldiyse online
        is_online = (now - last_seen_ts) < 90 if last_seen_ts else True

        devices.append({
            "id": f"dev-{clean_id}",
            "name": info.get("name", f"İstemci ({formatted_id})"),
            "department": info.get("department", "Bilgi İşlem"),
            "rustdeskId": formatted_id,
            "ip": info.get("ip", "192.168.1.101"),
            "os": info.get("os", "Windows 11 / 10 64-bit"),
            "user": info.get("user") or info.get("name", "Kullanıcı"),
            "status": "online" if is_online else "offline",
            "cpu": info.get("cpu", "11%"),
            "ram": info.get("ram", "5.4 / 16 GB"),
            "lastSeen": "Şimdi aktif" if is_online else "Çevrimdışı"
        })

    return devices

class BridgeRequestHandler(BaseHTTPRequestHandler):
    def _send_cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization")

    def do_OPTIONS(self):
        self.send_response(204)
        self._send_cors()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path in ["/api/devices", "/api/devices/"]:
            devices = get_devices()
            payload = json.dumps(devices, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self._send_cors()
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
        elif parsed.path == "/api/health":
            info = {
                "status": "ok",
                "service": "Centeks RMM Bridge v2.0",
                "registeredCount": len(load_metadata()),
                "activeHeartbeats": len(LIVE_HEARTBEATS)
            }
            payload = json.dumps(info, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self._send_cors()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(payload)
        else:
            self.send_response(404)
            self.end_headers()

    def do_POST(self):
        parsed = urlparse(self.path)
        content_length = int(self.headers.get("Content-Length", 0))
        body = self.rfile.read(content_length) if content_length > 0 else b"{}"

        # 1. RUSTDESK NATIVE SYSINFO UPLOAD (/api/sysinfo)
        if parsed.path.endswith("/api/sysinfo"):
            try:
                data = json.loads(body.decode("utf-8"))
                clean_id = str(data.get("id", "")).replace(" ", "").strip()
                if clean_id:
                    meta = load_metadata()
                    client_ip = self.headers.get("X-Real-IP") or self.headers.get("X-Forwarded-For") or self.client_address[0]
                    hostname = data.get("hostname") or data.get("username") or f"İstemci {clean_id}"
                    os_name = data.get("os", "windows")
                    if os_name.lower() == "windows":
                        os_name = "Windows 11 / 10 64-bit"

                    meta[clean_id] = {
                        "name": meta.get(clean_id, {}).get("name") or hostname,
                        "department": meta.get(clean_id, {}).get("department", "Bilgi İşlem"),
                        "ip": client_ip,
                        "os": os_name,
                        "user": data.get("username") or hostname,
                        "last_seen_ts": time.time()
                    }
                    save_metadata(meta)
                    LIVE_HEARTBEATS[clean_id] = time.time()
                    print(f"[Bridge] Yeni Cihaz Kaydoldu: ID={clean_id}, Cihaz={hostname}, IP={client_ip}")

                self.send_response(200)
                self._send_cors()
                self.send_header("Content-Type", "text/plain")
                self.end_headers()
                # RustDesk client SYSINFO_UPDATED yanıtını bekler
                self.wfile.write(b"SYSINFO_UPDATED")
                return
            except Exception as e:
                print(f"[Bridge] Sysinfo işleme hatası: {e}")
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"SYSINFO_UPDATED")
                return

        # 2. RUSTDESK NATIVE HEARTBEAT (/api/heartbeat)
        elif parsed.path.endswith("/api/heartbeat"):
            try:
                data = json.loads(body.decode("utf-8")) if body else {}
                clean_id = str(data.get("id", "")).replace(" ", "").strip()
                if clean_id:
                    LIVE_HEARTBEATS[clean_id] = time.time()

                self.send_response(200)
                self._send_cors()
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(b"{}")
                return
            except Exception:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"{}")
                return

        # 3. RUSTDESK SYSINFO VERSION CHECK (/api/sysinfo_ver)
        elif parsed.path.endswith("/api/sysinfo_ver"):
            self.send_response(200)
            self._send_cors()
            self.send_header("Content-Type", "text/plain")
            self.end_headers()
            self.wfile.write(b"v1")
            return

        # 4. WEB PANEL MANUEL CİHAZ EKLEME (/api/devices)
        elif parsed.path in ["/api/devices", "/api/devices/"]:
            try:
                data = json.loads(body.decode("utf-8"))
                clean_id = str(data.get("rustdeskId", "")).replace(" ", "").strip()
                if not clean_id:
                    self.send_response(400)
                    self.end_headers()
                    self.wfile.write(b'{"error": "rustdeskId zorunludur"}')
                    return

                meta = load_metadata()
                meta[clean_id] = {
                    "name": data.get("name", f"Cihaz {clean_id}"),
                    "department": data.get("department", "Bilgi İşlem"),
                    "ip": data.get("ip", "192.168.1.100"),
                    "os": data.get("os", "Windows 11 / 10 64-bit"),
                    "user": data.get("user", data.get("name")),
                    "last_seen_ts": time.time()
                }
                save_metadata(meta)
                LIVE_HEARTBEATS[clean_id] = time.time()

                self.send_response(200)
                self._send_cors()
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"success": True, "id": clean_id}).encode("utf-8"))
            except Exception as e:
                self.send_response(500)
                self.end_headers()
                self.wfile.write(json.dumps({"error": str(e)}).encode("utf-8"))
        else:
            self.send_response(404)
            self.end_headers()

    def do_DELETE(self):
        parsed = urlparse(self.path)
        parts = parsed.path.strip("/").split("/")
        if len(parts) >= 3 and parts[0] == "api" and parts[1] == "devices":
            target_id = parts[2].replace("dev-", "").replace(" ", "").strip()
            meta = load_metadata()
            if target_id in meta:
                del meta[target_id]
                save_metadata(meta)
            if target_id in LIVE_HEARTBEATS:
                del LIVE_HEARTBEATS[target_id]
            self.send_response(200)
            self._send_cors()
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(b'{"success": true}')
        else:
            self.send_response(404)
            self.end_headers()

def run_server():
    server_address = ("127.0.0.1", PORT)
    httpd = HTTPServer(server_address, BridgeRequestHandler)
    print(f"=========================================================")
    print(f" CENTEKS Destek - Canlı API Köprüsü v2.0 Başlatıldı      ")
    print(f" Dinlenen Port: http://127.0.0.1:{PORT}                  ")
    print(f" RustDesk Endpointleri: /api/sysinfo & /api/heartbeat    ")
    print(f"=========================================================")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n[Bridge] Servis durduruldu.")

if __name__ == "__main__":
    run_server()
