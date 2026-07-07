export function formatNumber(n) {
  if (n >= 10000) return (n / 10000).toFixed(1) + 'w';
  if (n >= 1000) return (n / 1000).toFixed(1) + 'k';
  return n.toLocaleString();
}
export function formatCurrency(n) { return '¥' + formatNumber(n); }
export function formatPercent(n) { return n.toFixed(2) + '%'; }
export function formatDate(date, fmt) {
  const d = new Date(date);
  const map = { YYYY: d.getFullYear(), MM: String(d.getMonth()+1).padStart(2,'0'), DD: String(d.getDate()).padStart(2,'0'), HH: String(d.getHours()).padStart(2,'0'), mm: String(d.getMinutes()).padStart(2,'0'), ss: String(d.getSeconds()).padStart(2,'0') };
  return Object.entries(map).reduce((r,[k,v]) => r.replace(k,v), fmt || 'YYYY-MM-DD HH:mm:ss');
}
