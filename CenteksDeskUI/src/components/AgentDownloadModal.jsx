import React, { useState } from 'react';
import { X, Download, ShieldCheck, Check, Copy, Laptop, Terminal, Server, Key, Info } from 'lucide-react';
import { CenteksRmmService } from '../services/api';

export default function AgentDownloadModal({ onClose }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async (os) => {
    setDownloading(os);
    try {
      const res = await CenteksRmmService.handleDownloadAgent(os);
      const link = document.createElement('a');
      link.href = res.url;
      link.setAttribute('download', res.filename);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    } finally {
      setTimeout(() => setDownloading(null), 1500);
    }
  };

  const copyKey = () => {
    navigator.clipboard.writeText('MGQRTw1Xi9Z7mpyzIYtiqPyYETYHjq9lydT5vHUS02');
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const copyPass = () => {
    navigator.clipboard.writeText('Centeks.#2027!');
    setCopiedPass(true);
    setTimeout(() => setCopiedPass(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-full max-w-xl rounded-2xl border border-[#243540] bg-[#0c1419] shadow-2xl p-6 overflow-hidden">
        
        {/* Üst Başlık - Centeks Logo & Bilgi */}
        <div className="flex items-center justify-between pb-4 border-b border-[#243540]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#142028] p-2 ring-1 ring-[#d7b469]/40 shadow-lg">
              <img src="/centeks-emblem.svg" alt="CENTEKS" className="h-full w-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                CENTEKS <span className="text-[#d7b469]">DESTEK İSTEMCİSİ</span>
              </h3>
              <p className="text-xs text-slate-400">Kurulumsuz, Tek Dosya Taşınabilir (Portable Standalone) Sürümler</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-[#142028] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* İndirme Seçenekleri */}
        <div className="py-5 space-y-3">
          {/* Windows (Önerilen) */}
          <div className="flex items-center justify-between rounded-xl border border-[#d7b469]/40 bg-gradient-to-r from-[#14232c] to-[#0e171d] p-4 transition-all hover:border-[#d7b469]/70 shadow-lg shadow-black/40">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#d7b469] text-[#0c1419] font-black text-base shadow-sm">
                ⊞
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold text-white">Windows (64-bit Standalone)</h4>
                  <span className="rounded bg-[#d7b469]/20 px-2 py-0.5 text-[10px] font-mono font-bold text-[#d7b469] border border-[#d7b469]/30">
                    Önerilen
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kurulum gerektirmez. Tüm DLL'ler gömülüdür, çift tıkla doğrudan çalışır.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload('windows')}
              disabled={downloading === 'windows'}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 px-4 py-2.5 text-xs font-bold text-[#0c1419] transition-all shadow-md"
            >
              <Download className="h-4 w-4 stroke-[2.5]" />
              <span>{downloading === 'windows' ? 'İndiriliyor...' : 'İndir (.exe)'}</span>
            </button>
          </div>

          {/* Linux */}
          <div className="flex items-center justify-between rounded-xl border border-[#243540] bg-[#101920] p-4 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3.5">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#142028] text-slate-300 border border-[#243540]">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white">Linux (x86_64)</h4>
                <p className="text-xs text-slate-400 mt-0.5">AppImage / Tar.gz taşınabilir sürüm</p>
              </div>
            </div>

            <button
              onClick={() => handleDownload('linux')}
              disabled={downloading === 'linux'}
              className="flex items-center gap-1.5 rounded-xl bg-[#142028] hover:bg-[#1a2933] border border-[#243540] px-4 py-2.5 text-xs font-bold text-slate-200 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>{downloading === 'linux' ? 'İndiriliyor...' : 'İndir'}</span>
            </button>
          </div>
        </div>

        {/* Kurumsal Yapılandırma Bilgileri Kutusu */}
        <div className="rounded-xl border border-[#243540] bg-[#091014] p-4 text-xs space-y-2.5">
          <div className="flex items-center justify-between text-slate-200 font-bold border-b border-[#243540] pb-2">
            <span className="flex items-center gap-2 text-white">
              <ShieldCheck className="h-4 w-4 text-[#d7b469]" />
              Gömülü Centeks Yapılandırması
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">Otomatik Doğrulandı</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-[11px] font-mono text-slate-300">
            <div className="bg-[#101920] p-2 rounded-lg border border-[#243540]">
              <span className="text-slate-500 block text-[10px]">Rendezvous ID Sunucusu:</span>
              <span className="text-slate-200 font-semibold">destek.centeks.com</span>
            </div>

            <div className="bg-[#101920] p-2 rounded-lg border border-[#243540]">
              <span className="text-slate-500 block text-[10px]">Yönetim Paneli (SSL):</span>
              <span className="text-[#d7b469] font-semibold">panel.centeks.com</span>
            </div>

            <div className="bg-[#101920] p-2 rounded-lg border border-[#243540] flex items-center justify-between">
              <div>
                <span className="text-slate-500 block text-[10px]">Sabit Parola:</span>
                <span className="text-emerald-400 font-bold">Centeks.#2027!</span>
              </div>
              <button 
                onClick={copyPass} 
                className="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-[#142028]"
                title="Parolayı Kopyala"
              >
                {copiedPass ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>

            <div className="bg-[#101920] p-2 rounded-lg border border-[#243540] flex items-center justify-between">
              <div className="truncate mr-2">
                <span className="text-slate-500 block text-[10px]">Public Key:</span>
                <span className="text-slate-300 text-[10px] truncate block">MGQRTw1Xi...</span>
              </div>
              <button 
                onClick={copyKey} 
                className="text-xs text-slate-400 hover:text-white p-1 rounded hover:bg-[#142028]"
                title="Public Key Kopyala"
              >
                {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
