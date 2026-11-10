export const DEPARTMENTS = [
  { id: 'all', name: 'Tümü' },
  { id: 'fabrika', name: 'Fabrika' },
  { id: 'ofis', name: 'Ofis / Muhasebe' },
  { id: 'sunucular', name: 'Sunucular' },
  { id: 'it', name: 'Bilgi İşlem' },
];

export const INITIAL_DEVICES = [
  {
    id: 'cnt-srv-01',
    name: 'SRV-CENTEKS-MAIN',
    department: 'sunucular',
    ip: '192.168.16.10',
    gateway: '192.168.16.1',
    mac: '00:1A:2B:99:3F:11',
    dns: '192.168.16.10, 1.1.1.1',
    os: 'windows',
    osVersion: 'Windows Server 2022 Datacenter x64',
    user: 'Administrator',
    status: 'online',
    cpu: 28,
    cpuModel: 'Intel(R) Xeon(R) Gold 6348 CPU @ 2.60GHz (28 Çekirdek, 56 İzlek)',
    ram: 64,
    ramTotal: '64 GB DDR4 ECC Reg 3200MHz',
    ramUsed: '40.9 GB',
    ramFree: '23.1 GB',
    disks: [
      { drive: 'C:', label: 'Sistem SSD', total: '480 GB', used: '198 GB', free: '282 GB', percent: 41 },
      { drive: 'D:', label: 'Centeks SQL Data', total: '2.0 TB', used: '1.24 TB', free: '760 GB', percent: 62 },
      { drive: 'E:', label: 'Yedek Deposu', total: '4.0 TB', used: '2.8 TB', free: '1.2 TB', percent: 70 }
    ],
    services: [
      { name: 'CenteksDestekService', displayName: 'CENTEKS Destek Uzak Erişim Servisi', status: 'Running', startup: 'Otomatik' },
      { name: 'MSSQLSERVER', displayName: 'SQL Server (CENTEKS_DB)', status: 'Running', startup: 'Otomatik' },
      { name: 'CenteksERPService', displayName: 'CENTEKS ERP Uygulama Motoru', status: 'Running', startup: 'Otomatik' },
      { name: 'W32Time', displayName: 'Windows Zaman Servisi (NTP)', status: 'Running', startup: 'Otomatik' },
      { name: 'Spooler', displayName: 'Yazdırma Biriktiricisi', status: 'Running', startup: 'Otomatik' }
    ],
    processes: [
      { pid: 1420, name: 'sqlservr.exe', cpu: 14.2, memory: '12,450 MB', user: 'SYSTEM' },
      { pid: 2108, name: 'CenteksERP.exe', cpu: 6.8, memory: '3,840 MB', user: 'Administrator' },
      { pid: 884, name: 'CenteksDestek.exe', cpu: 1.2, memory: '185 MB', user: 'SYSTEM' },
      { pid: 3412, name: 'explorer.exe', cpu: 0.5, memory: '240 MB', user: 'Administrator' },
      { pid: 512, name: 'lsass.exe', cpu: 0.3, memory: '95 MB', user: 'SYSTEM' }
    ],
    disk: '41%',
    rustdeskId: '984 102 331',
    lastSeen: 'Şimdi aktif',
    uptime: '42 gün, 14 saat'
  },
  {
    id: 'cnt-srv-02',
    name: 'SRV-PANEL-RUSTDESK',
    department: 'sunucular',
    ip: '192.168.16.19',
    gateway: '192.168.16.1',
    mac: '00:1A:2B:99:3F:19',
    dns: '192.168.16.10, 8.8.8.8',
    os: 'linux',
    osVersion: 'Ubuntu 24.04 LTS (Docker Container)',
    user: 'root',
    status: 'online',
    cpu: 14,
    cpuModel: 'AMD EPYC 7763 64-Core Processor (vCPU x8 allocated)',
    ram: 38,
    ramTotal: '32 GB DDR4 3200MHz',
    ramUsed: '12.1 GB',
    ramFree: '19.9 GB',
    disks: [
      { drive: '/', label: 'Root NVMe', total: '250 GB', used: '72 GB', free: '178 GB', percent: 29 },
      { drive: '/var/lib/docker', label: 'Docker Volümleri', total: '500 GB', used: '185 GB', free: '315 GB', percent: 37 }
    ],
    services: [
      { name: 'hbbr', displayName: 'RustDesk Relay Server (hbbr:21117)', status: 'Running', startup: 'Otomatik' },
      { name: 'hbbs', displayName: 'RustDesk ID/Rendezvous Server (hbbs:21116)', status: 'Running', startup: 'Otomatik' },
      { name: 'nginx-ssl', displayName: 'Nginx TLS (panel.centeks.com)', status: 'Running', startup: 'Otomatik' },
      { name: 'docker', displayName: 'Docker Daemon Service', status: 'Running', startup: 'Otomatik' }
    ],
    processes: [
      { pid: 902, name: 'hbbs', cpu: 4.1, memory: '340 MB', user: 'root' },
      { pid: 904, name: 'hbbr', cpu: 5.2, memory: '520 MB', user: 'root' },
      { pid: 1140, name: 'nginx', cpu: 1.0, memory: '110 MB', user: 'www-data' },
      { pid: 140, name: 'dockerd', cpu: 2.1, memory: '410 MB', user: 'root' }
    ],
    disk: '29%',
    rustdeskId: '100 245 889',
    lastSeen: 'Şimdi aktif',
    uptime: '18 gün, 6 saat'
  },
  {
    id: 'cnt-fab-01',
    name: 'FAB-DOKUMA-PC01',
    department: 'fabrika',
    ip: '192.168.20.44',
    gateway: '192.168.20.1',
    mac: '74:D0:2B:11:88:AC',
    dns: '192.168.16.10, 1.1.1.1',
    os: 'windows',
    osVersion: 'Windows 11 Pro 64-bit (23H2)',
    user: 'dokuma_operator1',
    status: 'online',
    cpu: 18,
    cpuModel: '13th Gen Intel(R) Core(TM) i5-13400 (10 Çekirdek, 16 İzlek)',
    ram: 42,
    ramTotal: '16 GB DDR4 3200MHz',
    ramUsed: '6.7 GB',
    ramFree: '9.3 GB',
    disks: [
      { drive: 'C:', label: 'Windows NVMe', total: '512 GB', used: '280 GB', free: '232 GB', percent: 55 }
    ],
    services: [
      { name: 'CenteksDestekService', displayName: 'CENTEKS Destek Servisi', status: 'Running', startup: 'Otomatik' },
      { name: 'CenteksDokumaMon', displayName: 'Dokuma Tezgah Telemetrisi', status: 'Running', startup: 'Otomatik' },
      { name: 'Spooler', displayName: 'Barkod Yazıcı Servisi', status: 'Running', startup: 'Otomatik' }
    ],
    processes: [
      { pid: 2450, name: 'DokumaClient.exe', cpu: 7.5, memory: '850 MB', user: 'dokuma_operator1' },
      { pid: 1120, name: 'CenteksDestek.exe', cpu: 1.1, memory: '165 MB', user: 'SYSTEM' },
      { pid: 3200, name: 'explorer.exe', cpu: 0.8, memory: '210 MB', user: 'dokuma_operator1' }
    ],
    disk: '55%',
    rustdeskId: '445 119 092',
    lastSeen: 'Şimdi aktif',
    uptime: '3 gün, 8 saat'
  },
  {
    id: 'cnt-fab-02',
    name: 'FAB-BOYAHANE-TERMINAL',
    department: 'fabrika',
    ip: '192.168.20.52',
    gateway: '192.168.20.1',
    mac: '74:D0:2B:44:99:EE',
    dns: '192.168.16.10',
    os: 'windows',
    osVersion: 'Windows 10 Enterprise LTSC (IoT)',
    user: 'boyahane_vardiya',
    status: 'offline',
    cpu: 0,
    cpuModel: 'Intel(R) Core(TM) i3-10100 @ 3.60GHz',
    ram: 0,
    ramTotal: '8 GB DDR4',
    ramUsed: '-',
    ramFree: '-',
    disks: [
      { drive: 'C:', label: 'Sistem SSD', total: '256 GB', used: '174 GB', free: '82 GB', percent: 68 }
    ],
    services: [
      { name: 'CenteksDestekService', displayName: 'CENTEKS Destek Servisi', status: 'Stopped', startup: 'Otomatik' }
    ],
    processes: [],
    disk: '68%',
    rustdeskId: '445 119 110',
    lastSeen: '2 saat önce',
    uptime: '-'
  },
  {
    id: 'cnt-ofs-01',
    name: 'MUH-FATURA-PC',
    department: 'ofis',
    ip: '192.168.10.105',
    gateway: '192.168.10.1',
    mac: '50:EB:71:34:55:7B',
    dns: '192.168.16.10, 1.1.1.1',
    os: 'windows',
    osVersion: 'Windows 11 Pro 64-bit (24H2)',
    user: 'ayse.yilmaz',
    status: 'online',
    cpu: 45,
    cpuModel: '13th Gen Intel(R) Core(TM) i7-13700 (16 Çekirdek, 24 İzlek)',
    ram: 72,
    ramTotal: '32 GB DDR5 5200MHz',
    ramUsed: '23.0 GB',
    ramFree: '9.0 GB',
    disks: [
      { drive: 'C:', label: 'Windows SSD', total: '512 GB', used: '399 GB', free: '113 GB', percent: 78 },
      { drive: 'D:', label: 'Muhasebe Arşiv', total: '1.0 TB', used: '420 GB', free: '580 GB', percent: 42 }
    ],
    services: [
      { name: 'CenteksDestekService', displayName: 'CENTEKS Destek Servisi', status: 'Running', startup: 'Otomatik' },
      { name: 'LogoEFaturaSync', displayName: 'E-Fatura Entegratör Servisi', status: 'Running', startup: 'Otomatik' },
      { name: 'Spooler', displayName: 'Yazdırma Biriktiricisi', status: 'Running', startup: 'Otomatik' }
    ],
    processes: [
      { pid: 4890, name: 'CenteksERP.exe', cpu: 18.5, memory: '2,950 MB', user: 'ayse.yilmaz' },
      { pid: 5120, name: 'EXCEL.EXE', cpu: 12.0, memory: '1,420 MB', user: 'ayse.yilmaz' },
      { pid: 1400, name: 'chrome.exe', cpu: 8.5, memory: '2,100 MB', user: 'ayse.yilmaz' },
      { pid: 994, name: 'CenteksDestek.exe', cpu: 1.0, memory: '170 MB', user: 'SYSTEM' }
    ],
    disk: '78%',
    rustdeskId: '612 884 901',
    lastSeen: 'Şimdi aktif',
    uptime: '1 gün, 4 saat'
  },
  {
    id: 'cnt-ofs-02',
    name: 'IK-YONETIM-LAPTOP',
    department: 'ofis',
    ip: '192.168.10.118',
    gateway: '192.168.10.1',
    mac: '28:D0:EA:62:77:4A',
    dns: '192.168.16.10, 1.1.1.1',
    os: 'windows',
    osVersion: 'Windows 11 Pro (Lenovo ThinkPad)',
    user: 'mehmet.oz',
    status: 'online',
    cpu: 22,
    cpuModel: '12th Gen Intel(R) Core(TM) i7-1260P (12 Çekirdek)',
    ram: 54,
    ramTotal: '16 GB LPDDR5',
    ramUsed: '8.6 GB',
    ramFree: '7.4 GB',
    disks: [
      { drive: 'C:', label: 'NVMe SSD', total: '512 GB', used: '251 GB', free: '261 GB', percent: 49 }
    ],
    services: [
      { name: 'CenteksDestekService', displayName: 'CENTEKS Destek Servisi', status: 'Running', startup: 'Otomatik' },
      { name: 'ZKTecoIKBordro', displayName: 'PDKS / Turnike Entegrasyon', status: 'Running', startup: 'Otomatik' }
    ],
    processes: [
      { pid: 3200, name: 'PDKSServer.exe', cpu: 5.2, memory: '680 MB', user: 'mehmet.oz' },
      { pid: 1102, name: 'CenteksDestek.exe', cpu: 0.9, memory: '160 MB', user: 'SYSTEM' }
    ],
    disk: '49%',
    rustdeskId: '612 884 934',
    lastSeen: 'Şimdi aktif',
    uptime: '5 saat'
  },
  {
    id: 'cnt-it-01',
    name: 'IT-DEV-STATION',
    department: 'it',
    ip: '192.168.10.200',
    gateway: '192.168.10.1',
    mac: '3C:7C:3F:88:22:90',
    dns: '192.168.16.10, 1.1.1.1',
    os: 'linux',
    osVersion: 'Arch Linux x86_64 (Kernel 6.10.9-arch)',
    user: 'ilhan.kebabci',
    status: 'online',
    cpu: 32,
    cpuModel: 'AMD Ryzen 9 7950X 16-Core Processor @ 4.50GHz',
    ram: 58,
    ramTotal: '64 GB DDR5 6000MHz EXPO',
    ramUsed: '37.1 GB',
    ramFree: '26.9 GB',
    disks: [
      { drive: '/', label: 'Samsung 990 Pro 2TB', total: '2.0 TB', used: '700 GB', free: '1.3 TB', percent: 35 }
    ],
    services: [
      { name: 'rustdesk', displayName: 'CENTEKS Destek Rust Client Service', status: 'Running', startup: 'Otomatik' },
      { name: 'docker', displayName: 'Docker Engine Daemon', status: 'Running', startup: 'Otomatik' },
      { name: 'sshd', displayName: 'OpenSSH Daemon', status: 'Running', startup: 'Otomatik' }
    ],
    processes: [
      { pid: 1840, name: 'cargo', cpu: 15.4, memory: '4,200 MB', user: 'ilhan' },
      { pid: 2190, name: 'code', cpu: 6.2, memory: '3,100 MB', user: 'ilhan' },
      { pid: 910, name: 'rustdesk', cpu: 1.1, memory: '210 MB', user: 'root' }
    ],
    disk: '35%',
    rustdeskId: '809 112 556',
    lastSeen: 'Şimdi aktif',
    uptime: '12 gün, 22 saat'
  },
  {
    id: 'cnt-it-02',
    name: 'IT-NETWORK-MONITOR',
    department: 'it',
    ip: '192.168.10.201',
    gateway: '192.168.10.1',
    mac: '3C:7C:3F:88:22:91',
    dns: '192.168.16.10, 1.1.1.1',
    os: 'linux',
    osVersion: 'Debian 12 Bookworm (Zabbix & Grafana)',
    user: 'sysadmin',
    status: 'online',
    cpu: 8,
    cpuModel: 'Intel(R) Core(TM) i5-11400 @ 2.60GHz',
    ram: 24,
    ramTotal: '16 GB DDR4',
    ramUsed: '3.8 GB',
    ramFree: '12.2 GB',
    disks: [
      { drive: '/', label: 'Zabbix DB SSD', total: '512 GB', used: '92 GB', free: '420 GB', percent: 18 }
    ],
    services: [
      { name: 'zabbix-server', displayName: 'Zabbix Network Monitoring Server', status: 'Running', startup: 'Otomatik' },
      { name: 'grafana-server', displayName: 'Grafana Telemetri Dashboard', status: 'Running', startup: 'Otomatik' },
      { name: 'rustdesk', displayName: 'Centeks Destek İstemcisi', status: 'Running', startup: 'Otomatik' }
    ],
    processes: [
      { pid: 740, name: 'zabbix_server', cpu: 3.2, memory: '980 MB', user: 'zabbix' },
      { pid: 980, name: 'grafana', cpu: 1.5, memory: '420 MB', user: 'grafana' }
    ],
    disk: '18%',
    rustdeskId: '809 112 590',
    lastSeen: 'Şimdi aktif',
    uptime: '89 gün'
  }
];

