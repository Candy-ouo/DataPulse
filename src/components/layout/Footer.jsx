export default function Footer() {
  return (
    <footer className="flex items-center justify-between px-3 py-2 border-t border-[rgba(0,255,170,0.12)] text-xs text-white/30 shrink-0">
      <span>DataPulse · 数据脉动 v1.0.0</span>
      <span>© {new Date().getFullYear()} DataPulse Team. MIT License.</span>
    </footer>
  );
}
