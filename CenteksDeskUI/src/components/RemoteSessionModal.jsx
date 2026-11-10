import React, { useState, useEffect } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Command, 
  Wifi, 
  Sliders, 
  PowerOff, 
  ShieldCheck, 
  Copy, 
  Volume2, 
  VolumeX, 
  RefreshCw,
  Monitor,
  Activity,
  Lock
} from 'lucide-react';
import { CenteksRmmService } from '../services/api';

export default function RemoteSessionModal({ session, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('Dengeli (60 FPS)'); // 'Hızlı (Düşük Gecikme)', 'Dengeli (60 FPS)', 'HD (Kayıpsız)'
  const [qualityOpen, setQualityOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cadSent, setCadSent] = useState(false);
  const [latency, setLatency] = useState(11);
  const [fps, setFps] = useState(60);

  const device = session?.device;

  // Gerçekçi canlı gecikme dalgalanması
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(9 + Math.random() * 5));
      setFps(Math.floor(58 + Math.random() * 3));
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const handleSendCad = async () => {
    setCadSent(true);
    await CenteksRmmService.sendRemoteCommand(session.sessionId, 'cad');
    setTimeout(() => setCadSent(false), 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!session || !device) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-2 sm:p-4">
      <div className={`relative flex flex-col bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'w-full h-full rounded-none' : 'w-[96vw] max-w-7xl h-[92vh]'
      }`}>
        {/* Üst Başlık Çubuğu */}
        <div className="flex h-11 shrink-0 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-4">
          <div className="flex items-center gap-3">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-xs font-bold text-white tracking-wide">{device.name}</span>
            <span className="text-xs text-slate-400 font-mono">({device.ip})</span>
            <span className="text-[10px] rounded bg-slate-800 px-1.5 py-0.5 text-slate-300 font-mono">
              ID: {device.rustdeskId}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
              <Activity className="h-3 w-3" /> {latency}ms / {fps} FPS
            </span>
            <button
              onClick={toggleFullscreen}
              className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
              title={isFullscreen ? "Küçült" : "Tam Ekran"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
              title="Oturumu Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Canlı Akış Çalışma Alanı (Viewport / Canvas / IFrame Container) */}
        <div className="relative flex-1 bg-slate-950 flex items-center justify-center overflow-hidden">
          {/* Gerçekçi Uzak Masaüstü Ekranı (Mock Stream) */}
          <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 via-slate-950 to-blue-950/40 select-none">
            {/* Sahte Masaüstü Öğeleri (Windows Masaüstü Görsel Temsili) */}
            <div className="grid grid-cols-1 gap-6 w-20">
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-2.5 rounded-xl bg-blue-600/20 border border-blue-500/30 group-hover:bg-blue-600/30">
                  <Monitor className="h-6 w-6 text-blue-400" />
                </div>
                <span className="text-[11px] text-slate-300 font-medium text-center">Bu Bilgisayar</span>
              </div>
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-2.5 rounded-xl bg-emerald-600/20 border border-emerald-500/30 group-hover:bg-emerald-600/30">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="text-[11px] text-slate-300 font-medium text-center">CENTEKS Ajan</span>
              </div>
            </div>

            {/* Orta Bilgi Kartı (Canlı Şifreli Bağlantı Durumu) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none opacity-40">
              <div className="inline-flex items-center gap-2 rounded-2xl bg-black/60 px-4 py-2 border border-slate-700/60 backdrop-blur-md">
                <Lock className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono text-slate-300">
                  Şifreli WebRTC Tüneli (TLS 1.3 - ChaCha20-Poly1305)
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-mono">
                Sunucu: destek.centeks.com:21117 (Relay) | Oturum: {session.sessionId}
              </p>
            </div>

            {/* Sahte Windows Görev Çubuğu */}
            <div className="w-full flex items-center justify-between h-10 rounded-xl bg-slate-900/90 border border-slate-800/80 px-3 backdrop-blur-md">
              <div className="flex items-center gap-3">
                <div className="h-5 w-5 rounded bg-blue-500 flex items-center justify-center font-bold text-[10px] text-white">
                  ⊞
                </div>
                <span className="text-xs text-slate-300 font-semibold">{device.name}</span>
              </div>
              <div className="text-xs font-mono text-slate-400">
                {new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}
              </div>
            </div>
          </div>

          {/* YARI SAYDAM ASILI (FLOATING) ARAÇ ÇUBUĞU */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 rounded-2xl border border-slate-700/70 bg-slate-900/90 p-1.5 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
            {/* Ctrl+Alt+Del Gönder */}
            <button
              onClick={handleSendCad}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                cadSent 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white'
              }`}
              title="Hedef Bilgisayara Ctrl+Alt+Del Tuş Kombinasyonu Gönder"
            >
              <Command className="h-3.5 w-3.5" />
              <span>{cadSent ? 'CAD İletildi!' : 'Ctrl+Alt+Del'}</span>
            </button>

            <div className="h-5 w-[1px] bg-slate-700 mx-1"></div>

            {/* Görüntü Kalitesi Seçimi */}
            <div className="relative">
              <button
                onClick={() => setQualityOpen(!qualityOpen)}
                className="flex items-center gap-1.5 rounded-xl bg-slate-800/80 px-3 py-1.5 text-xs font-medium text-slate-200 hover:bg-slate-700 transition-colors"
              >
                <Sliders className="h-3.5 w-3.5 text-blue-400" />
                <span>{quality}</span>
              </button>

              {qualityOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 rounded-xl border border-slate-700 bg-slate-900 p-1.5 shadow-2xl z-50">
                  {['Hızlı (Düşük Gecikme)', 'Dengeli (60 FPS)', 'HD (Kayıpsız)'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setQuality(mode);
                        setQualityOpen(false);
                      }}
                      className={`w-full text-left rounded-lg px-2.5 py-1.5 text-xs transition-colors ${
                        quality === mode ? 'bg-blue-600 text-white font-semibold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Ses Aç / Kapat */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              title={audioEnabled ? "Uzak Sesi Sustur" : "Uzak Sesi Aç"}
              className={`rounded-xl p-1.5 transition-colors ${
                audioEnabled ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-500 hover:bg-slate-800'
              }`}
            >
              {audioEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4 text-rose-400" />}
            </button>

            {/* Tam Ekran Butonu */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
              className="rounded-xl p-1.5 text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <div className="h-5 w-[1px] bg-slate-700 mx-1"></div>

            {/* Bağlantıyı Kes */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-colors active:scale-95"
            >
              <PowerOff className="h-3.5 w-3.5" />
              <span>Bağlantıyı Kes</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