export const INITIAL_USERS = [
  {
    id: 'usr-1',
    name: 'İlhan Kebabçı',
    email: 'destek@centeks.com',
    role: 'Site Administrator',
    badge: 'Full Admin',
    allowedDepartments: ['all'],
    twoFactor: true,
    status: 'Aktif',
    lastLogin: 'Şimdi aktif (192.168.16.101)',
    avatarColor: 'from-[#d7b469] to-[#b99547]'
  },
  {
    id: 'usr-2',
    name: 'Ahmet Demir',
    email: 'ahmet.demir@centeks.com',
    role: 'Departman Yetkilisi',
    badge: 'Fabrika Müdürü',
    allowedDepartments: ['fabrika'],
    twoFactor: true,
    status: 'Aktif',
    lastLogin: '10 dk önce',
    avatarColor: 'from-blue-600 to-cyan-600'
  },
  {
    id: 'usr-3',
    name: 'Zeynep Kaya',
    email: 'zeynep.kaya@centeks.com',
    role: 'Departman Yetkilisi',
    badge: 'Muhasebe Şefi',
    allowedDepartments: ['ofis'],
    twoFactor: true,
    status: 'Aktif',
    lastLogin: '1 saat önce',
    avatarColor: 'from-emerald-600 to-teal-600'
  },
  {
    id: 'usr-4',
    name: 'Murat Şahin',
    email: 'murat.sahin@centeks.com',
    role: 'Operator (IT)',
    badge: 'Sistem Yöneticisi',
    allowedDepartments: ['it', 'sunucular'],
    twoFactor: false,
    status: 'Aktif',
    lastLogin: 'Dün 17:45',
    avatarColor: 'from-purple-600 to-indigo-600'
  },
  {
    id: 'usr-5',
    name: 'Stajyer Destek',
    email: 'stajyer@centeks.com',
    role: 'Yalnızca Görüntüleme',
    badge: 'Read-Only Destek',
    allowedDepartments: ['ofis'],
    twoFactor: false,
    status: 'Aktif',
    lastLogin: '3 gün önce',
    avatarColor: 'from-slate-600 to-slate-700'
  }
];

