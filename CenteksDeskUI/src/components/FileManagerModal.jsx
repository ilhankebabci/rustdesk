import React, { useState } from 'react';
import { 
  X, 
  FolderOpen, 
  FileText, 
  ArrowRight, 
  ArrowLeft, 
  RefreshCw, 
  HardDrive, 
  Laptop, 
  Upload, 
  Download, 
  FolderPlus,
  Trash2,
  CheckCircle,
  File,
  Server
} from 'lucide-react';

export default function FileManagerModal({ device, onClose }) {
  // Yerel Dosyalar (IT Yöneticisi)
  const [localFiles, setLocalFiles] = useState([
    { name: 'CENTEKS-Ajan-Guncelleme.exe', size: '24.5 MB', type: 'exe', date: 'Bugün 14:20' },
    { name: 'Network-Diagnostics.ps1', size: '12 KB', type: 'script', date: 'Dün' },
    { name: 'VPN-Config-Centeks.ovpn', size: '4 KB', type: 'config', date: '08.11.2026' },
    { name: 'Sertifika-RootCA.crt', size: '2 KB', type: 'cert', date: '01.11.2026' },
    { name: 'CenteksERP-Patch-2026.zip', size: '88.4 MB', type: 'archive', date: '05.11.2026' }
  ]);

  // Uzak Cihaz Dosyaları
  const [remoteFiles, setRemoteFiles] = useState([
    { name: 'Windows', size: '-', type: 'dir', date: '10.11.2026' },
    { name: 'Program Files', size: '-', type: 'dir', date: '10.11.2026' },
    { name: 'CenteksDesk', size: '-', type: 'dir', date: '10.11.2026' },
    { name: 'app_log.txt', size: '1.2 MB', type: 'text', date: 'Bugün 15:10' },
    { name: 'crashdump.dmp', size: '45.1 MB', type: 'dump', date: 'Dün 08:30' },
    { name: 'config.toml', size: '8 KB', type: 'config', date: '10.11.2026' }
  ]);

  const [selectedLocal, setSelectedLocal] = useState(null);
  const [selectedRemote, setSelectedRemote] = useState(null);
  const [transferStatus, setTransferStatus] = useState(null);

  const transferToRemote = () => {
    if (!selectedLocal) return;
    setTransferStatus(`'${selectedLocal.name}' hedef makineye aktarılıyor...`);
    setTimeout(() => {
      setRemoteFiles(prev => [...prev, { ...selectedLocal, date: 'Az önce' }]);
      setTransferStatus(`'${selectedLocal.name}' başarıyla gönderildi!`);
      setTimeout(() => setTransferStatus(null), 3000);
    }, 1200);
  };

  const transferToLocal = () => {
    if (!selectedRemote || selectedRemote.type === 'dir') return;
    setTransferStatus(`'${selectedRemote.name}' yerel bilgisayara indiriliyor...`);
    setTimeout(() => {
      setLocalFiles(prev => [...prev, { ...selectedRemote, date: 'Az önce' }]);
      setTransferStatus(`'${selectedRemote.name}' başarıyla indirildi!`);
      setTimeout(() => setTransferStatus(null), 3000);
    }, 1200);
  };

  const deleteRemoteFile = () => {
    if (!selectedRemote) return;
    if (confirm(`'${selectedRemote.name}' dosyasını uzaktaki makineden silmek istediğinize emin misiniz?`)) {
      setRemoteFiles(prev => prev.filter(f => f.name !== selectedRemote.name));
      setSelectedRemote(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-[94vw] max-w-6xl h-[85vh] rounded-2xl border border-[#243540] bg-[#0c1419] shadow-2xl overflow-hidden text-slate-100">
        
        {/* Üst Başlık */}
        <div className="flex h-12 items-center justify-between border-b border-[#243540] bg-[#101b22] px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#142028] text-[#d7b469] border border-[#d7b469]/30">
              <FolderOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                CENTEKS ÇİFT YÖNLÜ <span className="text-[#d7b469]">DOSYA YÖNETİCİSİ</span>
              </h3>
              <p className="text-[10px] text-slate-400 font-mono">
                P2P Şifreli Güvenli Dosya Transferi • Hedef: {device.name} ({device.ip})
              </p>
            </div>
          </div>

          {transferStatus && (
            <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 border border-emerald-500/30 text-xs text-emerald-400 animate-pulse">
              <CheckCircle className="h-3.5 w-3.5" />
              <span>{transferStatus}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-[#142028] hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* İki Panelli Dosya Gezgini */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-[#243540] overflow-hidden">
          
          {/* SOL PANEL: Yerel Bilgisayar */}
          <div className="flex flex-col h-full bg-[#080d11] p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#243540]">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-[#d7b469]" />
                <span className="text-xs font-bold text-white">Yerel Bilgisayar (IT İstasyonu)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">C:\Users\BilgiIslem\Downloads</span>
            </div>

            {/* Yerel Dosya Listesi */}
            <div className="flex-1 overflow-y-auto space-y-1">
              {localFiles.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedLocal(f)}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                    selectedLocal?.name === f.name
                      ? 'bg-[#1c2d38] border border-[#d7b469]/50 text-white font-bold'
                      : 'hover:bg-[#142028] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="h-4 w-4 text-[#d7b469] shrink-0" />
                    <span className="truncate">{f.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono text-slate-500">
                    <span>{f.size}</span>
                    <span>{f.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sol Aksiyon: Hedefe Gönder */}
            <div className="pt-3 border-t border-[#243540] flex justify-end">
              <button
                onClick={transferToRemote}
                disabled={!selectedLocal}
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 disabled:opacity-30 px-4 py-2 text-xs font-bold text-[#0c1419] shadow-md transition-all"
              >
                <span>Uzak Makineye Gönder</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* SAĞ PANEL: Uzak Makine */}
          <div className="flex flex-col h-full bg-[#080d11] p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#243540]">
              <div className="flex items-center gap-2">
                <Server className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-bold text-white">Uzak Cihaz ({device.name})</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">C:\CenteksDesk\Data</span>
            </div>

            {/* Uzak Dosya Listesi */}
            <div className="flex-1 overflow-y-auto space-y-1">
              {remoteFiles.map((f, i) => (
                <div
                  key={i}
                  onClick={() => setSelectedRemote(f)}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-colors ${
                    selectedRemote?.name === f.name
                      ? 'bg-[#1c2d38] border border-emerald-500/50 text-white font-bold'
                      : 'hover:bg-[#142028] text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate">
                    {f.type === 'dir' ? (
                      <FolderOpen className="h-4 w-4 text-amber-400 shrink-0" />
                    ) : (
                      <File className="h-4 w-4 text-emerald-400 shrink-0" />
                    )}
                    <span className="truncate">{f.name}</span>
                  </div>
                  <div className="flex items-center gap-3 shrink-0 text-[11px] font-mono text-slate-500">
                    <span>{f.size}</span>
                    <span>{f.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sağ Aksiyon: Yerel Bilgisayara İndir / Sil */}
            <div className="pt-3 border-t border-[#243540] flex items-center justify-between">
              {selectedRemote && (
                <button
                  onClick={deleteRemoteFile}
                  className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 px-3 py-1.5 rounded-lg hover:bg-rose-500/10 transition-colors"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Sil</span>
                </button>
              )}

              <button
                onClick={transferToLocal}
                disabled={!selectedRemote || selectedRemote.type === 'dir'}
                className="flex items-center gap-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 hover:bg-emerald-500/20 disabled:opacity-30 px-4 py-2 text-xs font-bold text-emerald-400 ml-auto transition-all"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Yerel Bilgisayara İndir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
