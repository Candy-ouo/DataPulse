export default function DashboardLayout({ header, children, footer }) {
  return (
    <div className="h-screen flex flex-col overflow-hidden relative" style={{ background: '#040816' }}>
      {/* 网格背景 */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,212,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.025) 1px, transparent 1px)",
          backgroundSize: '48px 48px',
          zIndex: 0,
        }}
      />
      {/* 顶部光晕 */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, rgba(0,212,255,0.06) 0%, transparent 70%)',
        zIndex: 0,
      }} />
      <div className="relative z-10 flex flex-col h-full">
        {header}
        <main className="flex-1 min-h-0 p-[10px]">{children}</main>
        {footer}
      </div>
    </div>
  );
}
