import React from 'react';
import { 
  Monitor, 
  Terminal, 
  FolderOpen, 
  Cpu, 
  HardDrive, 
  Clock, 
  User, 
  Copy, 
  Check, 
  Wifi,
  ShieldAlert,
  ShieldCheck,
  Info,
  Server
} from 'lucide-react';

export default function DeviceCard({ device, onConnect, onTerminal, onFiles, onDetails }) {
  const [copied, setCopied] = React.useState(false);

  const copyRustDeskId = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(device.rustdeskId.replace(/\s+/g, ''));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isOnline = device.status === 'online';

  return (
    <div className={`group relative rounded-2xl border transition-all duration-200 overflow-hidden ${
      isOnline 
        ? 'border-[#243540] bg-[#101b22]/90 hover:border-[#d7b469]/60 hover:bg-[#14232c] hover:shadow-xl hover:shadow-[#d7b469]/5' 
        : 'border-[#243540]/50 bg-[#0c1419]/50 opacity-70 hover:opacity-100 hover:border-[#243540]'
    }`}>
      {/* Üst Kısım: OS İkonu, Cihaz Adı, Durum Rozeti */}
      <div className="p-4 pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className={`flex h-11 w-11 items-center justify-center rounded-xl font-bold ring-1 ${
              device.os === 'windows' 
                ? 'bg-blue-500/10 text-blue-400 ring-blue-500/20' 
                : 'bg-[#d7b469]/10 text-[#d7b469] ring-[#d7b469]/20'
            }`}>
              {device.os === 'windows' ? (
                <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24">
                  <path d="M0 3.449L9.75 2.1v9.451H0m10.949-9.602L24 0v11.4H10.949M0 12.6h9.75v9.451L0 20.699M10.949 12.6H24V24l-12.901-1.75"/>
                </svg>
              ) : (
                <Terminal className="h-5 w-5" />
              )}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 
                  onClick={() => onDetails && onDetails(device)}
                  className="font-bold text-sm text-slate-100 tracking-tight group-hover:text-[#d7b469] transition-colors cursor-pointer"
                  title="Donanım ve Sistem Detaylarını İncele"
                >
                  {device.name}
                </h3>
              </div>
              <p className="text-xs text-slate-400 font-mono flex items-center gap-1.5 mt-0.5">
                <span>{device.ip}</span>
                <span className="text-slate-600">•</span>
                <span className="capitalize text-[#d7b469] font-medium text-[11px]">{device.department}</span>
              </p>
            </div>
          </div>

          {/* Canlı Durum Rozeti */}
          <div className="flex items-center gap-1.5 shrink-0">
            {isOnline ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-semibold text-emerald-400 ring-1 ring-inset ring-emerald-500/30">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Online
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800/80 px-2.5 py-1 text-xs font-medium text-slate-400 ring-1 ring-inset ring-slate-700">
                <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                Offline
              </span>
            )}
          </div>
        </div>

        {/* RustDesk ID & Kullanıcı Bilgisi */}
        <div className="mt-3.5 flex items-center justify-between rounded-xl bg-[#091014] px-3 py-2 border border-[#243540]/80">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-[10px] font-bold text-[#d7b469] uppercase font-mono">ID:</span>
            <span className="font-mono font-bold text-slate-200">{device.rustdeskId}</span>
            <button
              onClick={copyRustDeskId}
              title="ID Kopyala"
              className="text-slate-400 hover:text-[#d7b469] transition-colors ml-0.5"
            >
              {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
          </div>

          <div className="flex items-center gap-1.5 text-xs text-slate-400 truncate max-w-[130px]">
            <User className="h-3 w-3 shrink-0 text-[#d7b469]/80" />
            <span className="truncate text-slate-300 font-medium">{device.user}</span>
          </div>
        </div>

        {/* CPU & RAM Kullanım Barları (Tıklanabilir -> Donanım Özeti açar) */}
        {isOnline ? (
          <div 
            onClick={() => onDetails && onDetails(device)}
            className="mt-3 grid grid-cols-2 gap-3 pt-1 cursor-pointer hover:opacity-90 transition-opacity"
            title="Sistem Detaylarını Gör"
          >
            {/* CPU Barı */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <Cpu className="h-3 w-3 text-slate-500" /> CPU
                </span>
                <span className="font-mono font-medium text-slate-300">{device.cpu}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    device.cpu > 80 ? 'bg-rose-500' : device.cpu > 50 ? 'bg-amber-400' : 'bg-[#d7b469]'
                  }`}
                  style={{ width: `${device.cpu}%` }}
                ></div>
              </div>
            </div>

            {/* RAM Barı */}
            <div>
              <div className="flex items-center justify-between text-[11px] mb-1">
                <span className="text-slate-400 flex items-center gap-1">
                  <HardDrive className="h-3 w-3 text-slate-500" /> RAM
                </span>
                <span className="font-mono font-medium text-slate-300">{device.ram}%</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-slate-800/80 overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    device.ram > 85 ? 'bg-rose-500' : device.ram > 65 ? 'bg-amber-400' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${device.ram}%` }}
                ></div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 py-1 border-t border-[#243540]/40">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" /> Son Görülme:
            </span>
            <span className="font-mono">{device.lastSeen}</span>
          </div>
        )}
      </div>

      {/* Alt Aksiyon Butonları (Bağlan, Terminal, Dosyalar, Sistem Detayları) */}
      <div className="flex items-center border-t border-[#243540] bg-[#0c1419] p-2 gap-1.5">
        <button
          onClick={() => onConnect(device)}
          disabled={!isOnline}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 disabled:opacity-30 disabled:hover:brightness-100 py-2 text-xs font-bold text-[#0c1419] shadow-sm transition-all"
        >
          <Monitor className="h-3.5 w-3.5 stroke-[2.5]" />
          <span>Bağlan</span>
        </button>

        <button
          onClick={() => onTerminal(device)}
          disabled={!isOnline}
          title="Uzak PowerShell / Konsol"
          className="flex items-center justify-center rounded-xl border border-[#243540] bg-[#142028] hover:border-[#d7b469]/50 hover:text-[#d7b469] disabled:opacity-30 p-2 text-slate-300 transition-colors"
        >
          <Terminal className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={() => onFiles(device)}
          disabled={!isOnline}
          title="Dosya Yöneticisi"
          className="flex items-center justify-center rounded-xl border border-[#243540] bg-[#142028] hover:border-[#d7b469]/50 hover:text-[#d7b469] disabled:opacity-30 p-2 text-slate-300 transition-colors"
        >
          <FolderOpen className="h-3.5 w-3.5" />
        </button>

        <button
          onClick={() => onDetails && onDetails(device)}
          title="Sistem & Donanım Özeti"
          className="flex items-center justify-center rounded-xl border border-[#243540] bg-[#142028] hover:border-[#d7b469]/50 hover:text-[#d7b469] p-2 text-slate-300 transition-colors"
        >
          <Info className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}
