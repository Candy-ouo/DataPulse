import { useState, useEffect } from 'react';
export default function Header({ title }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  return (
    <header className="flex items-center justify-between h-[52px] px-4 shrink-0" style={{
      borderBottom: '1px solid rgba(0,212,255,0.08)',
      background: 'linear-gradient(180deg, rgba(0,212,255,0.04) 0%, transparent 100%)',
    }}>
      {/* 左侧 */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[22px] leading-none" style={{ color: '#00d4ff' }}>◆</span>
          <h1 className="text-lg font-extrabold tracking-[3px]" style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #48b0f7 50%, #90e0ef 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>{title}</h1>
        </div>
      </div>
      {/* 右侧 */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <span className="inline-block w-[6px] h-[6px] rounded-full animate-pulse" style={{ background: '#00d4ff', boxShadow: '0 0 6px rgba(0,212,255,0.6)' }} />
          <span className="text-xs tracking-wider" style={{ color: 'rgba(0,212,255,0.5)' }}>LIVE</span>
        </div>
        <time className="text-xs font-mono tabular-nums tracking-wide" style={{ color: 'rgba(255,255,255,0.45)' }}>
          {time.toLocaleDateString('zh-CN')} {time.toLocaleTimeString('zh-CN')}
        </time>
      </div>
    </header>
  );
}
