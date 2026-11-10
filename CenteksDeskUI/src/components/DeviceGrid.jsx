import React, { useState } from 'react';
import { LayoutGrid, List, Monitor, Terminal, FolderOpen, ArrowUpDown, Cpu, HardDrive } from 'lucide-react';
import DeviceCard from './DeviceCard';

export default function DeviceGrid({ 
  devices, 
  onConnect, 
  onTerminal, 
  onFiles,
  selectedDepartmentName
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  return (
    <div className="flex-1 overflow-y-auto p-6 space-y-5">
      {/* Üst Başlık & Görünüm Seçici */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-800/80">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>{selectedDepartmentName} Cihazları</span>
            <span className="text-xs font-mono font-medium rounded-full bg-slate-800 px-2.5 py-0.5 text-slate-400">
              {devices.length} Cihaz
            </span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Canlı RMM telemetrisi, donanım kaynakları ve doğrudan bağlantı kontrolleri
          </p>
        </div>

        {/* Görünüm Değiştirici (Grid / Liste) */}
        <div className="flex items-center gap-2">
          <div className="flex rounded-xl bg-slate-900/90 p-1 border border-slate-800">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid Kart Görünümü"
              className={`rounded-lg p-1.5 transition-all ${
                viewMode === 'grid' 
                  ? 'bg-blue-600 text-white shadow-sm' 
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
                  ? 'bg-blue-600 text-white shadow-sm' 
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
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-800 bg-slate-900/30 p-12 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-800/60 text-slate-400 mb-3">
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
            />
          ))}
        </div>
      ) : (
        /* TABLO GÖRÜNÜMÜ */
        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden shadow-xl">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-800 text-[10px]">
              <tr>
                <th className="py-3 px-4">Durum</th>
                <th className="py-3 px-4">Cihaz Adı</th>
                <th className="py-3 px-4">RustDesk ID</th>
                <th className="py-3 px-4">IP Adresi</th>
                <th className="py-3 px-4">Kullanıcı</th>
                <th className="py-3 px-4">CPU / RAM</th>
                <th className="py-3 px-4">İşletim Sistemi</th>
                <th className="py-3 px-4 text-right">Eylemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-medium">
              {devices.map((device) => {
                const isOnline = device.status === 'online';
                return (
                  <tr key={device.id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="py-3 px-4">
                      {isOnline ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                          Online
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-400">
                          <span className="h-1.5 w-1.5 rounded-full bg-slate-500"></span>
                          Offline
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 font-semibold text-slate-100">
                      {device.name}
                    </td>
                    <td className="py-3 px-4 font-mono font-medium text-slate-300">
                      {device.rustdeskId}
                    </td>
                    <td className="py-3 px-4 font-mono text-slate-400">
                      {device.ip}
                    </td>
                    <td className="py-3 px-4 text-slate-400">
                      {device.user}
                    </td>
                    <td className="py-3 px-4">
                      {isOnline ? (
                        <div className="flex items-center gap-3 text-[11px]">
                          <span>CPU: <strong className="text-slate-200">{device.cpu}%</strong></span>
                          <span>RAM: <strong className="text-slate-200">{device.ram}%</strong></span>
                        </div>
                      ) : (
                        <span className="text-slate-500">-</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-slate-400 text-[11px]">
                      {device.osVersion}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => onConnect(device)}
                          disabled={!isOnline}
                          className="rounded-lg bg-blue-600 hover:bg-blue-500 disabled:opacity-40 px-2.5 py-1 text-xs font-semibold text-white transition-colors"
                        >
                          Bağlan
                        </button>
                        <button
                          onClick={() => onTerminal(device)}
                          disabled={!isOnline}
                          title="Terminal"
                          className="rounded-lg border border-slate-700 bg-slate-800 p-1 hover:text-white transition-colors"
                        >
                          <Terminal className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => onFiles(device)}
                          disabled={!isOnline}
                          title="Dosyalar"
                          className="rounded-lg border border-slate-700 bg-slate-800 p-1 hover:text-white transition-colors"
                        >
                          <FolderOpen className="h-3.5 w-3.5" />
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

