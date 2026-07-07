function r(min, max) { return Math.round(Math.random()*(max-min)+min); }
export function generateTrend(n=6,base=1000) { return Array.from({length:n},(_,i)=>({date:`2026-${String(i+1).padStart(2,"0")}`,value:r(base,base+2000)})); }
export function generateDistribution(cats) { const t=100; return cats.map((n,i)=>i===cats.length-1?{name:n,value:t-cats.slice(0,-1).reduce((s,_,j)=>s+r(5,Math.floor(100/cats.length*1.5)),0)}:{name:n,value:r(5,Math.floor(100/cats.length*1.5))}); }
export function generateKpi(b,v=0.2) { const x=Math.round(b*(1+(Math.random()-0.5)*v)); return {value:x,change:((x-b)/b*100).toFixed(1)}; }
export function generateGeoData(provinces) { return provinces.map(n=>({province:n,value:r(500,5000)})); }
export function generateRealtime() { return {currentVisitors:r(100,500),todayOrders:r(500,1500),todayRevenue:r(30000,100000),systemLoad:r(30,90)}; }
