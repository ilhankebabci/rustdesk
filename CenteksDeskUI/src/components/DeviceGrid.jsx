import React, { useState } from 'react';
import { 
  LayoutGrid, 
  List, 
  Monitor, 
  Terminal, 
  FolderOpen, 
  Info,
  Cpu, 
  HardDrive 
} from 'lucide-react';
import DeviceCard from './DeviceCard';

export default function DeviceGrid({ 
  devices, 
  onConnect, 
  onTerminal, 
  onFiles,
  onDetails,
  selectedDepartmentName
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      {/* Üst Başlık & Görünüm Seçici */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#243540]">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-white flex items-center gap-2.5">
            <span>{selectedDepartmentName}</span>
            <span className="text-xs font-mono font-bold rounded-lg bg-[#142028] px-2.5 py-0.5 text-[#d7b469] border border-[#d7b469]/30">
              {devices.length} Cihaz
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Canlı RMM telemetrisi, donanım kaynakları ve doğrudan bağlantı kontrolleri
          </p>
        </div>

        {/* Görünüm Değiştirici (Grid / Liste) - Centeks Gold & Navy */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-[#142028] p-1 border border-[#243540]">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid Kart Görünümü"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === 'grid' 
                  ? 'bg-gradient-to-r from-[#d7b469] to-[#c49e52] text-[#0c1419] font-bold shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              title="Detaylı Tablo Görünümü"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === 'table' 
                  ? 'bg-gradient-to-r from-[#d7b469] to-[#c49e52] text-[#0c1419] font-bold shadow-md' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <List className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Cihaz Bulunamadı Durumu */}
      {devices.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-[#243540] bg-[#0c1419]/60 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#142028] text-[#d7b469] mb-3 border border-[#243540]">
            <Monitor className="h-6 w-6" />
          </div>
          <h3 className="text-sm font-semibold text-slate-200">Eşleşen Cihaz Bulunamadı</h3>
          <p className="text-xs text-slate-400 max-w-sm mt-1">
            Filtreleme kriterlerinize veya arama teriminize uygun herhangi bir istemci bulunamadı. Lütfen filtrelerinizi sıfırlayın.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* GRID KARTLARI */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {devices.map((device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onConnect={onConnect}
              onTerminal={onTerminal}
              onFiles={onFiles}
              onDetails={onDetails}
            />
          ))}
        </div>
      ) : (
        /* DETAYLI TABLO GÖRÜNÜMÜ */
        <div className="rounded-2xl border border-[#243540] bg-[#0c1419] overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101b22] text-slate-400 font-semibold uppercase tracking-wider border-b border-[#243540] text-[10px]">
              <tr>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4">Cihaz Adı</th>
                <th className="py-3 px-4">RustDesk ID</th>
                <th className="py-3 px-4">IP Adresi</th>
                <th className="py-3 px-4">Departman</th>
                <th className="py-3 px-4">Kullanıcı</th>
                <th className="py-3 px-4">CPU / RAM</th>
                <th className="py-3 px-4">İşletim Sistemi</th>
                <th className="py-3 px-4 text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#243540]/60 text-slate-300 font-medium">
              {devices.map((device) => {
                const isOnline = device.status === 'online';
                return (
                  <tr key={device.id} className="hover:bg-[#142028]/60 transition-colors">
                    <td className="py-3 px-4">
                      {isOnline ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                          Online
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-2.5 py-0.5 text-[11px] font-medium text-slate-400 border border-slate-700">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                          Offline
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span 
                        onClick={() => onDetails && onDetails(device)}
                        className="font-bold text-white hover:text-[#d7b469] cursor-pointer transition-colors"
                      >
                        {device.name}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-[#d7b469]">
                      {device.rustdeskId}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-300">
                      {device.ip}
                    </td>
                    <td className="py-3 px-4">
                      <span className="capitalize text-slate-300 text-[11px] bg-[#142028] px-2 py-0.5 rounded border border-[#243540]">
                        {device.department}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-300">
                      {device.user}
                    </td>
                    <td className="py-3 px-4">
                      {isOnline ? (
                        <div className="flex items-center gap-2.5 text-[11px] font-mono">
                          <span className="text-[#d7b469]">CPU: {device.cpu}%</span>
                          <span className="text-slate-600">|</span>
                          <span className="text-emerald-400">RAM: {device.ram}%</span>
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px] font-mono truncate max-w-[140px]">
                      {device.osVersion}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onConnect(device)}
                          disabled={!isOnline}
                          className="rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 disabled:opacity-30 px-3 py-1 text-xs font-bold text-[#0c1419] transition-all"
                        >
                          Bağlan
                        </button>
                        <button
                          onClick={() => onTerminal(device)}
                          disabled={!isOnline}
                          title="Terminal"
                          className="rounded-xl border border-[#243540] bg-[#142028] p-1.5 text-slate-300 hover:text-[#d7b469] hover:border-[#d7b469]/50 disabled:opacity-30 transition-colors"
                        >
                          <Terminal className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onFiles(device)}
                          disabled={!isOnline}
                          title="Dosyalar"
                          className="rounded-xl border border-[#243540] bg-[#142028] p-1.5 text-slate-300 hover:text-[#d7b469] hover:border-[#d7b469]/50 disabled:opacity-30 transition-colors"
                        >
                          <FolderOpen className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onDetails && onDetails(device)}
                          title="Donanım Özeti"
                          className="rounded-xl border border-[#243540] bg-[#142028] p-1.5 text-slate-300 hover:text-[#d7b469] hover:border-[#d7b469]/50 transition-colors"
                        >
                          <Info className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
