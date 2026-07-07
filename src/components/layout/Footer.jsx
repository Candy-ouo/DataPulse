export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-4 h-[28px] shrink-0" style={{
      borderTop: '1px solid rgba(0,212,255,0.06)',
    }}>
      <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.2)' }}>DataPulse · 数据脉动 v1.0.0</span>
      <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.15)' }}>数据驱动决策</span>
    </footer>
  );
}
