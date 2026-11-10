import React, { useState, useMemo } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import DeviceGrid from './components/DeviceGrid';
import RemoteSessionModal from './components/RemoteSessionModal';
import TerminalModal from './components/TerminalModal';
import FileManagerModal from './components/FileManagerModal';
import AgentDownloadModal from './components/AgentDownloadModal';
import AccountSettingsModal from './components/AccountSettingsModal';
import UserManagementModal from './components/UserManagementModal';
import AuditLogModal from './components/AuditLogModal';
import DeviceDetailsModal from './components/DeviceDetailsModal';
import { INITIAL_DEVICES, DEPARTMENTS } from './data/mockDevices';
import { CenteksRmmService } from './services/api';

export default function App() {
  const [devices, setDevices] = useState(INITIAL_DEVICES);
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modallar
  const [activeSession, setActiveSession] = useState(null);
  const [activeTerminal, setActiveTerminal] = useState(null);
  const [activeFiles, setActiveFiles] = useState(null);
  const [deviceDetailsTarget, setDeviceDetailsTarget] = useState(null);
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [accountSettingsOpen, setAccountSettingsOpen] = useState(false);
  const [userManagementOpen, setUserManagementOpen] = useState(false);
  const [auditLogsOpen, setAuditLogsOpen] = useState(false);

  // Filtrelenmiş Cihaz Listesi
  const filteredDevices = useMemo(() => {
    return devices.filter(device => {
      // Departman filtresi
      if (selectedDepartment !== 'all' && device.department !== selectedDepartment) {
        return false;
      }
      // Durum filtresi (online/offline)
      if (statusFilter !== 'all' && device.status !== statusFilter) {
        return false;
      }
      // Arama filtresi (Ad, IP, Kullanıcı, RustDesk ID)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = device.name.toLowerCase().includes(query);
        const matchesIp = device.ip.toLowerCase().includes(query);
        const matchesUser = device.user.toLowerCase().includes(query);
        const matchesId = device.rustdeskId.replace(/\s+/g, '').includes(query.replace(/\s+/g, ''));
        return matchesName || matchesIp || matchesUser || matchesId;
      }
      return true;
    });
  }, [devices, selectedDepartment, statusFilter, searchQuery]);

  // Sayıcılar
  const onlineCount = useMemo(() => devices.filter(d => d.status === 'online').length, [devices]);
  const totalCount = devices.length;

  // Seçili Departman Adı
  const selectedDepartmentName = useMemo(() => {
    const found = DEPARTMENTS.find(d => d.id === selectedDepartment);
    return found ? `${found.name} Grubu Cihazları` : 'Tüm Sistemler ve Cihazlar';
  }, [selectedDepartment]);

  // Eylemler
  const handleConnect = async (device) => {
    try {
      const sessionData = await CenteksRmmService.handleConnect(device);
      setActiveSession(sessionData);
    } catch (err) {
      alert(`Bağlantı kurulamadı: ${err.message}`);
    }
  };

  const handleTerminal = async (device) => {
    try {
      await CenteksRmmService.handleTerminal(device);
      setActiveTerminal(device);
    } catch (err) {
      alert(`Terminal başlatılamadı: ${err.message}`);
    }
  };

  const handleFiles = async (device) => {
    try {
      await CenteksRmmService.handleFileManager(device);
      setActiveFiles(device);
    } catch (err) {
      alert(`Dosya yöneticisi açılamadı: ${err.message}`);
    }
  };

  const handleQuickConnect = (quickId) => {
    const found = devices.find(d => d.rustdeskId.replace(/\s+/g, '') === quickId.replace(/\s+/g, ''));
    if (found) {
      handleConnect(found);
    } else {
      const tempDevice = {
        id: `custom-${Date.now()}`,
        name: `Uzak Terminal (${quickId})`,
        ip: '192.168.16.x (Relay)',
        department: 'Dış Cihaz',
        user: 'Remote Client',
        os: 'windows',
        osVersion: 'Windows 11 Enterprise',
        uptime: 'Bağlantı Kuruldu',
        status: 'online',
        cpu: 15,
        ram: 45,
        rustdeskId: quickId
      };
      handleConnect(tempDevice);
    }
  };

  const handleRefresh = () => {
    setDevices(prev => prev.map(d => {
      if (d.status === 'online') {
        return {
          ...d,
          cpu: Math.min(100, Math.max(5, Math.floor(d.cpu + (Math.random() * 12 - 6)))),
          ram: Math.min(100, Math.max(10, Math.floor(d.ram + (Math.random() * 6 - 3))))
        };
      }
      return d;
    }));
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-[#080d11] text-slate-100 overflow-hidden font-sans selection:bg-[#d7b469] selection:text-[#0c1419]">
      {/* Üst Başlık */}
      <Header
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onDownloadClick={() => setDownloadModalOpen(true)}
        onlineCount={onlineCount}
        totalCount={totalCount}
        onRefresh={handleRefresh}
        onOpenAccountSettings={() => setAccountSettingsOpen(true)}
        onOpenUserManagement={() => setUserManagementOpen(true)}
        onOpenAuditLogs={() => setAuditLogsOpen(true)}
      />

      {/* Ana Gövde (Sidebar + Cihaz Grid) */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selectedDepartment={selectedDepartment}
          setSelectedDepartment={setSelectedDepartment}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
          devices={devices}
          onQuickConnect={handleQuickConnect}
        />

        <main className="flex-1 flex flex-col overflow-hidden bg-gradient-to-br from-[#0c1419] to-[#080d11]">
          <DeviceGrid
            devices={filteredDevices}
            onConnect={handleConnect}
            onTerminal={handleTerminal}
            onFiles={handleFiles}
            onDetails={(device) => setDeviceDetailsTarget(device)}
            selectedDepartmentName={selectedDepartmentName}
          />
        </main>
      </div>

      {/* MODALLAR */}
      {activeSession && (
        <RemoteSessionModal
          session={activeSession}
          onClose={() => setActiveSession(null)}
        />
      )}

      {activeTerminal && (
        <TerminalModal
          device={activeTerminal}
          onClose={() => setActiveTerminal(null)}
        />
      )}

      {activeFiles && (
        <FileManagerModal
          device={activeFiles}
          onClose={() => setActiveFiles(null)}
        />
      )}

      {deviceDetailsTarget && (
        <DeviceDetailsModal
          device={deviceDetailsTarget}
          onClose={() => setDeviceDetailsTarget(null)}
          onConnect={handleConnect}
          onTerminal={handleTerminal}
        />
      )}

      {downloadModalOpen && (
        <AgentDownloadModal
          onClose={() => setDownloadModalOpen(false)}
        />
      )}

      {accountSettingsOpen && (
        <AccountSettingsModal
          onClose={() => setAccountSettingsOpen(false)}
        />
      )}

      {userManagementOpen && (
        <UserManagementModal
          onClose={() => setUserManagementOpen(false)}
        />
      )}

      {auditLogsOpen && (
        <AuditLogModal
          onClose={() => setAuditLogsOpen(false)}
        />
      )}
    </div>
  );
}
