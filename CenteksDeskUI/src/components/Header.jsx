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
          {/* Centeks Amblem Logosu - Kusursuz Oturan Vektör */}
          <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#182630] to-[#0c1419] p-1.5 border border-[#d7b469]/40 shadow-md shadow-black/40">
            <svg 
              className="h-8 w-8" 
              viewBox="24.549 -3.751 72.847 72.847" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="centeks-emblem">
                <path 
                  transform="matrix(1,0,0,-1,1,212.5592)" 
                  d="M30.2505 148.2508 89.6953 148.2146 89.6822 151.6246 33.6682 151.6252 33.6623 208.1126 86.2705 208.1463 86.275 160.1583 62.5456 160.1376 62.5334 156.8424C63.381 156.5104 86.6489 156.7244 89.6837 156.7244L89.6953 211.5592 30.2618 211.5587ZM74.4888 177.4655 73.8323 178.1036C73.5831 178.3037 73.364 178.4761 73.0429 178.6252 71.7588 176.9788 69.4284 174.9172 66.9657 173.74 64.3397 172.4839 60.3332 172.2283 57.6655 173.6011 52.7936 176.1083 51.9021 183.2309 52.2128 190.165 52.5076 196.7445 54.4791 203.4374 61.4066 203.2999 66.4832 203.1993 70.1728 198.6647 72.0485 194.5284 72.2585 194.0652 72.8033 192.7621 73.4933 193.5281 73.8193 193.8526 73.6631 196.3817 73.6625 196.9773 73.6622 198.1996 73.662 199.4216 73.662 200.6439 73.662 201.3976 73.7683 203.7249 73.6617 204.2963 73.548 204.906 72.8101 204.8097 72.4776 204.5052 72.2889 204.3323 72.0099 203.6531 71.7968 203.3473 70.079 200.8814 66.4515 205.0557 59.9621 204.8564 41.4136 204.2867 37.6809 178.6025 53.4336 171.8464 57.0334 170.3024 61.96 169.8678 65.9812 171.1896 69.0341 172.1931 72.9476 175.0978 74.4888 177.4655" 
                  fill="#d7b469" 
                  fillRule="evenodd"
                />
                <path 
                  transform="matrix(1,0,0,-1,1,212.5592)" 
                  d="M55.5129 177.5631 58.6573 185.3269C59.4068 184.3903 62.4776 175.4306 63.3699 174.1297 65.4551 174.0798 68.7101 176.0669 69.7204 177.0151 70.2711 177.5322 70.1243 177.639 69.7992 178.3894 69.5534 178.9566 69.3431 179.4773 69.1019 180.053 68.273 182.0299 62.5717 196.1152 62.1913 196.2405L60.863 196.2346C60.6056 195.2538 55.9998 184.0459 55.2368 182.1926 54.43 180.2327 53.9833 180.2639 55.2875 177.8916 55.4332 177.6268 55.3754 177.7192 55.5129 177.5631ZM65.2303 169.6082C65.3488 168.4672 66.6601 166.5354 66.8171 165.0209 66.9342 163.8927 66.3593 163.6027 65.3907 163.3995 64.5661 163.2268 63.3892 163.0655 62.5482 163.0528L62.5348 161.8285C67.8229 161.8101 73.9672 161.7389 79.1793 161.8515L79.1768 163.0202C76.3554 163.4295 76.0014 163.6985 74.5526 167.042 74.0991 168.0883 73.7172 169.0364 73.2739 170.0838 72.9581 170.8299 72.3594 172.5131 71.9549 173.0857 69.018 170.5479 66.6133 170.2959 65.2303 169.6082ZM44.8693 163.0684 44.8668 161.8279 55.5659 161.8268 55.5644 163.0621C53.4929 163.1546 51.0429 163.1438 51.2189 165.4041 51.3768 167.4366 52.5376 169.001 52.7828 170.6559L51.0695 171.5715C50.6574 171.1522 49.2471 167.3118 48.8529 166.4427 47.8752 164.2876 47.6113 163.3677 44.8693 163.0684" 
                  fill="#ffffff" 
                  fillRule="evenodd"
                />
              </g>
            </svg>
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
