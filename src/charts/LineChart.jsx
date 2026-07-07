import ChartBase from './core/ChartBase';
export default function LineChart({ data = [], title }) {
  const keys = Object.keys(data[0] || {}).filter((k) => k !== 'date');
  const colors = ['#00d4ff', '#48b0f7', '#90e0ef'];
  const series = keys.map((k, i) => ({
    name: k, type: 'line', data: data.map((d) => d[k]),
    smooth: true, symbol: 'circle', symbolSize: 5,
    lineStyle: { width: 2.5, shadowBlur: 8, shadowColor: 'rgba(0,212,255,0.2)' },
    areaStyle: { opacity: 0.07 },
    itemStyle: { color: colors[i % colors.length] },
  }));
  const options = {
    animationDuration: 1200,
    animationEasing: 'cubicOut',
    title: title ? { text: title, textStyle: { color: 'rgba(255,255,255,0.7)', fontSize: 13, fontWeight: 500 } } : undefined,
    tooltip: { trigger: 'axis' },
    legend: { bottom: 0, textStyle: { color: 'rgba(255,255,255,0.4)', fontSize: 12 }, icon: 'circle', itemWidth: 8, itemHeight: 8 },
    grid: { left: '3%', right: '4%', bottom: '18%', top: title ? 32 : 4, containLabel: true },
    xAxis: { type: 'category', data: data.map((d) => d.date), axisLabel: { color: 'rgba(255,255,255,0.4)', fontSize: 12 }, axisLine: { lineStyle: { color: 'rgba(0,212,255,0.08)' } }, axisTick: { show: false } },
    yAxis: { type: 'value', axisLabel: { color: 'rgba(255,255,255,0.35)', fontSize: 11 }, splitLine: { lineStyle: { color: 'rgba(0,212,255,0.05)' } }, axisLine: { show: false }, axisTick: { show: false } },
    series,
  };
  return <ChartBase options={options} />;
}
