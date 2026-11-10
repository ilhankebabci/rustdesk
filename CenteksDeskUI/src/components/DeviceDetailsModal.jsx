import React, { useState } from 'react';
import { 
  X, 
  Cpu, 
  HardDrive, 
  Network, 
  Settings, 
  ListChecks, 
  Play, 
  Square, 
  RotateCw, 
  Trash2, 
  Monitor, 
  Activity, 
  CheckCircle, 
  AlertCircle,
  Copy,
  Check,
  Server
} from 'lucide-react';

export default function DeviceDetailsModal({ device, onClose, onConnect, onTerminal }) {
  const [activeTab, setActiveTab] = useState('hardware'); // 'hardware' | 'services' | 'processes'
  const [services, setServices] = useState(device?.services || []);
  const [processes, setProcesses] = useState(device?.processes || []);
  const [actionMessage, setActionMessage] = useState('');
  const [copiedMac, setCopiedMac] = useState(false);

  if (!device) return null;

  const copyMacAddress = () => {
    if (device.mac) {
      navigator.clipboard.writeText(device.mac);
      setCopiedMac(true);
      setTimeout(() => setCopiedMac(false), 2000);
    }
  };

  const handleServiceAction = (serviceName, action) => {
    setServices(prev => prev.map(s => {
      if (s.name === serviceName) {
        if (action === 'start') return { ...s, status: 'Running' };
        if (action === 'stop') return { ...s, status: 'Stopped' };
        if (action === 'restart') return { ...s, status: 'Running' };
      }
      return s;
    }));

    setActionMessage(`'${serviceName}' servisi ${action === 'restart' ? 'yeniden başlatıldı' : action === 'start' ? 'başlatıldı' : 'durduruldu'}.`);
    setTimeout(() => setActionMessage(''), 3000);
  };

  const handleKillProcess = (pid, name) => {
    if (confirm(`'${name}' (PID: ${pid}) işlemini sonlandırmak istediğinize emin misiniz?`)) {
      setProcesses(prev => prev.filter(p => p.pid !== pid));
      setActionMessage(`'${name}' (PID: ${pid}) sonlandırıldı.`);
      setTimeout(() => setActionMessage(''), 3000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-full max-w-4xl rounded-2xl border border-[#243540] bg-[#0c1419] shadow-2xl overflow-hidden text-slate-100 max-h-[90vh]">
        
        {/* Üst Başlık - Cihaz Adı & Durum */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#243540] bg-[#101b22]">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2933] to-[#0c1419] p-2 ring-1 ring-[#d7b469]/40 shadow-md">
              <Server className="h-6 w-6 text-[#d7b469]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                  {device.name}
                </h3>
                <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  device.status === 'online' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-slate-800 text-slate-400'
                }`}>
                  <span className={`h-1.5 w-1.5 rounded-full ${device.status === 'online' ? 'bg-emerald-400' : 'bg-slate-500'}`}></span>
                  {device.status === 'online' ? 'Çevrimiçi' : 'Çevrimdışı'}
                </span>
                <span className="text-[10px] font-mono text-[#d7b469] bg-[#142028] px-2 py-0.5 rounded border border-[#d7b469]/30">
                  ID: {device.rustdeskId}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono mt-0.5">
                {device.osVersion} • {device.user} • IP: {device.ip}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onConnect(device)}
              disabled={device.status !== 'online'}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 disabled:opacity-30 px-3.5 py-1.5 text-xs font-bold text-[#0c1419] shadow-sm transition-all"
            >
              <Monitor className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Masaüstüne Bağlan</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-[#142028] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Tab Menüsü */}
        <div className="flex border-b border-[#243540] bg-[#0c1419] px-6">
          <button
            onClick={() => setActiveTab('hardware')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'hardware'
                ? 'border-[#d7b469] text-[#d7b469] bg-[#142028]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Cpu className="h-4 w-4" />
            <span>Donanım & Sistem Özeti</span>
          </button>

          <button
            onClick={() => setActiveTab('services')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'services'
                ? 'border-[#d7b469] text-[#d7b469] bg-[#142028]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Settings className="h-4 w-4" />
            <span>Sistem Servisleri ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('processes')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'processes'
                ? 'border-[#d7b469] text-[#d7b469] bg-[#142028]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ListChecks className="h-4 w-4" />
            <span>Görev Yöneticisi & İşlemler ({processes.length})</span>
          </button>
        </div>

        {/* Bilgilendirme Bildirimi */}
        {actionMessage && (
          <div className="mx-6 mt-3 flex items-center gap-2 p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs animate-fade-in">
            <CheckCircle className="h-4 w-4 shrink-0" />
            <span>{actionMessage}</span>
          </div>
        )}

        {/* Tab İçerikleri */}
        <div className="p-6 overflow-y-auto max-h-[65vh] space-y-6">
          {/* TAB 1: DONANIM & AĞ BİLGİLERİ */}
          {activeTab === 'hardware' && (
            <div className="space-y-5">
              {/* CPU & RAM Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* CPU Detayları */}
                <div className="rounded-2xl border border-[#243540] bg-[#101b22] p-4.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#243540]">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <Cpu className="h-4 w-4 text-[#d7b469]" />
                      İşlemci (CPU)
                    </span>
                    <span className="text-xs font-mono font-bold text-[#d7b469]">{device.cpu}% Kullanım</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {device.cpuModel || 'Intel Core İşlemci Ailesi'}
                  </p>
                  {/* CPU Progress Bar */}
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        device.cpu > 80 ? 'bg-rose-500' : device.cpu > 50 ? 'bg-amber-400' : 'bg-[#d7b469]'
                      }`}
                      style={{ width: `${device.cpu}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Çalışma Süresi: {device.uptime}</span>
                    <span>Sıcaklık: ~46°C</span>
                  </div>
                </div>

                {/* RAM Detayları */}
                <div className="rounded-2xl border border-[#243540] bg-[#101b22] p-4.5 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-[#243540]">
                    <span className="text-xs font-bold text-white flex items-center gap-2">
                      <HardDrive className="h-4 w-4 text-[#d7b469]" />
                      Bellek (RAM)
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{device.ram}% Dolu</span>
                  </div>
                  <p className="text-xs text-slate-300 font-medium">
                    {device.ramTotal || '16 GB DDR4'}
                  </p>
                  {/* RAM Progress Bar */}
                  <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                    <div 
                      className="h-full rounded-full bg-emerald-500 transition-all duration-500"
                      style={{ width: `${device.ram}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 font-mono">
                    <span>Kullanılan: {device.ramUsed || '8.2 GB'}</span>
                    <span>Boş: {device.ramFree || '7.8 GB'}</span>
                  </div>
                </div>
              </div>

              {/* Sürücüler ve Diskler */}
              <div className="rounded-2xl border border-[#243540] bg-[#101b22] p-4.5 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2 pb-2 border-b border-[#243540]">
                  <HardDrive className="h-4 w-4 text-[#d7b469]" />
                  Depolama Sürücüleri
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {(device.disks || [{ drive: 'C:', label: 'Sistem', total: '512 GB', used: '280 GB', free: '232 GB', percent: 55 }]).map((disk, idx) => (
                    <div key={idx} className="rounded-xl border border-[#243540] bg-[#0c1419] p-3 space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">{disk.drive} ({disk.label})</span>
                        <span className="font-mono text-slate-300">{disk.percent}%</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${disk.percent > 85 ? 'bg-rose-500' : 'bg-cyan-500'}`}
                          style={{ width: `${disk.percent}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                        <span>{disk.used} / {disk.total}</span>
                        <span>{disk.free} boş</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Ağ Bağdaştırıcıları & IP Bilgileri */}
              <div className="rounded-2xl border border-[#243540] bg-[#101b22] p-4.5 space-y-3">
                <h4 className="text-xs font-bold text-white flex items-center gap-2 pb-2 border-b border-[#243540]">
                  <Network className="h-4 w-4 text-[#d7b469]" />
                  Ağ Yapılandırması ve Adaptör Bilgileri
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
                  <div className="rounded-xl bg-[#0c1419] p-3 border border-[#243540]">
                    <span className="text-[10px] text-slate-500 font-mono block">Yerel IP Adresi</span>
                    <span className="font-mono font-bold text-white">{device.ip}</span>
                  </div>
                  <div className="rounded-xl bg-[#0c1419] p-3 border border-[#243540]">
                    <span className="text-[10px] text-slate-500 font-mono block">Varsayılan Ağ Geçidi</span>
                    <span className="font-mono font-bold text-slate-200">{device.gateway || '192.168.16.1'}</span>
                  </div>
                  <div className="rounded-xl bg-[#0c1419] p-3 border border-[#243540]">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500 font-mono">Fiziksel MAC</span>
                      <button onClick={copyMacAddress} className="text-slate-400 hover:text-white">
                        {copiedMac ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                    <span className="font-mono font-bold text-slate-200">{device.mac || '00:1A:2B:3C:4D:5E'}</span>
                  </div>
                  <div className="rounded-xl bg-[#0c1419] p-3 border border-[#243540]">
                    <span className="text-[10px] text-slate-500 font-mono block">DNS Sunucuları</span>
                    <span className="font-mono font-bold text-[#d7b469]">{device.dns || '192.168.16.10'}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SİSTEM SERVİSLERİ */}
          {activeTab === 'services' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Uzak hedef makinede arka planda çalışan Windows Servisleri ve kontrol eylemleri:
              </p>
              <div className="rounded-2xl border border-[#243540] bg-[#0c1419] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101b22] text-slate-400 font-semibold uppercase tracking-wider border-b border-[#243540] text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Servis Adı / Açıklama</th>
                      <th className="py-2.5 px-4">Durum</th>
                      <th className="py-2.5 px-4">Başlangıç Türü</th>
                      <th className="py-2.5 px-4 text-right">Eylemler</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#243540]/60 text-slate-300 font-medium">
                    {services.map((srv, idx) => (
                      <tr key={idx} className="hover:bg-[#142028]/60 transition-colors">
                        <td className="py-3 px-4">
                          <p className="font-bold text-white">{srv.displayName}</p>
                          <p className="text-[10px] font-mono text-slate-500">{srv.name}</p>
                        </td>
                        <td className="py-3 px-4">
                          <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                            srv.status === 'Running' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                          }`}>
                            <span className={`h-1.5 w-1.5 rounded-full ${srv.status === 'Running' ? 'bg-emerald-400' : 'bg-rose-400'}`}></span>
                            {srv.status === 'Running' ? 'Çalışıyor' : 'Durduruldu'}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-slate-400 font-mono text-[11px]">
                          {srv.startup}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-1.5">
                            {srv.status === 'Running' ? (
                              <button
                                onClick={() => handleServiceAction(srv.name, 'stop')}
                                title="Servisi Durdur"
                                className="rounded-lg p-1.5 text-rose-400 hover:bg-rose-500/20 transition-colors"
                              >
                                <Square className="h-3.5 w-3.5" />
                              </button>
                            ) : (
                              <button
                                onClick={() => handleServiceAction(srv.name, 'start')}
                                title="Servisi Başlat"
                                className="rounded-lg p-1.5 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                              >
                                <Play className="h-3.5 w-3.5" />
                              </button>
                            )}
                            <button
                              onClick={() => handleServiceAction(srv.name, 'restart')}
                              title="Yeniden Başlat"
                              className="rounded-lg p-1.5 text-[#d7b469] hover:bg-[#d7b469]/20 transition-colors"
                            >
                              <RotateCw className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: GÖREV YÖNETİCİSİ */}
          {activeTab === 'processes' && (
            <div className="space-y-3">
              <p className="text-xs text-slate-400">
                Uzak makinede çalışan işlemler ve anlık donanım tüketimleri:
              </p>
              <div className="rounded-2xl border border-[#243540] bg-[#0c1419] overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#101b22] text-slate-400 font-semibold uppercase tracking-wider border-b border-[#243540] text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">PID</th>
                      <th className="py-2.5 px-4">İşlem Adı</th>
                      <th className="py-2.5 px-4">Kullanıcı</th>
                      <th className="py-2.5 px-4">CPU %</th>
                      <th className="py-2.5 px-4">Bellek (RAM)</th>
                      <th className="py-2.5 px-4 text-right">Görevi Sonlandır</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#243540]/60 text-slate-300 font-medium">
                    {processes.map((proc) => (
                      <tr key={proc.pid} className="hover:bg-[#142028]/60 transition-colors">
                        <td className="py-2.5 px-4 font-mono text-slate-500 text-[11px]">{proc.pid}</td>
                        <td className="py-2.5 px-4 font-bold text-white">{proc.name}</td>
                        <td className="py-2.5 px-4 text-slate-400 font-mono text-[11px]">{proc.user}</td>
                        <td className="py-2.5 px-4 font-mono text-[#d7b469] text-[11px]">{proc.cpu}%</td>
                        <td className="py-2.5 px-4 font-mono text-slate-300 text-[11px]">{proc.memory}</td>
                        <td className="py-2.5 px-4 text-right">
                          <button
                            onClick={() => handleKillProcess(proc.pid, proc.name)}
                            className="inline-flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-rose-400 hover:bg-rose-500/20 transition-colors"
                          >
                            <Trash2 className="h-3 w-3" />
                            <span>Sonlandır</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Alt Kısım */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#243540] bg-[#101b22]">
          <span className="text-[11px] text-slate-500 font-mono">
            RMM Ajan Versiyonu: Centeks-Agent-v1.5.3 (Canlı Telemetri)
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
