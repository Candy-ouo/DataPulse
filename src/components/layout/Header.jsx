import { useState, useEffect } from "react";
export default function Header({ title }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => { const t = setInterval(() => setTime(new Date()), 1000); return () => clearInterval(t); }, []);
  return (
    <header className="flex items-center justify-between h-14 px-3 border-b border-[rgba(0,255,170,0.12)] shrink-0">
      <h1 className="text-xl font-extrabold tracking-widest bg-gradient-to-r from-[#00ffaa] via-[#00cc88] to-[#00ffcc] bg-clip-text text-transparent">{title}</h1>
      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2"><span className="inline-block w-2 h-2 rounded-full bg-[#00ffaa] animate-pulse"/><span className="text-white/40 text-xs">系统运行中</span></div>
        <time className="text-white/60 font-mono tabular-nums tracking-wide">{time.toLocaleDateString("zh-CN")} {time.toLocaleTimeString("zh-CN")}</time>
      </div>
    </header>
  );
}
