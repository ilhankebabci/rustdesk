import React, { useState } from 'react';
import { 
  X, 
  KeyRound, 
  ShieldCheck, 
  Smartphone, 
  Laptop, 
  Lock, 
  Check, 
  Copy, 
  AlertTriangle, 
  LogOut, 
  Clock, 
  Globe, 
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { LOGIN_SESSIONS } from '../data/mockDevices';

export default function AccountSettingsModal({ onClose }) {
  const [activeTab, setActiveTab] = useState('password'); // 'password' | '2fa' | 'sessions'

  // Şifre Formu
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordSuccess, setPasswordSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');

  // 2FA State
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [totpCode, setTotpCode] = useState('');
  const [copiedKey, setCopiedKey] = useState(false);
  const [copiedBackup, setCopiedBackup] = useState(false);
  const [totpSuccess, setTotpSuccess] = useState(false);

  // Oturumlar State
  const [sessions, setSessions] = useState(LOGIN_SESSIONS);
  const [sessionsTerminated, setSessionsTerminated] = useState(false);

  const secretKey = 'JBSWY3DPEHPK3PXP';
  const backupCodes = [
    '7841-9920', '3310-8451', '6290-1145', '8841-2093',
    '5512-3890', '1920-4481', '7732-9014', '4201-6678'
  ];

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    setPasswordError('');
    if (!currentPassword) {
      setPasswordError('Mevcut şifrenizi giriniz.');
      return;
    }
    if (newPassword.length < 8) {
      setPasswordError('Yeni şifre en az 8 karakter olmalıdır.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordError('Yeni şifreler birbiriyle eşleşmiyor.');
      return;
    }
    setPasswordSuccess(true);
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setTimeout(() => setPasswordSuccess(false), 3500);
  };

  const copySecretKey = () => {
    navigator.clipboard.writeText(secretKey);
    setCopiedKey(true);
    setTimeout(() => setCopiedKey(false), 2000);
  };

  const copyBackupCodes = () => {
    navigator.clipboard.writeText(backupCodes.join('\n'));
    setCopiedBackup(true);
    setTimeout(() => setCopiedBackup(false), 2000);
  };

  const handleTerminateOtherSessions = () => {
    setSessions(prev => prev.filter(s => s.current));
    setSessionsTerminated(true);
    setTimeout(() => setSessionsTerminated(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-full max-w-2xl rounded-2xl border border-[#243540] bg-[#0c1419] shadow-2xl overflow-hidden text-slate-100">
        
        {/* Üst Başlık - Centeks Kimlik */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#243540] bg-[#101b22]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2933] to-[#0c1419] p-2 ring-1 ring-[#d7b469]/40 shadow-md">
              <img src="/centeks-emblem.svg" alt="CENTEKS" className="h-full w-full object-contain" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                HESAP VE <span className="text-[#d7b469]">GÜVENLİK AYARLARI</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                destek@centeks.com • Site Administrator
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

        {/* Tab Menüsü */}
        <div className="flex border-b border-[#243540] bg-[#0c1419] px-6">
          <button
            onClick={() => setActiveTab('password')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'password'
                ? 'border-[#d7b469] text-[#d7b469] bg-[#142028]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <KeyRound className="h-4 w-4" />
            <span>Şifre Değiştir</span>
          </button>

          <button
            onClick={() => setActiveTab('2fa')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === '2fa'
                ? 'border-[#d7b469] text-[#d7b469] bg-[#142028]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="h-4 w-4" />
            <span>İki Aşamalı Doğrulama (2FA)</span>
            <span className="rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[9px] text-emerald-400 font-mono">Aktif</span>
          </button>

          <button
            onClick={() => setActiveTab('sessions')}
            className={`flex items-center gap-2 py-3 px-4 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'sessions'
                ? 'border-[#d7b469] text-[#d7b469] bg-[#142028]/50'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Laptop className="h-4 w-4" />
            <span>Aktif Oturumlar ({sessions.length})</span>
          </button>
        </div>

        {/* Tab İçerikleri */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {/* TAB 1: ŞİFRE DEĞİŞTİR */}
          {activeTab === 'password' && (
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              {passwordSuccess && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Şifreniz başarıyla güncellendi. Güvenliğiniz için diğer oturumlarınızı kontrol etmeniz önerilir.</span>
                </div>
              )}

              {passwordError && (
                <div className="flex items-center gap-2.5 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                  <AlertTriangle className="h-4 w-4 shrink-0" />
                  <span>{passwordError}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Mevcut Şifre
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:border-[#d7b469] focus:outline-none focus:ring-1 focus:ring-[#d7b469]/30"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Yeni Şifre
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="En az 8 karakter..."
                    className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:border-[#d7b469] focus:outline-none focus:ring-1 focus:ring-[#d7b469]/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Yeni Şifre (Tekrar)
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Şifreyi onaylayın..."
                    className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3.5 py-2.5 text-xs text-slate-100 placeholder-slate-600 focus:border-[#d7b469] focus:outline-none focus:ring-1 focus:ring-[#d7b469]/30"
                  />
                </div>
              </div>

              <div className="rounded-xl border border-[#243540] bg-[#142028] p-3 text-[11px] text-slate-400 space-y-1">
                <span className="font-semibold text-slate-200">Kurumsal Güvenlik Kriterleri:</span>
                <ul className="list-disc list-inside space-y-0.5 text-slate-400">
                  <li>En az 8 karakter uzunluğunda olmalıdır.</li>
                  <li>Büyük harf, küçük harf, rakam ve özel karakter içermelidir.</li>
                  <li>Önceki son 3 şifre ile aynı olamaz.</li>
                </ul>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 px-5 py-2.5 text-xs font-bold text-[#0c1419] shadow-md transition-all"
                >
                  <Lock className="h-3.5 w-3.5" />
                  <span>Şifreyi Güncelle</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: 2FA / TOTP */}
          {activeTab === '2fa' && (
            <div className="space-y-5">
              <div className="flex items-start justify-between p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/10">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400 mt-0.5">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">İki Aşamalı Doğrulama Aktif</h4>
                    <p className="text-[11px] text-slate-300 mt-0.5">
                      Giriş yaparken şifrenizin yanı sıra Google Authenticator / Microsoft Authenticator uygulamasından 6 haneli kod istenir.
                    </p>
                  </div>
                </div>
                <span className="rounded-md bg-emerald-500 px-2 py-1 text-[10px] font-bold text-black uppercase">
                  Koruma Açık
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* QR Kod Alanı */}
                <div className="rounded-xl border border-[#243540] bg-[#142028] p-4 flex flex-col items-center text-center">
                  <div className="p-3 rounded-2xl bg-white shadow-md mb-3">
                    {/* SVG Temsili TOTP QR Kodu */}
                    <svg className="w-32 h-32" viewBox="0 0 100 100" fill="#0c1419">
                      <rect x="0" y="0" width="30" height="30" rx="4" />
                      <rect x="5" y="5" width="20" height="20" fill="white" rx="2" />
                      <rect x="10" y="10" width="10" height="10" />
                      <rect x="70" y="0" width="30" height="30" rx="4" />
                      <rect x="75" y="5" width="20" height="20" fill="white" rx="2" />
                      <rect x="80" y="10" width="10" height="10" />
                      <rect x="0" y="70" width="30" height="30" rx="4" />
                      <rect x="5" y="75" width="20" height="20" fill="white" rx="2" />
                      <rect x="10" y="80" width="10" height="10" />
                      <rect x="40" y="10" width="20" height="10" />
                      <rect x="45" y="30" width="15" height="15" />
                      <rect x="35" y="55" width="30" height="10" />
                      <rect x="40" y="75" width="20" height="15" />
                      <rect x="75" y="45" width="15" height="20" />
                      <rect x="70" y="75" width="20" height="15" />
                    </svg>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-300">
                    Google / Microsoft Authenticator ile Tara
                  </span>
                  
                  {/* Gizli Anahtar */}
                  <div className="mt-3 w-full flex items-center justify-between rounded-lg bg-[#080d11] px-2.5 py-1.5 border border-[#243540]">
                    <span className="text-[10px] font-mono text-slate-400">Gizli Anahtar:</span>
                    <span className="text-xs font-mono font-bold text-[#d7b469]">{secretKey}</span>
                    <button
                      onClick={copySecretKey}
                      className="text-slate-400 hover:text-white transition-colors"
                      title="Gizli Anahtarı Kopyala"
                    >
                      {copiedKey ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Acil Durum Yedek Kodları */}
                <div className="rounded-xl border border-[#243540] bg-[#142028] p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Lock className="h-3.5 w-3.5 text-[#d7b469]" />
                        Tek Kullanımlık Yedek Kodlar
                      </span>
                      <button
                        onClick={copyBackupCodes}
                        className="text-[11px] text-[#d7b469] hover:underline flex items-center gap-1"
                      >
                        {copiedBackup ? <Check className="h-3 w-3 text-emerald-400" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedBackup ? 'Kopyalandı' : 'Tümünü Kopyala'}</span>
                      </button>
                    </div>
                    <p className="text-[10px] text-slate-400 mb-3">
                      Telefonunuza erişemediğiniz durumlarda bu kodların her biri 1 defa giriş için kullanılabilir.
                    </p>

                    <div className="grid grid-cols-2 gap-1.5 font-mono text-[11px]">
                      {backupCodes.map((code, idx) => (
                        <div key={idx} className="rounded-lg bg-[#080d11] px-2 py-1 text-slate-300 border border-[#243540]/60 text-center">
                          {code}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-[#243540] flex justify-between items-center text-[10px] text-slate-500 font-mono">
                    <span>8 kodun 8'i kullanılabilir</span>
                    <span className="text-[#d7b469]">Güvenli Saklayınız</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: AKTİF OTURUMLAR */}
          {activeTab === 'sessions' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-white">Giriş Yapılan Cihazlar ve Oturumlar</h4>
                  <p className="text-[11px] text-slate-400">
                    Hesabınıza bağlı olan tarayıcı ve masaüstü istemcileri
                  </p>
                </div>

                {sessions.length > 1 && (
                  <button
                    onClick={handleTerminateOtherSessions}
                    className="flex items-center gap-1.5 rounded-xl border border-rose-500/30 bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 text-xs font-semibold text-rose-400 transition-colors"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Diğer Tüm Oturumları Kapat</span>
                  </button>
                )}
              </div>

              {sessionsTerminated && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>Mevcut oturumunuz haricindeki tüm aktif oturumlar başarıyla sonlandırıldı.</span>
                </div>
              )}

              <div className="space-y-2.5">
                {sessions.map((sess) => (
                  <div
                    key={sess.id}
                    className={`flex items-center justify-between p-3.5 rounded-xl border transition-all ${
                      sess.current 
                        ? 'border-[#d7b469]/50 bg-[#14232c] shadow-md' 
                        : 'border-[#243540] bg-[#101920]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl ${sess.current ? 'bg-[#d7b469]/20 text-[#d7b469]' : 'bg-[#142028] text-slate-400'}`}>
                        <Laptop className="h-5 w-5" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h5 className="text-xs font-bold text-white">{sess.device}</h5>
                          {sess.current && (
                            <span className="rounded-md bg-emerald-500/20 px-2 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/30">
                              Bu Cihaz (Şu Anki)
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-mono text-slate-400 flex items-center gap-2 mt-0.5">
                          <span>{sess.ip}</span>
                          <span className="text-slate-600">•</span>
                          <span className="flex items-center gap-1">
                            <Globe className="h-3 w-3 text-slate-500" />
                            {sess.location}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {sess.lastActive}
                      </span>
                      {!sess.current && (
                        <button
                          onClick={() => setSessions(prev => prev.filter(s => s.id !== sess.id))}
                          className="text-xs text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10 transition-colors"
                          title="Bu oturumu sonlandır"
                        >
                          Kapat
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Alt Kısım - Kapat Butonu */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#243540] bg-[#101b22]">
          <span className="text-[11px] text-slate-500 font-mono">
            Centeks Kimlik Doğrulama Servisi • panel.centeks.com
          </span>
          <button
            onClick={onClose}
            className="rounded-xl border border-[#243540] bg-[#142028] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:border-[#d7b469]/50 transition-colors"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}
