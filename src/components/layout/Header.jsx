import { useState, useEffect } from 'react';

export default function Header({ title }) {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const weekDays = ['日', '一', '二', '三', '四', '五', '六'];
  const h = time.getHours();
  const period = h < 6 ? '凌晨' : h < 12 ? '上午' : h < 14 ? '下午' : h < 18 ? '午后' : '晚间';

  return (
    <header className="flex items-center justify-between h-[52px] px-4 shrink-0" style={{
      borderBottom: '1px solid rgba(0,212,255,0.08)',
      background: 'linear-gradient(180deg, rgba(0,212,255,0.04) 0%, transparent 100%)',
    }}>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[22px] leading-none animate-breathe" style={{ color: '#00d4ff' }}>◆</span>
          <h1 className="text-lg font-extrabold tracking-[3px]" style={{
            background: 'linear-gradient(135deg, #00d4ff 0%, #48b0f7 50%, #90e0ef 100%)',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent',
          }}>{title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-5">
        {/* LIVE indicator */}
        <div className="flex items-center gap-2">
          <span className="inline-block w-[6px] h-[6px] rounded-full animate-ping" style={{ background: '#00d4ff', boxShadow: '0 0 6px rgba(0,212,255,0.6)' }} />
          <span className="text-xs tracking-wider" style={{ color: 'rgba(0,212,255,0.5)' }}>LIVE</span>
        </div>
        {/* Timeline */}
        <div className="flex items-center gap-3 text-xs font-mono" style={{ color: 'rgba(255,255,255,0.4)' }}>
          <span style={{ color: 'rgba(0,212,255,0.6)' }}>{period}</span>
          <span className="tabular-nums tracking-wider text-[13px]" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {pad(h)}:{pad(time.getMinutes())}:{pad(time.getSeconds())}
          </span>
          <span style={{ color: 'rgba(255,255,255,0.25)' }}>
            {time.getFullYear()}/{pad(time.getMonth() + 1)}/{pad(time.getDate())}
          </span>
          <span style={{ color: 'rgba(0,212,255,0.3)' }}>周{weekDays[time.getDay()]}</span>
        </div>
      </div>
    </header>
  );
}
