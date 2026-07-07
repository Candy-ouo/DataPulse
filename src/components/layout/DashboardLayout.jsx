import ParticleBackground from '@/components/common/ParticleBackground';

export default function DashboardLayout({ header, children, footer }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden relative" style={{ background: '#040816' }}>
      {/* 粒子背景 */}
      <ParticleBackground />

      {/* 网格背景 */}
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)",
        backgroundSize: '48px 48px',
        zIndex: 1,
      }} />

      {/* 顶部光晕 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[700px] h-[250px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.07) 0%, transparent 70%)',
        zIndex: 1,
      }} />

      {/* 流光线条 — 顶部 */}
      <div className="fixed top-0 left-0 w-full h-[1px] pointer-events-none" style={{ zIndex: 2, background: 'linear-gradient(90deg, transparent, #00d4ff, transparent)', animation: 'flowLine 3s ease-in-out infinite' }} />

      {/* 流光线条 — 底部 */}
      <div className="fixed bottom-0 left-0 w-full h-[1px] pointer-events-none" style={{ zIndex: 2, background: 'linear-gradient(90deg, transparent, rgba(0,212,255,0.5), transparent)', animation: 'flowLine 4s ease-in-out infinite 1.5s' }} />

      <div className="relative z-10 flex flex-col h-full">
        {header}
        <main className="flex-1 min-h-0 p-[10px]">{children}</main>
        {footer}
      </div>
    </div>
  );
}
