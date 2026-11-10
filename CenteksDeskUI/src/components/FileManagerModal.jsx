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
  File
} from 'lucide-react';

export default function FileManagerModal({ device, onClose }) {
  // Yerel Dosyalar (IT Yöneticisi)
  const [localFiles, setLocalFiles] = useState([
    { name: 'CENTEKS-Ajan-Guncelleme.exe', size: '24.5 MB', type: 'exe', date: 'Bugün 14:20' },
    { name: 'Network-Diagnostics.ps1', size: '12 KB', type: 'script', date: 'Dün' },
    { name: 'VPN-Config-Centeks.ovpn', size: '4 KB', type: 'config', date: '08.11.2026' },
    { name: 'Sertifika-RootCA.crt', size: '2 KB', type: 'cert', date: '01.11.2026' },
  ]);

  // Uzak Cihaz Dosyaları
  const [remoteFiles, setRemoteFiles] = useState([
    { name: 'Windows', size: '-', type: 'dir', date: '10.11.2026' },
    { name: 'Program Files', size: '-', type: 'dir', date: '10.11.2026' },
    { name: 'CenteksDesk', size: '-', type: 'dir', date: '10.11.2026' },
    { name: 'app_log.txt', size: '1.2 MB', type: 'text', date: 'Bugün 15:10' },
    { name: 'crashdump.dmp', size: '45.1 MB', type: 'dump', date: 'Dün 08:30' },
  ]);

  const [selectedLocal, setSelectedLocal] = useState(null);
  const [selectedRemote, setSelectedRemote] = useState(null);
  const [transferStatus, setTransferStatus] = useState(null);

  const transferToRemote = () => {
    if (!selectedLocal) return;
    setTransferStatus(`'${selectedLocal.name}' hedef cihaza aktarılıyor...`);
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-[94vw] max-w-6xl h-[85vh] rounded-2xl border border-slate-800 bg-slate-950 shadow-2xl overflow-hidden">
        {/* Üst Başlık */}
        <div className="flex h-12 items-center justify-between border-b border-slate-800 bg-slate-900/90 px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-blue-400">
              <FolderOpen className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-bold text-white">Çift Yönlü Dosya Yöneticisi</h3>
              <p className="text-[10px] text-slate-400">Güvenli SFTP / P2P Dosya Aktarım Protokolü</p>
            </div>
          </div>

          {transferStatus && (
            <div className="flex items-center gap-2 rounded-full bg-blue-500/10 px-3 py-1 border border-blue-500/20 text-xs text-blue-300 animate-pulse">
              <CheckCircle className="h-3.5 w-3.5 text-blue-400" />
              <span>{transferStatus}</span>
            </div>
          )}

          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* İki Panelli Dosya Gezgini */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-slate-800 overflow-hidden">
          {/* SOL PANEL: Yerel Bilgisayar */}
          <div className="flex flex-col h-full bg-slate-950/60 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Laptop className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-semibold text-slate-200">Yerel Bilgisayar (IT)</span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">C:\Destek\Tools</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1">
              {localFiles.map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedLocal(file)}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
                    selectedLocal?.name === file.name
                      ? 'bg-blue-600/20 border border-blue-500/40 text-blue-300'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <FileText className="h-4 w-4 text-blue-400 shrink-0" />
                    <span className="truncate font-medium">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 shrink-0 font-mono">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sol Aksiyon */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{localFiles.length} dosya</span>
              <button
                onClick={transferToRemote}
                disabled={!selectedLocal}
                className="flex items-center gap-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 disabled:opacity-40 px-3 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <span>Hedefe Gönder</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* SAĞ PANEL: Hedef Cihaz */}
          <div className="flex flex-col h-full bg-slate-950/60 p-4">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <HardDrive className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-semibold text-slate-200">
                  Hedef: {device.name}
                </span>
              </div>
              <span className="text-[10px] font-mono text-slate-500">C:\</span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-1">
              {remoteFiles.map((file, idx) => (
                <div
                  key={idx}
                  onClick={() => setSelectedRemote(file)}
                  className={`flex items-center justify-between p-2 rounded-xl text-xs cursor-pointer transition-all ${
                    selectedRemote?.name === file.name
                      ? 'bg-emerald-600/20 border border-emerald-500/40 text-emerald-300'
                      : 'hover:bg-slate-900 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {file.type === 'dir' ? (
                      <FolderOpen className="h-4 w-4 text-amber-400 shrink-0" />
                    ) : (
                      <File className="h-4 w-4 text-emerald-400 shrink-0" />
                    )}
                    <span className="truncate font-medium">{file.name}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500 shrink-0 font-mono">
                    <span>{file.size}</span>
                    <span>{file.date}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Sağ Aksiyon */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <span className="text-[11px] text-slate-500">{remoteFiles.length} öğe</span>
              <button
                onClick={transferToLocal}
                disabled={!selectedRemote || selectedRemote.type === 'dir'}
                className="flex items-center gap-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 disabled:opacity-40 px-3 py-1.5 text-xs font-semibold text-slate-200 transition-colors"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                <span>Yerel Bilgisayara İndir</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

