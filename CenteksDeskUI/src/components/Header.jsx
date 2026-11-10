import React, { useState, useRef, useEffect } from 'react';
import { 
  Search, 
  Download, 
  Shield, 
  Bell, 
  User, 
  Server, 
  ChevronDown, 
  CheckCircle, 
  RefreshCw,
  Globe,
  Radio,
  Lock,
  Settings,
  Users,
  FileSpreadsheet,
  LogOut,
  KeyRound,
  ShieldAlert,
  Sliders
} from 'lucide-react';

export default function Header({ 
  searchQuery, 
  setSearchQuery, 
  onDownloadClick,
  onlineCount,
  totalCount,
  onRefresh,
  onOpenAccountSettings,
  onOpenUserManagement,
  onOpenAuditLogs
}) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const profileRef = useRef(null);
  const notifRef = useRef(null);

  // Dışarı tıklandığında menüleri kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-[#243540] bg-[#0c1419]/95 px-6 backdrop-blur-md">
      {/* Sol: Centeks Logo & Kurumsal Kimlik */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-3.5">
          {/* Centeks Amblem Logosu - Mükemmel Oturan Vektör */}
          <div className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2933] to-[#0c1419] p-1.5 ring-1 ring-[#d7b469]/40 shadow-lg shadow-[#d7b469]/5">
            <img 
              src="/centeks-emblem.svg" 
              alt="CENTEKS" 
              className="h-full w-full object-contain filter drop-shadow-[0_2px_4px_rgba(215,180,105,0.3)]"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/logo.png';
              }} 
            />
          </div>

          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold tracking-wider text-white uppercase font-sans">
                CENTEKS <span className="text-[#d7b469] font-black">DESTEK</span>
              </span>
              <span className="rounded-md bg-[#d7b469]/15 px-2 py-0.5 text-[10px] font-mono font-bold text-[#d7b469] ring-1 ring-inset ring-[#d7b469]/30">
                PRO RMM
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium flex items-center gap-1.5">
              <span>CENTEKS Group Bilgi İşlem</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-semibold flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
                Sistemler Aktif
              </span>
            </p>
          </div>
        </div>

        {/* Sunucu & Altyapı Canlı Rozetleri */}
        <div className="hidden xl:flex items-center gap-2.5 ml-6">
          <div className="flex items-center gap-2 rounded-xl bg-[#142028] px-3 py-1.5 ring-1 ring-[#243540]">
            <Radio className="h-3.5 w-3.5 text-[#d7b469] animate-pulse" />
            <span className="text-xs text-slate-300 font-mono">destek.centeks.com:21116</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-[#142028] px-3 py-1.5 ring-1 ring-[#243540]">
            <Lock className="h-3.5 w-3.5 text-emerald-400" />
            <span className="text-xs text-slate-300 font-mono">panel.centeks.com</span>
            <span className="text-[10px] text-emerald-400 font-bold ml-1">SSL</span>
          </div>

          <div className="flex items-center gap-1.5 rounded-xl bg-emerald-500/10 px-3 py-1.5 ring-1 ring-emerald-500/20">
            <span className="text-xs text-emerald-400 font-bold font-mono">
              {onlineCount} / {totalCount} Cihaz Çevrimiçi
            </span>
          </div>
        </div>
      </div>

      {/* Orta: Gerçek zamanlı arama çubuğu */}
      <div className="relative flex-1 max-w-md mx-6">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-[#d7b469]/70" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cihaz adı, IP, kullanıcı veya ID ara..."
            className="w-full rounded-xl border border-[#243540] bg-[#080d11]/80 py-2 pl-10 pr-16 text-xs text-slate-100 placeholder-slate-500 transition-all focus:border-[#d7b469] focus:bg-[#0c1419] focus:outline-none focus:ring-2 focus:ring-[#d7b469]/20"
          />
          {searchQuery && (
            <button 
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-slate-400 hover:text-white"
            >
              Temizle
            </button>
          )}
        </div>
      </div>

      {/* Sağ: Yenile, Ajan İndir & Profil Menüsü */}
      <div className="flex items-center gap-3">
        {/* Yenile Butonu */}
        <button
          onClick={onRefresh}
          title="Telemetri Verilerini Yenile"
          className="rounded-xl border border-[#243540] bg-[#142028] p-2 text-slate-300 hover:text-[#d7b469] hover:border-[#d7b469]/50 transition-all"
        >
          <RefreshCw className="h-4 w-4" />
        </button>

        {/* Yeni Ajan İndir Butonu - Centeks Gold / Navy Tema */}
        <button
          onClick={onDownloadClick}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#b99547] px-4 py-2 text-xs font-bold text-[#0c1419] shadow-lg shadow-[#d7b469]/20 transition-all hover:brightness-110 active:scale-95"
        >
          <Download className="h-4 w-4 stroke-[2.5]" />
          <span>+ Yeni Ajan İndir (.exe)</span>
        </button>

        {/* Bildirimler */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative rounded-xl border border-[#243540] bg-[#142028] p-2 text-slate-300 hover:text-white transition-colors"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#d7b469]"></span>
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-[#243540] bg-[#0f1920] p-3 shadow-2xl shadow-black z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#243540]">
                <h4 className="text-xs font-bold text-white">CENTEKS Operasyon Bildirimleri</h4>
                <span className="text-[10px] text-[#d7b469] font-mono">Tümü Okundu</span>
              </div>
              <div className="py-2 text-xs space-y-2.5">
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#142028]">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-100 font-semibold text-[11px]">panel.centeks.com SSL Devrede</p>
                    <p className="text-[10px] text-slate-400">DNS A kaydı ve TLS sertifikası aktif.</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-2 rounded-lg bg-[#142028]">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="text-slate-100 font-semibold text-[11px]">destek.centeks.com:21116 Aktif</p>
                    <p className="text-[10px] text-slate-400">Rendezvous ve relay sunucusu P2P hazır.</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* PROFİL & HESAP YÖNETİMİ MENÜSÜ */}
        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2.5 rounded-xl border border-[#243540] bg-[#142028] px-3 py-1.5 text-xs text-slate-200 hover:border-[#d7b469]/50 transition-colors"
          >
            {/* Profil Avatarı */}
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-[#d7b469] to-[#b99547] text-[#0c1419] font-black text-xs shadow-sm">
              İK
            </div>

            <div className="hidden md:block text-left">
              <span className="font-bold text-white block text-xs leading-none">İlhan Kebabçı</span>
              <span className="text-[10px] text-[#d7b469] font-mono leading-none">Site Administrator</span>
            </div>

            <ChevronDown className="h-3.5 w-3.5 text-slate-400" />
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-2 w-72 rounded-2xl border border-[#243540] bg-[#0c1419] p-2 shadow-2xl shadow-black z-50 divide-y divide-[#243540]/60">
              {/* Profil Başlığı */}
              <div className="p-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-[#d7b469] to-[#b99547] text-[#0c1419] font-black text-sm">
                    İK
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">İlhan Kebabçı</h4>
                    <p className="text-[11px] font-mono text-slate-400">destek@centeks.com</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-md bg-[#d7b469]/15 px-2 py-0.5 text-[10px] font-mono font-bold text-[#d7b469] border border-[#d7b469]/30">
                    Site Administrator
                  </span>
                  <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 font-semibold">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span> 2FA Aktif
                  </span>
                </div>
              </div>

              {/* Menü Eylemleri */}
              <div className="py-1.5 space-y-0.5">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenAccountSettings();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-[#142028] hover:text-[#d7b469] transition-colors"
                >
                  <KeyRound className="h-4 w-4 text-[#d7b469]" />
                  <span>Hesap & Güvenlik Ayarları</span>
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenUserManagement();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-[#142028] hover:text-[#d7b469] transition-colors"
                >
                  <Users className="h-4 w-4 text-[#d7b469]" />
                  <span>Kullanıcı & Yetki Yönetimi (RBAC)</span>
                </button>

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    onOpenAuditLogs();
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-slate-300 hover:bg-[#142028] hover:text-[#d7b469] transition-colors"
                >
                  <ShieldAlert className="h-4 w-4 text-[#d7b469]" />
                  <span>Olay & Denetim Günlüğü (Audit Log)</span>
                </button>
              </div>

              {/* Çıkış Yap */}
              <div className="pt-1.5">
                <button
                  onClick={() => {
                    setProfileOpen(false);
                    if (confirm('Centeks Destek RMM oturumunu sonlandırmak istediğinize emin misiniz?')) {
                      window.location.reload();
                    }
                  }}
                  className="flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium text-rose-400 hover:bg-rose-500/10 transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Güvenli Çıkış Yap</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
