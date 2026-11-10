import React, { useState } from 'react';
import { 
  X, 
  FileSpreadsheet, 
  ShieldAlert, 
  Search, 
  Filter, 
  Monitor, 
  Terminal, 
  FolderOpen, 
  RefreshCw,
  Clock,
  Calendar,
  CheckCircle,
  Download
} from 'lucide-react';
import { INITIAL_AUDIT_LOGS } from '../data/mockDevices';

export default function AuditLogModal({ onClose }) {
  const [logs, setLogs] = useState(INITIAL_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [actionFilter, setActionFilter] = useState('all');

  const filteredLogs = logs.filter(log => {
    if (departmentFilter !== 'all' && log.department.toLowerCase() !== departmentFilter.toLowerCase()) {
      return false;
    }
    if (actionFilter !== 'all' && log.actionType !== actionFilter) {
      return false;
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        log.user.toLowerCase().includes(q) ||
        log.targetDevice.toLowerCase().includes(q) ||
        log.targetId.includes(q) ||
        log.action.toLowerCase().includes(q) ||
        log.clientIp.includes(q)
      );
    }
    return true;
  });

  const exportToCSV = () => {
    const headers = ['ID', 'Kullanici', 'Hedef Cihaz', 'RustDesk ID', 'Eylem', 'Departman', 'Baslangic', 'Bitis', 'Sure', 'Istemci IP', 'Durum'];
    const rows = filteredLogs.map(l => [
      l.id,
      `"${l.user}"`,
      `"${l.targetDevice}"`,
      `"${l.targetId}"`,
      `"${l.action}"`,
      `"${l.department}"`,
      `"${l.startTime}"`,
      `"${l.endTime}"`,
      `"${l.duration}"`,
      `"${l.clientIp}"`,
      `"${l.status}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Centeks_Destek_Audit_Logs_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getActionIcon = (actionType) => {
    switch (actionType) {
      case 'desktop': return <Monitor className="h-3.5 w-3.5 text-[#d7b469]" />;
      case 'terminal': return <Terminal className="h-3.5 w-3.5 text-blue-400" />;
      case 'files': return <FolderOpen className="h-3.5 w-3.5 text-amber-400" />;
      default: return <Clock className="h-3.5 w-3.5 text-emerald-400" />;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-full max-w-5xl rounded-2xl border border-[#243540] bg-[#0c1419] shadow-2xl overflow-hidden text-slate-100 max-h-[90vh]">
        
        {/* Üst Başlık */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#243540] bg-[#101b22]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2933] to-[#0c1419] p-2 ring-1 ring-[#d7b469]/40 shadow-md">
              <ShieldAlert className="h-5 w-5 text-[#d7b469]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                GÜVENLİK VE <span className="text-[#d7b469]">DENETİM GÜNLÜĞÜ (AUDIT LOGS)</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Uzak Masaüstü, Konsol ve Dosya Transferi Erişim Kayıtları
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportToCSV}
              className="flex items-center gap-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 px-3.5 py-1.5 text-xs font-bold text-white shadow-md transition-all active:scale-95"
            >
              <Download className="h-3.5 w-3.5 stroke-[2.5]" />
              <span>Dışa Aktar (CSV)</span>
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-[#142028] transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Filtreleme ve Arama Çubuğu */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3 border-b border-[#243540] bg-[#0c1419]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Kullanıcı, hedef makine veya IP ara..."
              className="w-full rounded-xl border border-[#243540] bg-[#080d11] py-1.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 focus:border-[#d7b469] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            {/* Departman Filtresi */}
            <select
              value={departmentFilter}
              onChange={(e) => setDepartmentFilter(e.target.value)}
              className="rounded-xl border border-[#243540] bg-[#080d11] px-3 py-1.5 text-xs text-slate-300 focus:border-[#d7b469] focus:outline-none"
            >
              <option value="all">Tüm Departmanlar</option>
              <option value="Fabrika">Fabrika</option>
              <option value="Ofis / Muhasebe">Ofis / Muhasebe</option>
              <option value="Sunucular">Sunucular</option>
              <option value="Bilgi İşlem">Bilgi İşlem</option>
            </select>

            {/* Eylem Tipi Filtresi */}
            <select
              value={actionFilter}
              onChange={(e) => setActionFilter(e.target.value)}
              className="rounded-xl border border-[#243540] bg-[#080d11] px-3 py-1.5 text-xs text-slate-300 focus:border-[#d7b469] focus:outline-none"
            >
              <option value="all">Tüm Eylemler</option>
              <option value="desktop">Uzak Masaüstü</option>
              <option value="terminal">Sessiz Terminal</option>
              <option value="files">Dosya Transferi</option>
              <option value="service">Servis Eylemleri</option>
            </select>
          </div>
        </div>

        {/* Tablo Alanı */}
        <div className="p-6 overflow-y-auto max-h-[65vh]">
          <div className="rounded-2xl border border-[#243540] bg-[#0c1419] overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#101b22] text-slate-400 font-semibold uppercase tracking-wider border-b border-[#243540] text-[10px]">
                <tr>
                  <th className="py-3 px-4">Operatör (Kullanıcı)</th>
                  <th className="py-3 px-4">Hedef Cihaz</th>
                  <th className="py-3 px-4">Eylem Türü</th>
                  <th className="py-3 px-4">Departman</th>
                  <th className="py-3 px-4">Zaman Aralığı</th>
                  <th className="py-3 px-4">Süre</th>
                  <th className="py-3 px-4">İstemci IP</th>
                  <th className="py-3 px-4 text-right">Durum</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#243540]/60 text-slate-300 font-medium">
                {filteredLogs.map((log) => (
                  <tr key={log.id} className="hover:bg-[#142028]/60 transition-colors">
                    {/* Operatör */}
                    <td className="py-3 px-4">
                      <span className="font-bold text-white">{log.user}</span>
                    </td>

                    {/* Hedef Cihaz */}
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-bold text-slate-200">{log.targetDevice}</p>
                        <p className="text-[10px] font-mono text-[#d7b469]">{log.targetId}</p>
                      </div>
                    </td>

                    {/* Eylem */}
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center gap-1.5 rounded-lg bg-[#142028] px-2.5 py-1 text-[11px] font-semibold text-slate-200 border border-[#243540]">
                        {getActionIcon(log.actionType)}
                        {log.action}
                      </span>
                    </td>

                    {/* Departman */}
                    <td className="py-3 px-4">
                      <span className="text-slate-400 capitalize text-[11px]">
                        {log.department}
                      </span>
                    </td>

                    {/* Zaman */}
                    <td className="py-3 px-4 text-[11px] font-mono text-slate-300">
                      <div>{log.startTime.split(' ')[1]} - {log.endTime}</div>
                      <div className="text-[10px] text-slate-500">{log.startTime.split(' ')[0]}</div>
                    </td>

                    {/* Süre */}
                    <td className="py-3 px-4 text-[11px] font-mono text-[#d7b469]">
                      {log.duration}
                    </td>

                    {/* IP */}
                    <td className="py-3 px-4 text-[11px] font-mono text-slate-400">
                      {log.clientIp}
                    </td>

                    {/* Durum */}
                    <td className="py-3 px-4 text-right">
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[10px] font-bold text-emerald-400 border border-emerald-500/20">
                        <CheckCircle className="h-3 w-3" />
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alt Bilgi */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#243540] bg-[#101b22]">
          <span className="text-[11px] text-slate-500 font-mono">
            {filteredLogs.length} Denetim Kaydı Listeleniyor • 90 Gün Saklama İlkesi Aktif
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
