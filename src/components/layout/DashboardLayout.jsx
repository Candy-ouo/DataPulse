export default function DashboardLayout({ header, children, footer }) {
  return (
    <div className="h-screen flex flex-col bg-[#0a0e1a] overflow-hidden relative">
      <div className="fixed inset-0 pointer-events-none" style={{
        backgroundImage: "linear-gradient(rgba(0,255,170,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.03) 1px, transparent 1px)",
        backgroundSize: "40px 40px", zIndex: 0
      }} />
      <div className="relative z-10 flex flex-col h-full">
        {header}
        <main className="flex-1 min-h-0 p-4 overflow-auto">{children}</main>
        {footer}
      </div>
    </div>
  );
}
