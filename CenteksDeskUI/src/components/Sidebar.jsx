import React, { useState } from 'react';
import { 
  Layers, 
  Factory, 
  Building2, 
  Server, 
  Terminal, 
  Radio, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Zap,
  PhoneCall,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { DEPARTMENTS } from '../data/mockDevices';

export default function Sidebar({ 
  selectedDepartment, 
  setSelectedDepartment, 
  statusFilter, 
  setStatusFilter,
  devices,
  onQuickConnect
}) {
  const [quickId, setQuickId] = useState('');

  const getDeptIcon = (id) => {
    switch(id) {
      case 'fabrika': return <Factory className="h-4 w-4" />;
      case 'ofis': return <Building2 className="h-4 w-4" />;
      case 'sunucular': return <Server className="h-4 w-4" />;
      case 'it': return <Terminal className="h-4 w-4" />;
      default: return <Layers className="h-4 w-4" />;
    }
  };

  const getDeptCounts = (deptId) => {
    const deptDevices = deptId === 'all' 
      ? devices 
      : devices.filter(d => d.department === deptId);
    
    const online = deptDevices.filter(d => d.status === 'online').length;
    const total = deptDevices.length;
    return { online, total };
  };

  const handleQuickSubmit = (e) => {
    e.preventDefault();
    if (!quickId.trim()) return;
    onQuickConnect(quickId.trim());
    setQuickId('');
  };

  return (
    <aside className="w-72 shrink-0 border-r border-[#243540] bg-[#0c1419]/95 p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Hızlı ID ile Bağlan Alanı - Centeks Gold & Navy Vurgusu */}
        <div className="rounded-2xl border border-[#243540] bg-gradient-to-b from-[#142028] to-[#0c1419] p-3.5 shadow-md">
          <div className="flex items-center justify-between mb-2">
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-200">
              <Zap className="h-3.5 w-3.5 text-[#d7b469]" />
              Hızlı Uzak Masaüstü
            </span>
            <span className="text-[10px] text-[#d7b469] font-mono font-semibold">P2P / Relay</span>
          </div>
          <form onSubmit={handleQuickSubmit} className="space-y-2">
            <input
              type="text"
              value={quickId}
              onChange={(e) => setQuickId(e.target.value)}
              placeholder="RustDesk ID... (örn: 984 102 331)"
              className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3 py-2 text-xs text-slate-100 placeholder-slate-500 focus:border-[#d7b469] focus:outline-none focus:ring-1 focus:ring-[#d7b469]/30 font-mono"
            />
            <button
              type="submit"
              disabled={!quickId.trim()}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#d7b469] hover:bg-[#c49e52] disabled:opacity-40 disabled:hover:bg-[#d7b469] py-2 text-xs font-bold text-[#0c1419] transition-all shadow-sm"
            >
              <span>Doğrudan Bağlan</span>
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </form>
        </div>

        {/* Departman Bazlı Gruplar */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#d7b469]/80 font-mono">
            <span>Departman Grupları</span>
            <span>Online / Toplam</span>
          </div>
          <nav className="space-y-1">
            {DEPARTMENTS.map((dept) => {
              const { online, total } = getDeptCounts(dept.id);
              const isActive = selectedDepartment === dept.id;

              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-[#1c2d38] to-[#142028] text-white border-l-4 border-[#d7b469] shadow-lg shadow-black/30'
                      : 'text-slate-400 hover:bg-[#142028]/60 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-[#d7b469]' : 'text-slate-400 group-hover:text-slate-200'}>
                      {getDeptIcon(dept.id)}
                    </span>
                    <span className={isActive ? 'font-bold text-white' : ''}>{dept.name}</span>
                  </div>

                  <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-mono font-bold ${
                    isActive 
                      ? 'bg-[#0c1419] text-[#d7b469] border border-[#d7b469]/30' 
                      : 'bg-[#142028] text-slate-400'
                  }`}>
                    <span className="text-emerald-400">{online}</span>
                    <span className="text-slate-600">/</span>
                    <span>{total}</span>
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Durum Filtreleri */}
        <div>
          <div className="px-2 mb-2 text-[10px] font-extrabold uppercase tracking-widest text-[#d7b469]/80 font-mono">
            Filtreleme
          </div>
          <div className="flex rounded-xl bg-[#142028] p-1 border border-[#243540] text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 rounded-lg py-1.5 font-medium transition-all ${
                statusFilter === 'all' 
                  ? 'bg-[#1c2d38] text-white shadow-sm font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setStatusFilter('online')}
              className={`flex-1 rounded-lg py-1.5 font-medium flex items-center justify-center gap-1.5 transition-all ${
                statusFilter === 'online' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Online
            </button>
            <button
              onClick={() => setStatusFilter('offline')}
              className={`flex-1 rounded-lg py-1.5 font-medium flex items-center justify-center gap-1.5 transition-all ${
                statusFilter === 'offline' 
                  ? 'bg-[#1c2d38] text-slate-300 font-semibold' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
              Offline
            </button>
          </div>
        </div>
      </div>

      {/* Alt Kurumsal Bilgi Kutusu - CENTEKS Bilgileri */}
      <div className="pt-4 border-t border-[#243540]">
        <div className="rounded-xl border border-[#243540] bg-gradient-to-br from-[#142028] to-[#080d11] p-3 text-[11px] space-y-2">
          <div className="flex items-center justify-between pb-1.5 border-b border-[#243540]/60">
            <span className="font-bold text-white tracking-wide">CENTEKS GROUP</span>
            <span className="text-[10px] text-[#d7b469] font-mono font-semibold">IT Destek</span>
          </div>
          
          <div className="space-y-1 text-slate-400 text-[10px] font-mono">
            <div className="flex items-center justify-between">
              <span>Sunucu:</span>
              <span className="text-slate-200">destek.centeks.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Panel URL:</span>
              <span className="text-[#d7b469]">panel.centeks.com</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Şifreleme:</span>
              <span className="text-emerald-400">Ed25519 + ChaCha20</span>
            </div>
          </div>

          <div className="pt-1.5 flex items-center justify-between text-[10px] text-slate-400 border-t border-[#243540]/60">
            <span className="flex items-center gap-1 text-[#d7b469]">
              <PhoneCall className="h-3 w-3" />
              Dahili: 101
            </span>
            <span className="text-slate-500">v1.5.3-prod</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
