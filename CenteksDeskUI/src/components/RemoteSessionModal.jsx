import React, { useState, useEffect } from 'react';
import { 
  X, 
  Maximize2, 
  Minimize2, 
  Command, 
  Sliders, 
  PowerOff, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Monitor,
  Activity,
  Lock,
  ClipboardCopy,
  Terminal,
  FolderOpen,
  Camera,
  Layers,
  Sparkles
} from 'lucide-react';
import { CenteksRmmService } from '../services/api';

export default function RemoteSessionModal({ session, onClose }) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [quality, setQuality] = useState('Dengeli (60 FPS)');
  const [qualityOpen, setQualityOpen] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cadSent, setCadSent] = useState(false);
  const [clipboardSynced, setClipboardSynced] = useState(false);
  const [latency, setLatency] = useState(11);
  const [fps, setFps] = useState(60);

  const device = session?.device;

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Math.floor(8 + Math.random() * 5));
      setFps(Math.floor(59 + Math.random() * 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSendCad = async () => {
    setCadSent(true);
    await CenteksRmmService.sendRemoteCommand(session.sessionId, 'cad');
    setTimeout(() => setCadSent(false), 2000);
  };

  const syncClipboard = () => {
    setClipboardSynced(true);
    setTimeout(() => setClipboardSynced(false), 2000);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  if (!session || !device) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-2 sm:p-4">
      <div className={`relative flex flex-col bg-[#080d11] rounded-2xl border border-[#243540] shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'w-full h-full rounded-none' : 'w-[96vw] max-w-7xl h-[92vh]'
      }`}>
        {/* ÜST BAŞLIK ÇUBUĞU - CENTEKS KURUMSAL BİLGİLERİ */}
        <div className="flex h-12 shrink-0 items-center justify-between border-b border-[#243540] bg-[#0c1419] px-4">
          <div className="flex items-center gap-3">
            {/* Centeks İkonu */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#142028] p-1 border border-[#d7b469]/30">
              <img src="/centeks-emblem.svg" alt="CENTEKS" className="h-full w-full object-contain" />
            </div>

            <div className="flex items-center gap-2">
              <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white tracking-wide">{device.name}</span>
              <span className="text-xs text-slate-400 font-mono">({device.ip})</span>
              <span className="text-[10px] rounded-md bg-[#142028] px-2 py-0.5 text-[#d7b469] font-mono border border-[#d7b469]/30">
                RustDesk ID: {device.rustdeskId}
              </span>
            </div>
          </div>

          {/* Canlı Bağlantı İstatistikleri & Butonlar */}
          <div className="flex items-center gap-2.5">
            <div className="hidden sm:flex items-center gap-2 rounded-full bg-[#142028] px-3 py-1 border border-[#243540] text-[11px] font-mono">
              <Activity className="h-3.5 w-3.5 text-[#d7b469]" />
              <span className="text-emerald-400 font-bold">{latency} ms</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-300">{fps} FPS</span>
              <span className="text-slate-600">|</span>
              <span className="text-slate-400">destek.centeks.com</span>
            </div>

            <button
              onClick={toggleFullscreen}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-[#142028] hover:text-[#d7b469] transition-colors"
              title={isFullscreen ? "Küçült" : "Tam Ekran"}
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
              title="Oturumu Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* CANLI UZAK MASAÜSTÜ ÇALIŞMA ALANI (ÖNİZLEME VİEWPORT) */}
        <div className="relative flex-1 bg-[#05080a] flex items-center justify-center overflow-hidden">
          {/* Gerçekçi Centeks Kurumsal Masaüstü Duvar Kağıdı Görseli */}
          <div className="relative w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-[#0a141b] via-[#080d11] to-[#121f28] select-none">
            
            {/* Arka Plan Logo Watermark'ı (Büyük Centeks Amblemi) */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.06]">
              <img 
                src="/centeks-emblem.svg" 
                alt="CENTEKS Watermark" 
                className="w-[45vw] max-w-[500px] h-auto object-contain filter drop-shadow-[0_0_80px_rgba(215,180,105,0.4)]"
              />
            </div>

            {/* Sol Masaüstü Simgeleri */}
            <div className="relative z-10 grid grid-cols-1 gap-5 w-24">
              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-3 rounded-2xl bg-[#142028]/80 border border-[#243540] group-hover:border-[#d7b469] group-hover:bg-[#1c2d38] transition-all shadow-lg shadow-black/40">
                  <Monitor className="h-6 w-6 text-[#d7b469]" />
                </div>
                <span className="text-[11px] text-slate-200 font-medium text-center drop-shadow-md">Bu Bilgisayar</span>
              </div>

              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-3 rounded-2xl bg-[#142028]/80 border border-[#243540] group-hover:border-[#d7b469] group-hover:bg-[#1c2d38] transition-all shadow-lg shadow-black/40">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" />
                </div>
                <span className="text-[11px] text-slate-200 font-medium text-center drop-shadow-md">Centeks Ajan</span>
              </div>

              <div className="flex flex-col items-center gap-1 cursor-pointer group">
                <div className="p-3 rounded-2xl bg-[#142028]/80 border border-[#243540] group-hover:border-[#d7b469] group-hover:bg-[#1c2d38] transition-all shadow-lg shadow-black/40">
                  <FolderOpen className="h-6 w-6 text-amber-400" />
                </div>
                <span className="text-[11px] text-slate-200 font-medium text-center drop-shadow-md">Ortak Alan</span>
              </div>
            </div>

            {/* Sağ Üst Sistem Telemetri Widget'ı (Gerçekçi Kurumsal Bilgi Kutusu) */}
            <div className="absolute top-6 right-6 z-10 rounded-2xl border border-[#243540]/80 bg-[#0c1419]/80 backdrop-blur-md p-4 text-xs space-y-2 shadow-2xl max-w-xs">
              <div className="flex items-center justify-between pb-2 border-b border-[#243540]">
                <div className="flex items-center gap-2">
                  <div className="h-6 w-6 rounded-lg bg-[#d7b469]/20 p-1 border border-[#d7b469]/40 flex items-center justify-center">
                    <img src="/centeks-emblem.svg" alt="CENTEKS" className="h-full w-full object-contain" />
                  </div>
                  <div>
                    <h5 className="font-bold text-white text-[11px]">CENTEKS BİLGİ İŞLEM</h5>
                    <p className="text-[9px] text-[#d7b469] font-mono">Uzak Oturum Aktif</p>
                  </div>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              </div>

              <div className="space-y-1 text-[10px] font-mono text-slate-300">
                <div className="flex justify-between">
                  <span className="text-slate-500">Cihaz:</span>
                  <span className="text-white font-semibold">{device.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kullanıcı:</span>
                  <span className="text-slate-200">{device.user}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">IP:</span>
                  <span className="text-slate-200">{device.ip}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">İşletim Sistemi:</span>
                  <span className="text-slate-200">{device.osVersion}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Çalışma Süresi:</span>
                  <span className="text-emerald-400">{device.uptime}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-[#243540]">
                  <span className="text-slate-500">IT Destek:</span>
                  <span className="text-[#d7b469]">Dahili: 1104 / 1105</span>
                </div>
              </div>
            </div>

            {/* Alt: Windows Görev Çubuğu */}
            <div className="relative z-10 w-full flex items-center justify-between h-11 rounded-xl bg-[#0c1419]/90 border border-[#243540] px-3 backdrop-blur-md shadow-2xl">
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center font-bold text-xs text-white cursor-pointer shadow-sm">
                  ⊞
                </div>
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#142028] border border-[#243540] text-xs text-slate-300">
                  <img src="/centeks-emblem.svg" alt="" className="h-3.5 w-3.5" />
                  <span className="font-semibold text-[11px] text-white">CenteksDestek.exe</span>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span className="text-emerald-400 font-semibold text-[11px]">TR • Q</span>
                <span>{new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
            </div>
          </div>

          {/* ASILI (FLOATING) ARAÇ ÇUBUĞU - CENTEKS GOLD & NAVY TEMA */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1.5 rounded-2xl border border-[#d7b469]/40 bg-[#0c1419]/95 p-1.5 shadow-2xl shadow-black/80 backdrop-blur-2xl ring-1 ring-white/10">
            {/* Centeks Mini İkon */}
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-[#142028] p-1 border border-[#d7b469]/30 ml-1">
              <img src="/centeks-emblem.svg" alt="CENTEKS" className="h-4 w-4 object-contain" />
            </div>

            {/* Ctrl+Alt+Del Gönder */}
            <button
              onClick={handleSendCad}
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all ${
                cadSent 
                  ? 'bg-emerald-600 text-white shadow-md' 
                  : 'bg-[#142028] text-slate-200 hover:bg-[#1e2e38] hover:text-[#d7b469]'
              }`}
              title="Hedef Makineye Ctrl+Alt+Del Tuş Kombinasyonu İlet"
            >
              <Command className="h-3.5 w-3.5 text-[#d7b469]" />
              <span>{cadSent ? 'CAD Gönderildi!' : 'Ctrl+Alt+Del'}</span>
            </button>

            {/* Pano Senkronizasyonu */}
            <button
              onClick={syncClipboard}
              className={`flex items-center gap-1.5 rounded-xl px-2.5 py-1.5 text-xs font-medium transition-all ${
                clipboardSynced 
                  ? 'bg-emerald-600 text-white' 
                  : 'bg-[#142028] text-slate-300 hover:text-white hover:bg-[#1e2e38]'
              }`}
              title="Panoyu Eşitle"
            >
              <ClipboardCopy className="h-3.5 w-3.5 text-[#d7b469]" />
              <span>{clipboardSynced ? 'Eşitlendi!' : 'Pano'}</span>
            </button>

            <div className="h-5 w-[1px] bg-[#243540] mx-1"></div>

            {/* Görüntü Kalitesi Seçimi */}
            <div className="relative">
              <button
                onClick={() => setQualityOpen(!qualityOpen)}
                className="flex items-center gap-1.5 rounded-xl bg-[#142028] px-3 py-1.5 text-xs font-semibold text-slate-200 hover:bg-[#1e2e38] transition-colors"
              >
                <Sliders className="h-3.5 w-3.5 text-[#d7b469]" />
                <span>{quality}</span>
              </button>

              {qualityOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 rounded-2xl border border-[#243540] bg-[#0f1920] p-1.5 shadow-2xl z-50">
                  {['Hızlı (Düşük Gecikme)', 'Dengeli (60 FPS)', 'HD (Kayıpsız)'].map((mode) => (
                    <button
                      key={mode}
                      onClick={() => {
                        setQuality(mode);
                        setQualityOpen(false);
                      }}
                      className={`w-full text-left rounded-xl px-3 py-2 text-xs transition-colors ${
                        quality === mode 
                          ? 'bg-[#d7b469] text-[#0c1419] font-bold' 
                          : 'text-slate-300 hover:bg-[#142028]'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Uzak Sesi Aç/Kapat */}
            <button
              onClick={() => setAudioEnabled(!audioEnabled)}
              title={audioEnabled ? "Uzak Sesi Sustur" : "Uzak Sesi Aç"}
              className={`rounded-xl p-1.5 transition-colors ${
                audioEnabled ? 'text-slate-300 hover:bg-[#142028]' : 'text-rose-400 hover:bg-[#142028]'
              }`}
            >
              {audioEnabled ? <Volume2 className="h-4 w-4 text-[#d7b469]" /> : <VolumeX className="h-4 w-4" />}
            </button>

            {/* Tam Ekran Butonu */}
            <button
              onClick={toggleFullscreen}
              title={isFullscreen ? "Tam Ekrandan Çık" : "Tam Ekran Yap"}
              className="rounded-xl p-1.5 text-slate-300 hover:bg-[#142028] hover:text-[#d7b469] transition-colors"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            <div className="h-5 w-[1px] bg-[#243540] mx-1"></div>

            {/* Bağlantıyı Kes */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 rounded-xl bg-rose-600 hover:bg-rose-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md transition-colors active:scale-95"
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