export const INITIAL_AUDIT_LOGS = [
  {
    id: 'log-101',
    user: 'İlhan Kebabçı (Admin)',
    targetDevice: 'FAB-DOKUMA-PC01',
    targetId: '445 119 092',
    action: 'Uzak Masaüstü Bağlantısı',
    actionType: 'desktop',
    department: 'Fabrika',
    startTime: '2026-11-10 16:15:22',
    endTime: '16:35:10',
    duration: '19 dk 48 sn',
    clientIp: '192.168.16.101',
    status: 'Başarılı'
  },
  {
    id: 'log-102',
    user: 'İlhan Kebabçı (Admin)',
    targetDevice: 'SRV-CENTEKS-MAIN',
    targetId: '984 102 331',
    action: 'Sessiz PowerShell Terminali',
    actionType: 'terminal',
    department: 'Sunucular',
    startTime: '2026-11-10 15:40:05',
    endTime: '15:48:30',
    duration: '8 dk 25 sn',
    clientIp: '192.168.16.101',
    status: 'Başarılı'
  },
  {
    id: 'log-103',
    user: 'Zeynep Kaya',
    targetDevice: 'MUH-FATURA-PC',
    targetId: '612 884 901',
    action: 'Dosya Transferi (ERP Yedek)',
    actionType: 'files',
    department: 'Ofis / Muhasebe',
    startTime: '2026-11-10 14:12:00',
    endTime: '14:16:45',
    duration: '4 dk 45 sn',
    clientIp: '192.168.10.105',
    status: 'Başarılı'
  },
  {
    id: 'log-104',
    user: 'Ahmet Demir',
    targetDevice: 'FAB-BOYAHANE-TERMINAL',
    targetId: '445 119 110',
    action: 'Servis Yeniden Başlatma',
    actionType: 'service',
    department: 'Fabrika',
    startTime: '2026-11-10 13:05:18',
    endTime: '13:06:02',
    duration: '44 sn',
    clientIp: '192.168.20.15',
    status: 'Başarılı'
  },
  {
    id: 'log-105',
    user: 'Murat Şahin',
    targetDevice: 'SRV-PANEL-RUSTDESK',
    targetId: '100 245 889',
    action: 'SSH / Konsol Erişimi',
    actionType: 'terminal',
    department: 'Sunucular',
    startTime: '2026-11-10 11:20:00',
    endTime: '11:45:12',
    duration: '25 dk 12 sn',
    clientIp: '192.168.10.201',
    status: 'Başarılı'
  },
  {
    id: 'log-106',
    user: 'İlhan Kebabçı (Admin)',
    targetDevice: 'IT-DEV-STATION',
    targetId: '809 112 556',
    action: 'Uzak Masaüstü Bağlantısı',
    actionType: 'desktop',
    department: 'Bilgi İşlem',
    startTime: '2026-11-10 09:30:10',
    endTime: '10:15:00',
    duration: '44 dk 50 sn',
    clientIp: '192.168.16.101',
    status: 'Başarılı'
  }
];

export const LOGIN_SESSIONS = [
  {
    id: 'sess-1',
    device: 'Google Chrome (Windows 11)',
    ip: '192.168.16.101',
    location: 'Bursa, Türkiye (Yerel Ağ)',
    current: true,
    lastActive: 'Şimdi aktif'
  },
  {
    id: 'sess-2',
    device: 'CENTEKS Destek Portable x64',
    ip: '192.168.16.19',
    location: 'Bursa / Fabrika IT',
    current: false,
    lastActive: '2 saat önce'
  },
  {
    id: 'sess-3',
    device: 'Safari (Apple iPhone 15 Pro)',
    ip: '88.255.12.84',
    location: 'Bursa, Türkiye (Mobil Veri)',
    current: false,
    lastActive: 'Dün 21:40'
  }
];
