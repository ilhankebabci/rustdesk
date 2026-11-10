import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Terminal as TerminalIcon, 
  CornerDownLeft, 
  Trash2, 
  Maximize2, 
  Minimize2, 
  Copy, 
  Check,
  Play,
  RotateCcw
} from 'lucide-react';

export default function TerminalModal({ device, onClose }) {
  const [shellType, setShellType] = useState('PowerShell'); // 'PowerShell' | 'CMD' | 'Bash'
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: `Windows PowerShell 7.4.2 LTS` },
    { type: 'system', text: `Telif Hakkı (C) Microsoft Corporation. Tüm hakları saklıdır.` },
    { type: 'system', text: `CENTEKS RMM Sessiz Uzak Yönetim Oturumu Bağlandı -> [${device?.name} - ${device?.ip}]` },
    { type: 'system', text: `Yürütme Yetkisi: Administrator (NT AUTHORITY\\SYSTEM)` },
    { type: 'prompt', text: `PS C:\\Windows\\system32> ` },
  ]);
  const [copied, setCopied] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const runQuickCommand = (cmd) => {
    setInputVal(cmd);
    executeCmd(cmd);
  };

  const executeCmd = (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    const promptPrefix = shellType === 'Bash' ? `${device.user}@${device.name}:~$ ` : `PS C:\\Windows\\system32> `;
    const newHistory = [...history, { type: 'user', text: `${promptPrefix}${trimmed}` }];

    const lower = trimmed.toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      setHistory([
        { type: 'system', text: `CENTEKS RMM Uzak Konsol -> [${device.name} - ${device.ip}]` },
        { type: 'prompt', text: promptPrefix }
      ]);
      setInputVal('');
      return;
    } else if (lower.startsWith('ping')) {
      newHistory.push(
        { type: 'output', text: `Pinging ${device.ip} with 32 bytes of data:` },
        { type: 'output', text: `Reply from ${device.ip}: bytes=32 time<1ms TTL=128` },
        { type: 'output', text: `Reply from ${device.ip}: bytes=32 time<1ms TTL=128` },
        { type: 'output', text: `Reply from ${device.ip}: bytes=32 time<1ms TTL=128` },
        { type: 'output', text: `Ping statistics: Packets: Sent = 4, Received = 4, Lost = 0 (0% loss)` }
      );
    } else if (lower === 'dir' || lower === 'ls') {
      newHistory.push(
        { type: 'output', text: `    Directory: C:\\Windows\\system32\n\nMode                 LastWriteTime         Length Name\n----                 -------------         ------ ----\nd-----        10.11.2026     12:30                drivers\nd-----        10.11.2026     14:15                CenteksDesk\n-a----        10.11.2026     10:00        2451200 ntoskrnl.exe\n-a----        10.11.2026     09:44         589412 cmd.exe` }
      );
    } else if (lower.includes('get-service') || lower.includes('service')) {
      newHistory.push(
        { type: 'output', text: `Status   Name               DisplayName\n------   ----               -----------\nRunning  CenteksDestek      CENTEKS Destek Uzak Servis (Port: 21116)\nRunning  LanmanServer       Server\nRunning  Dnscache           DNS Client\nRunning  W32Time            Windows Time\nRunning  MSSQLSERVER        SQL Server (CENTEKS_DB)` }
      );
    } else if (lower.includes('get-process') || lower.includes('top') || lower.includes('ps')) {
      newHistory.push(
        { type: 'output', text: `Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id ProcessName\n-------  ------    -----      -----     ------     -- -----------\n    412      24    32450      54210       2.45   1044 CenteksDestek.exe\n    189      12    14200      22100       0.85   2108 powershell.exe\n    912      48    98400     142000      14.20   4412 explorer.exe\n   1240      88   450200     720000      22.10   1420 sqlservr.exe` }
      );
    } else if (lower.startsWith('ipconfig')) {
      newHistory.push(
        { type: 'output', text: `Windows IP Configuration\n\nEthernet adapter Local Network:\n   IPv4 Address. . . . . . . . . . . : ${device.ip}\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : ${device.gateway || '192.168.16.1'}\n   DNS Servers . . . . . . . . . . . : ${device.dns || '192.168.16.10, 1.1.1.1'}\n   Physical MAC Address. . . . . . . : ${device.mac || '00:1A:2B:99:3F:11'}` }
      );
    } else if (lower.includes('systeminfo')) {
      newHistory.push(
        { type: 'output', text: `Host Name:                 ${device.name}\nOS Name:                   ${device.osVersion}\nSystem Manufacturer:       CENTEKS Enterprise Node\nProcessor:                 ${device.cpuModel || 'Intel(R) Core(TM)'}\nTotal Physical Memory:     ${device.ramTotal || '16 GB'}\nDomain:                    CENTEKS.LOCAL` }
      );
    } else if (lower.includes('restart-service')) {
      newHistory.push(
        { type: 'output', text: `[+] Servis 'CenteksDestekService' başarıyla yeniden başlatıldı.` }
      );
    } else {
      newHistory.push(
        { type: 'output', text: `Komut '${trimmed}' arka planda yürütüldü. Çıkış kodu: 0 (Başarılı)` }
      );
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const handleCommand = (e) => {
    e.preventDefault();
    executeCmd(inputVal);
  };

  const clearScreen = () => {
    const promptPrefix = shellType === 'Bash' ? `${device.user}@${device.name}:~$ ` : `PS C:\\Windows\\system32> `;
    setHistory([
      { type: 'system', text: `CENTEKS RMM Uzak Konsol -> [${device.name}]` },
      { type: 'prompt', text: promptPrefix }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4">
      <div className="relative flex flex-col w-[94vw] max-w-5xl h-[82vh] rounded-2xl border border-[#243540] bg-[#080d11] shadow-2xl overflow-hidden font-mono text-xs">
        
        {/* Konsol Üst Başlığı */}
        <div className="flex h-11 items-center justify-between border-b border-[#243540] bg-[#0c1419] px-4 select-none">
          <div className="flex items-center gap-3 text-slate-300">
            <div className="h-6 w-6 rounded-lg bg-[#142028] p-1 border border-[#d7b469]/30 flex items-center justify-center">
              <TerminalIcon className="h-3.5 w-3.5 text-[#d7b469]" />
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white">{shellType}</span>
              <span className="text-slate-600">•</span>
              <span className="text-slate-300 font-sans">{device.name} ({device.ip})</span>
              <span className="text-[10px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                NT AUTHORITY\SYSTEM
              </span>
            </div>
          </div>

          {/* Shell Tipi Seçici & Temizle & Kapat */}
          <div className="flex items-center gap-2">
            <div className="flex rounded-lg bg-[#142028] p-0.5 border border-[#243540] text-[11px]">
              {['PowerShell', 'CMD', 'Bash'].map(st => (
                <button
                  key={st}
                  onClick={() => setShellType(st)}
                  className={`px-2.5 py-1 rounded transition-colors ${
                    shellType === st ? 'bg-[#d7b469] text-[#0c1419] font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>

            <button
              onClick={clearScreen}
              className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-[#142028] transition-colors"
              title="Konsolu Temizle (cls)"
            >
              <Trash2 className="h-4 w-4" />
            </button>

            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              title="Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Hızlı Komut Butonları Çubuğu */}
        <div className="flex items-center gap-2 px-4 py-2 bg-[#0c1419]/80 border-b border-[#243540] overflow-x-auto text-[11px]">
          <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider shrink-0">Hızlı Komutlar:</span>
          {['ipconfig /all', 'Get-Process', 'Get-Service', 'systeminfo', 'Restart-Service CenteksDestek', 'ping 192.168.16.1'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => runQuickCommand(cmd)}
              className="shrink-0 flex items-center gap-1 rounded-lg bg-[#142028] hover:bg-[#1c2d38] hover:text-[#d7b469] px-2.5 py-1 text-slate-300 border border-[#243540] transition-colors"
            >
              <Play className="h-2.5 w-2.5 text-[#d7b469]" />
              <span>{cmd}</span>
            </button>
          ))}
        </div>

        {/* Konsol Çıktı Alanı */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 selection:bg-[#d7b469] selection:text-[#0c1419]">
          {history.map((item, idx) => (
            <div key={idx} className="leading-relaxed">
              {item.type === 'system' && (
                <div className="text-slate-400 font-sans text-xs">{item.text}</div>
              )}
              {item.type === 'user' && (
                <div className="text-[#d7b469] font-bold">{item.text}</div>
              )}
              {item.type === 'output' && (
                <div className="text-slate-200 whitespace-pre-wrap">{item.text}</div>
              )}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Komut Giriş Alanı */}
        <form onSubmit={handleCommand} className="flex items-center gap-2 border-t border-[#243540] bg-[#0c1419] p-3">
          <span className="text-[#d7b469] font-bold pl-2 select-none">
            {shellType === 'Bash' ? '$' : '>'}
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Komut yazın ve Enter'a basın (örn: ipconfig, Get-Process)..."
            className="flex-1 bg-transparent text-white placeholder-slate-600 focus:outline-none font-mono text-xs"
          />
          <button
            type="submit"
            className="flex items-center gap-1.5 rounded-xl bg-gradient-to-r from-[#d7b469] to-[#c49e52] hover:brightness-110 active:scale-95 px-4 py-1.5 text-xs font-bold text-[#0c1419] shadow-md transition-all"
          >
            <CornerDownLeft className="h-3.5 w-3.5" />
            <span>Çalıştır</span>
          </button>
        </form>
      </div>
    </div>
  );
}
