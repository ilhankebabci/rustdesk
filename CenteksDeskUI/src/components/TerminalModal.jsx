import React, { useState, useRef, useEffect } from 'react';
import { X, Terminal as TerminalIcon, CornerDownLeft, Trash2, Maximize2, Minimize2, Copy, Check } from 'lucide-react';

export default function TerminalModal({ device, onClose }) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: `Windows PowerShell` },
    { type: 'system', text: `Telif Hakkı (C) Microsoft Corporation. Tüm hakları saklıdır.` },
    { type: 'system', text: `CENTEKS RMM Uzak Yönetim Oturumu Bağlandı -> [${device?.name} - ${device?.ip}]` },
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

  const handleCommand = (e) => {
    e.preventDefault();
    const cmd = inputVal.trim();
    if (!cmd) return;

    const newHistory = [...history, { type: 'user', text: `PS C:\\Windows\\system32> ${cmd}` }];

    // Gerçekçi simüle edilmiş PowerShell komut yanıtları
    const lower = cmd.toLowerCase();
    if (lower === 'clear' || lower === 'cls') {
      setHistory([
        { type: 'system', text: `CENTEKS RMM Uzak Konsol -> [${device.name}]` },
        { type: 'prompt', text: `PS C:\\Windows\\system32> ` }
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
        { type: 'output', text: `Status   Name               DisplayName\n------   ----               -----------\nRunning  CenteksDestek      CENTEKS Destek Uzak Servis (Port: 21116)\nRunning  LanmanServer       Server\nRunning  Dnscache           DNS Client\nRunning  W32Time            Windows Time` }
      );
    } else if (lower.includes('get-process') || lower.includes('top') || lower.includes('ps')) {
      newHistory.push(
        { type: 'output', text: `Handles  NPM(K)    PM(K)      WS(K)     CPU(s)     Id ProcessName\n-------  ------    -----      -----     ------     -- -----------\n    412      24    32450      54210       2.45   1044 centeksdesk.exe\n    189      12    14200      22100       0.85   2108 powershell.exe\n    912      48    98400     142000      14.20   4412 explorer.exe` }
      );
    } else if (lower === 'ipconfig') {
      newHistory.push(
        { type: 'output', text: `Windows IP Configuration\n\nEthernet adapter Local Network:\n   IPv4 Address. . . . . . . . . . . : ${device.ip}\n   Subnet Mask . . . . . . . . . . . : 255.255.255.0\n   Default Gateway . . . . . . . . . : 192.168.16.1\n   DNS Servers . . . . . . . . . . . : 192.168.16.1, 1.1.1.1` }
      );
    } else if (lower === 'help') {
      newHistory.push(
        { type: 'output', text: `Kullanılabilir Komutlar: ping, dir, ls, ipconfig, Get-Service, Get-Process, cls, clear` }
      );
    } else {
      newHistory.push(
        { type: 'output', text: `Komut '${cmd}' arka planda yürütüldü. Çıkış kodu: 0 (Başarılı)` }
      );
    }

    setHistory(newHistory);
    setInputVal('');
  };

  const clearScreen = () => {
    setHistory([
      { type: 'system', text: `CENTEKS RMM Uzak Konsol -> [${device.name}]` },
      { type: 'prompt', text: `PS C:\\Windows\\system32> ` }
    ]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="relative flex flex-col w-[92vw] max-w-5xl h-[80vh] rounded-2xl border border-slate-800 bg-[#0d1117] shadow-2xl overflow-hidden font-mono text-xs">
        {/* Konsol Üst Başlığı */}
        <div className="flex h-10 items-center justify-between border-b border-slate-800 bg-slate-900/80 px-4 select-none">
          <div className="flex items-center gap-2 text-slate-300">
            <TerminalIcon className="h-4 w-4 text-emerald-400" />
            <span className="font-semibold text-white">PowerShell 7.4 Console</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-400 font-sans">{device.name} ({device.ip})</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={clearScreen}
              className="rounded p-1 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="Konsolu Temizle"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={onClose}
              className="rounded p-1 text-slate-400 hover:text-rose-400 hover:bg-rose-500/20 transition-colors"
              title="Terminali Kapat"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Konsol Çıktı Alanı */}
        <div 
          onClick={() => inputRef.current?.focus()}
          className="flex-1 overflow-y-auto p-4 space-y-1 text-slate-200 select-text cursor-text"
        >
          {history.map((line, idx) => (
            <div key={idx} className="whitespace-pre-wrap leading-relaxed">
              {line.type === 'system' && (
                <span className="text-slate-500">{line.text}</span>
              )}
              {line.type === 'user' && (
                <span className="text-emerald-400 font-semibold">{line.text}</span>
              )}
              {line.type === 'output' && (
                <span className="text-slate-300">{line.text}</span>
              )}
              {line.type === 'prompt' && (
                <span className="text-blue-400">{line.text}</span>
              )}
            </div>
          ))}

          {/* Aktif Komut Giriş Satırı */}
          <form onSubmit={handleCommand} className="flex items-center gap-1.5 pt-1">
            <span className="text-blue-400 shrink-0">PS C:\Windows\system32&gt;</span>
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              className="flex-1 bg-transparent text-emerald-400 font-semibold outline-none caret-emerald-400 border-none p-0 focus:ring-0"
              autoFocus
            />
          </form>
          <div ref={bottomRef} />
        </div>

        {/* Alt Durum Çubuğu */}
        <div className="flex h-7 items-center justify-between border-t border-slate-800/80 bg-slate-950 px-4 text-[11px] text-slate-500">
          <span>Oturum: WebSocket Secure (WSS) • Şifreli Terminal</span>
          <span>Çıkış için <strong>exit</strong> veya pencereyi kapatın</span>
        </div>
      </div>
    </div>
  );
}

