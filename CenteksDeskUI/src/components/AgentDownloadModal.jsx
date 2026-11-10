import React, { useState } from 'react';
import { X, Download, ShieldCheck, Check, Copy, Laptop, Terminal, Server } from 'lucide-react';
import { CenteksRmmService } from '../services/api';

export default function AgentDownloadModal({ onClose }) {
  const [copiedKey, setCopiedKey] = useState(false);
  const [downloading, setDownloading] = useState(null);

  const handleDownload = async (os) => {
    setDownloading(os);
    try {
      const res = await CenteksRmmService.handleDownloadAgent(os);
      // Simüle edilmiş indirme işlemi
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-full max-w-xl rounded-2xl border border-slate-800 bg-slate-900 shadow-2xl p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600/20 text-blue-400">
              <Download className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">CENTEKS Destek İstemcisi İndir</h3>
              <p className="text-xs text-slate-400">Kurulumsuz, Taşınabilir (Portable Standalone) Sürümler</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* İndirme Kartları */}
        <div className="py-5 space-y-3">
          {/* Windows (Önerilen) */}
          <div className="flex items-center justify-between rounded-xl border border-blue-500/30 bg-blue-950/20 p-4 transition-all hover:bg-blue-950/30">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-white font-bold text-sm">
                ⊞
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-semibold text-white">Windows (64-bit)</h4>
                  <span className="rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">
                    Tek Dosya Portable .exe
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Kurulum gerektirmez. Sunucu, key ve sabit parola içine gömülüdür.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload('windows')}
              disabled={downloading === 'windows'}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 px-4 py-2 text-xs font-semibold text-white transition-all shadow-md shadow-blue-600/20"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{downloading === 'windows' ? 'İndiriliyor...' : 'İndir (.exe)'}</span>
            </button>
          </div>

          {/* Linux */}
          <div className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950/60 p-4 hover:border-slate-700 transition-all">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-800 text-slate-200">
                <Terminal className="h-5 w-5" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-white">Linux (x86_64)</h4>
                <p className="text-xs text-slate-400 mt-0.5">AppImage / Tar.gz taşınabilir sürüm</p>
              </div>
            </div>

            <button
              onClick={() => handleDownload('linux')}
              disabled={downloading === 'linux'}
              className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 px-4 py-2 text-xs font-semibold text-slate-200 transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              <span>{downloading === 'linux' ? 'İndiriliyor...' : 'İndir'}</span>
            </button>
          </div>
        </div>

        {/* Kurumsal Yapılandırma Bilgilendirmesi */}
        <div className="rounded-xl border border-slate-800 bg-slate-950/80 p-3.5 text-xs space-y-2">
          <div className="flex items-center gap-2 text-slate-300 font-semibold">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            <span>Gömülü Ön Yapılandırma Parametreleri</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-slate-400 pt-1">
            <div>
              <span className="text-slate-500">ID Sunucusu:</span> destek.centeks.com
            </div>
            <div>
              <span className="text-slate-500">Yönetim Paneli:</span> panel.centeks.com
            </div>
            <div>
              <span className="text-slate-500">Sabit Parola:</span> Centeks.#2027!
            </div>
            <div className="flex items-center gap-1">
              <span className="text-slate-500">Public Key:</span>
              <button onClick={copyKey} className="text-blue-400 hover:underline">
                {copiedKey ? 'Kopyalandı!' : 'Kopyala'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

