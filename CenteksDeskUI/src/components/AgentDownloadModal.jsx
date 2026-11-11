import React, { useState } from 'react';
import { 
  X, 
  Download, 
  ShieldCheck, 
  Check, 
  Copy, 
  Laptop, 
  Terminal, 
  Server, 
  Key, 
  Info,
  Layers,
  Sparkles,
  ExternalLink,
  Lock
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockDevices';
import { CenteksRmmService } from '../services/api';

export default function AgentDownloadModal({ onClose }) {
  const [targetDepartment, setTargetDepartment] = useState('fabrika');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedPass, setCopiedPass] = useState(false);
  const [copiedCurl, setCopiedCurl] = useState(false);
  const [downloading, setDownloading] = useState(null);

  const curlCommand = `curl -sSL https://panel.centeks.com/meshagents?group=${targetDepartment}&id=centeks-mesh | sudo bash`;

  const handleDownload = async (type) => {
    setDownloading(type);
    try {
      const res = await CenteksRmmService.handleDownloadAgent(type, targetDepartment);
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

  const copyCurlCommand = () => {
    navigator.clipboard.writeText(curlCommand);
    setCopiedCurl(true);
    setTimeout(() => setCopiedCurl(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-full max-w-2xl rounded-2xl border border-[#243540] bg-[#0c1419] shadow-2xl p-6 overflow-hidden text-slate-100 max-h-[92vh]">
        
        {/* Üst Başlık - Centeks Logo & Bilgi */}
        <div className="flex items-center justify-between pb-4 border-b border-[#243540]">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2933] to-[#0c1419] p-2 ring-1 ring-[#d7b469]/40 shadow-lg">
              <img src="/centeks-emblem.svg" alt="CENTEKS" className="h-full w-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                CENTEKS <span className="text-[#d7b469]">AJAN VE İSTEMCİ DAĞITIM MERKEZİ</span>
              </h3>
              <p className="text-xs text-slate-400">
                Kurulumlu Arka Plan Servisi ve Tek Seferlik Acil Destek İstemcileri
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-[#142028] transition-colors"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Gövde - Scrollable */}
        <div className="py-4 space-y-4 overflow-y-auto">
          
          {/* Departman Grubu Seçimi Dropdown */}
          <div className="rounded-xl border border-[#243540] bg-[#101b22] p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <Layers className="h-4 w-4 text-[#d7b469]" />
              <div>
                <label className="text-xs font-bold text-white block">
                  Kurulacak Hedef Departman Grubu
                </label>
                <p className="text-[11px] text-slate-400">
                  İstemci kurulduğunda otomatik olarak bu departman filtresine atanır
                </p>
              </div>
            </div>

            <select
              value={targetDepartment}
              onChange={(e) => setTargetDepartment(e.target.value)}
              className="rounded-xl border border-[#d7b469]/50 bg-[#080d11] px-3.5 py-2 text-xs font-bold text-[#d7b469] focus:outline-none focus:ring-1 focus:ring-[#d7b469]"
            >
              {DEPARTMENTS.filter(d => d.id !== 'all').map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} Departmanı
                </option>
              ))}
            </select>
          </div>

          {/* 1. SEÇENEK: WINDOWS KURULUM DOSYASI (MeshService / RustDesk Service) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-xl border border-[#d7b469]/50 bg-gradient-to-r from-[#14232c] to-[#0e171d] p-4 transition-all hover:border-[#d7b469]/80 shadow-lg shadow-black/40">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#d7b469] to-[#b99547] text-[#0c1419] font-black text-lg shadow-md">
                ⊞
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">Windows Kurulum Dosyası (.exe Servis)</h4>
                  <span className="rounded bg-[#d7b469]/20 px-2 py-0.5 text-[9px] font-mono font-bold text-[#d7b469] border border-[#d7b469]/30">
                    Sürekli Arka Plan Servisi
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Bilgisayar yeniden başlasa bile Windows Servisi olarak sessizce çalışır; kullanıcı oturumu açılmadan da uzaktan erişim sağlar.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload('installer')}
              disabled={downloading === 'installer'}
              className="shrink-0 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 px-4 py-2.5 text-xs font-bold text-[#0c1419] transition-all shadow-md"
            >
              <Download className="h-4 w-4 stroke-[2.5]" />
              <span>{downloading === 'installer' ? 'Hazırlanıyor...' : 'Kurulum İndir (.exe)'}</span>
            </button>
          </div>

          {/* 2. SEÇENEK: WINDOWS PORTABLE (One-Time / Kurulumsuz Taşınabilir) */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3.5 rounded-xl border border-[#243540] bg-[#101920] p-4 hover:border-slate-600 transition-all">
            <div className="flex items-start gap-3.5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#142028] text-[#d7b469] border border-[#243540]">
                <Laptop className="h-5 w-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-xs font-bold text-white">Windows Taşınabilir (Portable / One-Time)</h4>
                  <span className="rounded bg-blue-500/10 px-2 py-0.5 text-[9px] font-mono font-bold text-blue-400 border border-blue-500/20">
                    Acil Destek
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  Yönetici yetkisi ve kurulum istemez. Tek parça .exe dosyası çift tıkla anında açılır, kapatıldığında iz bırakmaz.
                </p>
              </div>
            </div>

            <button
              onClick={() => handleDownload('portable')}
              disabled={downloading === 'portable'}
              className="shrink-0 flex items-center justify-center gap-2 rounded-xl border border-[#243540] bg-[#142028] hover:border-[#d7b469]/50 hover:text-[#d7b469] px-4 py-2.5 text-xs font-bold text-slate-200 transition-all"
            >
              <Download className="h-4 w-4" />
              <span>{downloading === 'portable' ? 'Hazırlanıyor...' : 'Taşınabilir (.exe)'}</span>
            </button>
          </div>

          {/* 3. SEÇENEK: LINUX UBUNTU / DEBIAN SCRIPT */}
          <div className="rounded-xl border border-[#243540] bg-[#101920] p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-[#142028] text-amber-400 border border-[#243540]">
                  <Terminal className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Linux Ubuntu / Debian Tek Satır Kurulum Scripti</h4>
                  <p className="text-[10px] text-slate-400">Terminalde çalıştırıldığında Centeks servisini otomatik kurar</p>
                </div>
              </div>

              <button
                onClick={copyCurlCommand}
                className="flex items-center gap-1.5 rounded-lg bg-[#142028] hover:bg-[#1a2933] px-3 py-1 text-xs font-semibold text-[#d7b469] border border-[#d7b469]/30 transition-colors"
              >
                {copiedCurl ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                <span>{copiedCurl ? 'Kopyalandı' : 'Komutu Kopyala'}</span>
              </button>
            </div>

            <div className="rounded-lg bg-[#080d11] p-2.5 border border-[#243540] font-mono text-[11px] text-emerald-400 break-all select-all">
              {curlCommand}
            </div>
          </div>

          {/* ÖN-YAPILANDIRILMIŞ KURUMSAL SUNUCU BİLGİLERİ */}
          <div className="rounded-xl border border-[#243540] bg-[#0c1419] p-4 space-y-2.5">
            <div className="flex items-center justify-between pb-2 border-b border-[#243540]">
              <span className="text-xs font-bold text-slate-200 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                Gömülü Gelen Ağ ve Güvenlik Parametreleri
              </span>
              <span className="text-[10px] text-emerald-400 font-mono font-bold">Otomatik Yapılandırılmıştır</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#142028] border border-[#243540]">
                <span className="text-slate-400 text-[11px]">Rendezvous (ID):</span>
                <span className="font-bold text-slate-200 text-[11px]">destek.centeks.com:21116</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#142028] border border-[#243540]">
                <span className="text-slate-400 text-[11px]">API / Panel URL:</span>
                <span className="font-bold text-[#d7b469] text-[11px]">https://panel.centeks.com</span>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#142028] border border-[#243540]">
                <span className="text-slate-400 text-[11px]">Sabit Şifre:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-emerald-400 text-[11px]">Centeks.#2027!</span>
                  <button onClick={copyPass} className="text-slate-400 hover:text-white">
                    {copiedPass ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between p-2 rounded-lg bg-[#142028] border border-[#243540]">
                <span className="text-slate-400 text-[11px]">Public Key:</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-slate-300 text-[10px] truncate max-w-[100px]">MGQRTw1Xi...</span>
                  <button onClick={copyKey} className="text-slate-400 hover:text-white">
                    {copiedKey ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="flex items-center justify-between pt-3 border-t border-[#243540] text-xs">
          <span className="text-slate-500 font-mono text-[11px]">
            CENTEKS Group Bilgi İşlem • Dahili: 101
          </span>
          <button
            onClick={onClose}
            className="rounded-xl border border-[#243540] bg-[#142028] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
