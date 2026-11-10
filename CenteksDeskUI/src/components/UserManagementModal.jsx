import React, { useState } from 'react';
import { 
  X, 
  UserPlus, 
  Shield, 
  Users, 
  Check, 
  Trash2, 
  Edit3, 
  Lock, 
  Search, 
  Mail, 
  CheckCircle2, 
  AlertCircle,
  Building2,
  Factory,
  Server,
  Terminal,
  Layers
} from 'lucide-react';
import { INITIAL_USERS, DEPARTMENTS } from '../data/mockDevices';

export default function UserManagementModal({ onClose }) {
  const [users, setUsers] = useState(INITIAL_USERS);
  const [searchUser, setSearchUser] = useState('');
  const [selectedUser, setSelectedUser] = useState(null); // Düzenleme için seçili kullanıcı
  const [isAddingUser, setIsAddingUser] = useState(false);

  // Yeni Kullanıcı Form State
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newRole, setNewRole] = useState('Departman Yetkilisi');
  const [newDepartments, setNewDepartments] = useState(['fabrika']);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Kullanıcı Arama Filtresi
  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(searchUser.toLowerCase()) || 
    u.email.toLowerCase().includes(searchUser.toLowerCase()) ||
    u.role.toLowerCase().includes(searchUser.toLowerCase())
  );

  const toggleDeptForNewUser = (deptId) => {
    if (deptId === 'all') {
      setNewDepartments(['all']);
      return;
    }
    setNewDepartments(prev => {
      const withoutAll = prev.filter(d => d !== 'all');
      if (withoutAll.includes(deptId)) {
        const next = withoutAll.filter(d => d !== deptId);
        return next.length === 0 ? ['fabrika'] : next;
      } else {
        return [...withoutAll, deptId];
      }
    });
  };

  const toggleDeptForSelectedUser = (deptId) => {
    if (!selectedUser) return;
    let updatedDepts;
    if (deptId === 'all') {
      updatedDepts = ['all'];
    } else {
      const withoutAll = (selectedUser.allowedDepartments || []).filter(d => d !== 'all');
      if (withoutAll.includes(deptId)) {
        updatedDepts = withoutAll.filter(d => d !== deptId);
        if (updatedDepts.length === 0) updatedDepts = [deptId];
      } else {
        updatedDepts = [...withoutAll, deptId];
      }
    }
    setSelectedUser({
      ...selectedUser,
      allowedDepartments: updatedDepts
    });
  };

  const handleSaveSelectedUser = () => {
    if (!selectedUser) return;
    setUsers(prev => prev.map(u => u.id === selectedUser.id ? selectedUser : u));
    setSaveSuccess(true);
    setTimeout(() => {
      setSaveSuccess(false);
      setSelectedUser(null);
    }, 1500);
  };

  const handleAddUserSubmit = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newEmail.trim()) return;

    const newUser = {
      id: `usr-${Date.now()}`,
      name: newName.trim(),
      email: newEmail.trim(),
      role: newRole,
      badge: newRole === 'Site Administrator' ? 'Full Admin' : 'Yetkili',
      allowedDepartments: newRole === 'Site Administrator' ? ['all'] : newDepartments,
      twoFactor: false,
      status: 'Davet Gönderildi',
      lastLogin: 'Giriş bekleniyor',
      avatarColor: 'from-[#d7b469] to-[#c49e52]'
    };

    setUsers(prev => [newUser, ...prev]);
    setIsAddingUser(false);
    setNewName('');
    setNewEmail('');
    setNewRole('Departman Yetkilisi');
    setNewDepartments(['fabrika']);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleDeleteUser = (userId) => {
    if (confirm('Bu kullanıcının RMM erişim yetkisini iptal etmek istediğinize emin misiniz?')) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      if (selectedUser?.id === userId) setSelectedUser(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-full max-w-4xl rounded-2xl border border-[#243540] bg-[#0c1419] shadow-2xl overflow-hidden text-slate-100 max-h-[90vh]">
        
        {/* Üst Başlık */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#243540] bg-[#101b22]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-[#1a2933] to-[#0c1419] p-2 ring-1 ring-[#d7b469]/40 shadow-md">
              <Users className="h-5 w-5 text-[#d7b469]" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide uppercase">
                KULLANICI VE <span className="text-[#d7b469]">YETKİ YÖNETİMİ (RBAC)</span>
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                Rol Bazlı Erişim Denetimi & Departman İzin Matrisi
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

        {/* Aksiyon Barı: Arama + Yeni Kullanıcı Ekle */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-6 py-3 border-b border-[#243540] bg-[#0c1419]">
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchUser}
              onChange={(e) => setSearchUser(e.target.value)}
              placeholder="Kullanıcı adı, e-posta veya rol ara..."
              className="w-full rounded-xl border border-[#243540] bg-[#080d11] py-1.5 pl-9 pr-3 text-xs text-slate-100 placeholder-slate-500 focus:border-[#d7b469] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            {saveSuccess && (
              <span className="text-xs text-emerald-400 flex items-center gap-1 font-medium animate-fade-in">
                <CheckCircle2 className="h-4 w-4" /> Değişiklikler kaydedildi
              </span>
            )}

            <button
              onClick={() => {
                setIsAddingUser(!isAddingUser);
                setSelectedUser(null);
              }}
              className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 px-3.5 py-1.5 text-xs font-bold text-[#0c1419] shadow-md transition-all"
            >
              <UserPlus className="h-4 w-4" />
              <span>{isAddingUser ? 'Listeye Dön' : 'Yeni Kullanıcı Davet Et'}</span>
            </button>
          </div>
        </div>

        {/* Gövde Alanı */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* YENİ KULLANICI EKLEME FORMU */}
          {isAddingUser && (
            <form onSubmit={handleAddUserSubmit} className="rounded-2xl border border-[#d7b469]/40 bg-[#14232c] p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-2 border-b border-[#243540]">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <UserPlus className="h-4 w-4 text-[#d7b469]" />
                  Yeni Operatör / Yetkili Davet Et
                </h4>
                <span className="text-[10px] text-[#d7b469] font-mono">E-posta ile davetiye gönderilir</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Ad Soyad</label>
                  <input
                    type="text"
                    required
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Örn: Caner Korkmaz"
                    className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-[#d7b469] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kurumsal E-posta</label>
                  <input
                    type="email"
                    required
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    placeholder="ornek@centeks.com"
                    className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3 py-2 text-xs text-white placeholder-slate-600 focus:border-[#d7b469] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Kullanıcı Rolü</label>
                  <select
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3 py-2 text-xs text-white focus:border-[#d7b469] focus:outline-none"
                  >
                    <option value="Departman Yetkilisi">Departman Yetkilisi (Belirli Gruplar)</option>
                    <option value="Operator (IT)">Operator (IT Destek Personeli)</option>
                    <option value="Yalnızca Görüntüleme">Yalnızca Görüntüleme (Read-Only)</option>
                    <option value="Site Administrator">Site Administrator (Tam Yetkili)</option>
                  </select>
                </div>
              </div>

              {/* RBAC Departman İzin Matrisi */}
              {newRole !== 'Site Administrator' && (
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-2">
                    Erişebileceği Departman Grupları (RBAC İzin Matrisi):
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {DEPARTMENTS.filter(d => d.id !== 'all').map(dept => {
                      const checked = newDepartments.includes(dept.id);
                      return (
                        <button
                          type="button"
                          key={dept.id}
                          onClick={() => toggleDeptForNewUser(dept.id)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                            checked
                              ? 'border-[#d7b469] bg-[#d7b469]/15 text-white font-bold'
                              : 'border-[#243540] bg-[#0c1419] text-slate-400 hover:text-white'
                          }`}
                        >
                          <span>{dept.name}</span>
                          <span className={`h-4 w-4 rounded-md flex items-center justify-center text-[10px] ${
                            checked ? 'bg-[#d7b469] text-[#0c1419] font-black' : 'border border-[#243540]'
                          }`}>
                            {checked && '✓'}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingUser(false)}
                  className="rounded-xl border border-[#243540] bg-[#142028] px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white"
                >
                  İptal
                </button>
                <button
                  type="submit"
                  className="rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 px-5 py-2 text-xs font-bold text-[#0c1419]"
                >
                  Davetiye Gönder
                </button>
              </div>
            </form>
          )}

          {/* DÜZENLENEN KULLANICI RBAC PANELİ */}
          {selectedUser && (
            <div className="rounded-2xl border border-[#d7b469]/50 bg-[#121f28] p-5 space-y-4 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#243540]">
                <div className="flex items-center gap-2.5">
                  <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${selectedUser.avatarColor} flex items-center justify-center font-bold text-xs text-[#0c1419]`}>
                    {selectedUser.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white">{selectedUser.name} — Yetki ve Erişim Matrisi</h4>
                    <p className="text-[11px] font-mono text-slate-400">{selectedUser.email}</p>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedUser(null)}
                  className="text-slate-400 hover:text-white text-xs"
                >
                  Kapat
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Rol</label>
                  <select
                    value={selectedUser.role}
                    onChange={(e) => setSelectedUser({ ...selectedUser, role: e.target.value })}
                    className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3 py-2 text-xs text-white focus:border-[#d7b469] focus:outline-none"
                  >
                    <option value="Site Administrator">Site Administrator (Tüm Sistemler)</option>
                    <option value="Departman Yetkilisi">Departman Yetkilisi</option>
                    <option value="Operator (IT)">Operator (IT)</option>
                    <option value="Yalnızca Görüntüleme">Yalnızca Görüntüleme</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Durum</label>
                  <select
                    value={selectedUser.status}
                    onChange={(e) => setSelectedUser({ ...selectedUser, status: e.target.value })}
                    className="w-full rounded-xl border border-[#243540] bg-[#080d11] px-3 py-2 text-xs text-white focus:border-[#d7b469] focus:outline-none"
                  >
                    <option value="Aktif">Aktif</option>
                    <option value="Askıya Alındı">Askıya Alındı</option>
                  </select>
                </div>
              </div>

              {/* Departman İzin Matrisi */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-2">
                  Erişim İzinleri (RBAC Departman Grupları):
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {DEPARTMENTS.filter(d => d.id !== 'all').map(dept => {
                    const checked = selectedUser.allowedDepartments?.includes('all') || selectedUser.allowedDepartments?.includes(dept.id);
                    return (
                      <button
                        key={dept.id}
                        type="button"
                        onClick={() => toggleDeptForSelectedUser(dept.id)}
                        className={`flex items-center justify-between p-2.5 rounded-xl border text-xs font-medium transition-all ${
                          checked
                            ? 'border-[#d7b469] bg-[#d7b469]/20 text-white font-bold'
                            : 'border-[#243540] bg-[#080d11] text-slate-400 hover:text-white'
                        }`}
                      >
                        <span>{dept.name}</span>
                        <span className={`h-4 w-4 rounded-md flex items-center justify-center text-[10px] ${
                          checked ? 'bg-[#d7b469] text-[#0c1419] font-black' : 'border border-[#243540]'
                        }`}>
                          {checked && '✓'}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={handleSaveSelectedUser}
                  className="rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 px-5 py-2 text-xs font-bold text-[#0c1419] shadow-md"
                >
                  Yetkileri Kaydet
                </button>
              </div>
            </div>
          )}

          {/* KULLANICI TABLOSU */}
          <div className="rounded-2xl border border-[#243540] bg-[#0c1419] overflow-hidden shadow-xl">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#101b22] text-slate-400 font-semibold uppercase tracking-wider border-b border-[#243540] text-[10px]">
                <tr>
                  <th className="py-3 px-4">Kullanıcı</th>
                  <th className="py-3 px-4">Rol / Yetki</th>
                  <th className="py-3 px-4">Erişilebilir Departmanlar</th>
                  <th className="py-3 px-4">2FA</th>
                  <th className="py-3 px-4">Durum</th>
                  <th className="py-3 px-4">Son Giriş</th>
                  <th className="py-3 px-4 text-right">Eylemler</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#243540]/60 text-slate-300 font-medium">
                {filteredUsers.map((usr) => (
                  <tr key={usr.id} className="hover:bg-[#142028]/60 transition-colors">
                    {/* Kullanıcı */}
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-xl bg-gradient-to-br ${usr.avatarColor} flex items-center justify-center font-bold text-xs text-[#0c1419] shadow-sm`}>
                          {usr.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-white text-xs">{usr.name}</p>
                          <p className="text-[11px] font-mono text-slate-400">{usr.email}</p>
                        </div>
                      </div>
                    </td>

                    {/* Rol */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-[10px] font-bold ${
                        usr.role === 'Site Administrator'
                          ? 'bg-[#d7b469]/20 text-[#d7b469] border border-[#d7b469]/30'
                          : 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {usr.role}
                      </span>
                    </td>

                    {/* Departmanlar */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1 max-w-xs">
                        {usr.allowedDepartments?.includes('all') ? (
                          <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] text-emerald-400 border border-emerald-500/20 font-mono">
                            Tüm Departmanlar
                          </span>
                        ) : (
                          usr.allowedDepartments?.map(d => (
                            <span key={d} className="rounded bg-[#142028] px-1.5 py-0.5 text-[10px] text-slate-300 border border-[#243540] capitalize">
                              {d}
                            </span>
                          ))
                        )}
                      </div>
                    </td>

                    {/* 2FA */}
                    <td className="py-3.5 px-4 font-mono">
                      {usr.twoFactor ? (
                        <span className="text-emerald-400 text-[11px] font-bold">Aktif</span>
                      ) : (
                        <span className="text-slate-500 text-[11px]">Pasif</span>
                      )}
                    </td>

                    {/* Durum */}
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                        usr.status === 'Aktif'
                          ? 'bg-emerald-500/10 text-emerald-400'
                          : 'bg-amber-500/10 text-amber-400'
                      }`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${usr.status === 'Aktif' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
                        {usr.status}
                      </span>
                    </td>

                    {/* Son Giriş */}
                    <td className="py-3.5 px-4 text-[11px] font-mono text-slate-400">
                      {usr.lastLogin}
                    </td>

                    {/* Eylemler */}
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setSelectedUser(usr)}
                          title="Yetkileri Düzenle"
                          className="rounded-lg p-1.5 text-slate-400 hover:text-[#d7b469] hover:bg-[#142028] transition-colors"
                        >
                          <Edit3 className="h-3.5 w-3.5" />
                        </button>
                        {usr.email !== 'destek@centeks.com' && (
                          <button
                            onClick={() => handleDeleteUser(usr.id)}
                            title="Kullanıcıyı Sil"
                            className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Alt Kısım */}
        <div className="flex items-center justify-between px-6 py-3.5 border-t border-[#243540] bg-[#101b22]">
          <span className="text-[11px] text-slate-500 font-mono">
            Toplam {users.length} Kayıtlı Kullanıcı • CENTEKS Group Bilgi İşlem
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

