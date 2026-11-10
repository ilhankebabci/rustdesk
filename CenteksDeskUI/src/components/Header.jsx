import React, { useState } from 'react';
import { Search, Download, Shield, Bell, User, Server, ChevronDown, CheckCircle, RefreshCw } from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onDownloadClick,
  onlineCount,
  totalCount,
  onRefresh
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-800/80 bg-slate-900/90 px-6 backdrop-blur-md">
      {/* Sol: Logo & Başlık */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-blue-700 to-indigo-600 shadow-lg shadow-blue-500/20 ring-1 ring-white/20">
            <img 
              src="/logo.png" 
              alt="CENTEKS" 
              className="h-7 w-7 object-contain"
              onError={(e) => {
                // Logo yüklenemezse ikon gösterimi
                e.target.style.display = 'none';
              }} 
            />
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold tracking-tight text-white">CENTEKS Destek</h1>
              <span className="rounded-md bg-blue-500/10 px-2 py-0.5 text-[10px] font-semibold text-blue-400 ring-1 ring-inset ring-blue-500/20">
                RMM v1.5
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium">Bilgi İşlem Departmanı Yönetim Paneli</p>
          </div>
        </div>

        {/* Canlı Sunucu Göstergesi */}
        <div className="hidden lg:flex items-center gap-2 rounded-full bg-slate-950/60 px-3 py-1 ring-1 ring-slate-800 ml-4">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-xs text-slate-300 font-mono">destek.centeks.com</span>
          <span className="text-[10px] text-slate-500">|</span>
          <span className="text-xs text-emerald-400 font-medium">{onlineCount}/{totalCount} Aktif</span>
        </div>
      </div>

      {/* Orta: Gerçek zamanlı arama çubuğu */}
      <div className="relative flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cihaz adı, IP adresi veya kullanıcı ara... (örn: 192.168.16, dokuma)"
            className="w-full rounded-xl border border-slate-800 bg-slate-950/70 py-2 pl-10 pr-4 text-sm text-slate-200 placeholder-slate-500 transition-all focus:border-blue-500 focus:bg-slate-950 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* Sağ: Aksiyonlar & Profil Menüsü */}
      <div className="flex items-center gap-3">
        {/* Yenile Butonu */}
        <button
          onClick={onRefresh}
          title="Cihaz Durumlarını Yenile"
          className="rounded-xl border border-slate-800 bg-slate-800/40 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        {/* Yeni Ajan İndir Aksiyon Butonu */}
        <button
          onClick={onDownloadClick}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/25 transition-all hover:from-blue-500 hover:to-indigo-500 hover:shadow-blue-500/35 active:scale-95"
        >
          <Download className="h-4 w-4" />
          <span>+ Yeni Ajan / İstemci İndir</span>
        </button>

        {/* Bildirimler */}
        <div className="relative">
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-xl border border-slate-800 bg-slate-800/40 p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-blue-500"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-slate-800 bg-slate-900 p-3 shadow-2xl shadow-black/80 ring-1 ring-white/5 z-50">
              <h4 className="text-xs font-semibold text-slate-300 pb-2 border-b border-slate-800">Sistem Bildirimleri</h4>
              <div className="py-2 text-xs text-slate-400 space-y-2">
                <div className="flex items-start gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-200 font-medium">SSL Sertifikası Aktif</p>
                    <p className="text-[10px] text-slate-500">panel.centeks.com bağlantısı şifrelendi</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Server className="h-4 w-4 text-blue-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-200 font-medium">Rendezvous Sunucu Aktif</p>
                    <p className="text-[10px] text-slate-500">Port 21116 hazır (Gecikme 8ms)</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Profil Menüsü */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 rounded-xl border border-slate-800/80 bg-slate-800/30 py-1.5 pl-2 pr-3 hover:bg-slate-800/60 transition-all"
          >
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 text-xs font-bold text-blue-400 ring-1 ring-blue-500/30">
              İA
            </div>
            <div className="text-left hidden md:block">
              <p className="text-xs font-semibold text-slate-200">İlhan K.</p>
              <p className="text-[10px] text-slate-400">IT Administrator</p>
            </div>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-2xl shadow-black/80 ring-1 ring-white/5 z-50">
              <div className="px-3 py-2 border-b border-slate-800">
                <p className="text-xs font-semibold text-white">CENTEKS Bilgi İşlem</p>
                <p className="text-[11px] text-slate-400">ilhan@centeks.com</p>
              </div>
              <div className="py-1">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  <User className="h-3.5 w-3.5" />
                  Profil & Güvenlik
                </button>
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-slate-300 hover:bg-slate-800 hover:text-white">
                  <Server className="h-3.5 w-3.5" />
                  RMM Sunucu Ayarları
                </button>
              </div>
              <div className="pt-1 border-t border-slate-800">
                <button className="flex w-full items-center gap-2 rounded-lg px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-500/10">
                  Çıkış Yap
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

