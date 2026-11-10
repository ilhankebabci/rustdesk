import React, { useState } from 'react';
import { 
  Layers, 
  Factory, 
  Building2, 
  Server, 
  Terminal, 
  Laptop, 
  CircleDot, 
  Radio, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Zap
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

  // Departman ikon haritası
  const getDeptIcon = (id) => {
    switch(id) {
      case 'fabrika': return <Factory className="h-4 w-4" />;
      case 'ofis': return <Building2 className="h-4 w-4" />;
      case 'sunucular': return <Server className="h-4 w-4" />;
      case 'it': return <Terminal className="h-4 w-4" />;
      default: return <Layers className="h-4 w-4" />;
    }
  };

  // Departman bazında cihaz sayıları
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
    <aside className="w-72 shrink-0 border-r border-slate-800/80 bg-slate-950/60 p-4 flex flex-col justify-between">
      <div className="space-y-6">
        {/* Hızlı ID ile Bağlan Alanı */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-3.5 shadow-sm">
          <div className="flex items-center gap-2 mb-2 text-xs font-semibold text-slate-300">
            <Zap className="h-3.5 w-3.5 text-amber-400" />
            <span>Hızlı Uzak Bağlantı (ID)</span>
          </div>
          <form onSubmit={handleQuickSubmit} className="space-y-2">
            <input
              type="text"
              value={quickId}
              onChange={(e) => setQuickId(e.target.value)}
              placeholder="RustDesk ID girin... (örn: 984 102 331)"
              className="w-full rounded-xl border border-slate-800 bg-slate-950 px-3 py-1.5 text-xs text-slate-200 placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/20 font-mono"
            />
            <button
              type="submit"
              disabled={!quickId.trim()}
              className="w-full rounded-xl bg-slate-800 hover:bg-blue-600 disabled:opacity-40 disabled:hover:bg-slate-800 py-1.5 text-xs font-semibold text-white transition-colors"
            >
              Doğrudan Bağlan
            </button>
          </form>
        </div>

        {/* Departman Bazlı Gruplar */}
        <div>
          <div className="flex items-center justify-between px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            <span>Departman Grupları</span>
            <span>Aktif / Toplam</span>
          </div>
          <nav className="space-y-1">
            {DEPARTMENTS.map((dept) => {
              const { online, total } = getDeptCounts(dept.id);
              const isActive = selectedDepartment === dept.id;

              return (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDepartment(dept.id)}
                  className={`group flex w-full items-center justify-between rounded-xl px-3 py-2 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}>
                      {getDeptIcon(dept.id)}
                    </span>
                    <span>{dept.name}</span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className={`rounded-md px-1.5 py-0.5 text-[11px] font-mono font-bold ${
                      isActive 
                        ? 'bg-blue-700 text-white' 
                        : 'bg-slate-800 text-slate-300'
                    }`}>
                      <span className="text-emerald-400">{online}</span>
                      <span className="text-slate-500">/</span>
                      <span>{total}</span>
                    </span>
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Durum Filtreleri */}
        <div>
          <div className="px-2 mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
            Durum Filtresi
          </div>
          <div className="flex rounded-xl bg-slate-900/80 p-1 border border-slate-800 text-xs">
            <button
              onClick={() => setStatusFilter('all')}
              className={`flex-1 rounded-lg py-1.5 font-medium transition-all ${
                statusFilter === 'all' 
                  ? 'bg-slate-800 text-white shadow-sm' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Tümü
            </button>
            <button
              onClick={() => setStatusFilter('online')}
              className={`flex-1 rounded-lg py-1.5 font-medium flex items-center justify-center gap-1 transition-all ${
                statusFilter === 'online' 
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
              Online
            </button>
            <button
              onClick={() => setStatusFilter('offline')}
              className={`flex-1 rounded-lg py-1.5 font-medium flex items-center justify-center gap-1 transition-all ${
                statusFilter === 'offline' 
                  ? 'bg-slate-800 text-slate-300 border border-slate-700' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
              Offline
            </button>
          </div>
        </div>
      </div>

      {/* Alt Bilgi & Sunucu Sağlığı */}
      <div className="pt-4 border-t border-slate-800/80">
        <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-3 text-[11px] space-y-1.5">
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-blue-400" />
              Rendezvous ID Sunucu
            </span>
            <span className="text-emerald-400 font-semibold">21116 Aktif</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <Radio className="h-3.5 w-3.5 text-indigo-400" />
              Relay Aktarma
            </span>
            <span className="text-emerald-400 font-semibold">21117 Aktif</span>
          </div>
          <div className="flex items-center justify-between text-slate-400">
            <span className="flex items-center gap-1.5">
              <CircleDot className="h-3.5 w-3.5 text-emerald-400" />
              API & WebRTC
            </span>
            <span className="text-slate-300 font-mono">panel.centeks.com</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

