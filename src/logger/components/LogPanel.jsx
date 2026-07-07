import { useState, useEffect } from "react";
import { LogCollector } from "../LogCollector";

export default function LogPanel() {
  const [logs, setLogs] = useState([]);
  const [filter, setFilter] = useState("");
  useEffect(() => {
    const t = setInterval(() => setLogs(LogCollector.getAll()), 1000);
    return () => clearInterval(t);
  }, []);
  const filtered = filter ? logs.filter(l => l.message.includes(filter) || l.module.includes(filter)) : logs;
  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 max-h-60 bg-black/85 border border-green-500/20 rounded-lg p-2.5 overflow-auto font-mono text-[11px]">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-green-400 font-bold text-xs">LOG PANEL</span>
        <input className="bg-black/60 text-green-300 border border-green-500/30 rounded px-2 py-0.5 w-28 text-[11px] outline-none"
          placeholder="filter..." value={filter} onChange={e => setFilter(e.target.value)} />
      </div>
      {filtered.slice(-50).reverse().map((e, i) =>
        <div key={i} className={`truncate leading-5 ${e.level === "ERROR" ? "text-red-400" : e.level === "WARN" ? "text-yellow-400" : "text-green-300/70"}`}>
          {e.timestamp.slice(11,19)} [{e.level}] {e.message}
        </div>
      )}
    </div>
  );
}
