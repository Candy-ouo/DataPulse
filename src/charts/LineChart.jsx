import ChartBase from './core/ChartBase';
export default function LineChart({ data = [], title }) {
  const keys = Object.keys(data[0] || {}).filter((k) => k !== 'date');
  const colors = ['#00d4ff', '#48b0f7', '#90e0ef'];
  const series = keys.map((k, i) => ({
    name: k,
    type: 'line',
    data: data.map((d) => d[k]),
    smooth: true,
    symbol: 'circle',
    symbolSize: 3,
    lineStyle: { width: 2 },
    areaStyle: { opacity: 0.06 },
    itemStyle: { color: colors[i % colors.length] },
  }));
  const options = {
    title: title ? { text: title, textStyle: { color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 400 } } : undefined,
    tooltip: { trigger: 'axis' },
    legend: {
      bottom: 0,
      textStyle: { color: 'rgba(255,255,255,0.35)', fontSize: 10 },
      icon: 'circle',
      itemWidth: 6,
      itemHeight: 6,
    },
    grid: { left: '3%', right: '4%', bottom: '16%', top: title ? 26 : 4, containLabel: true },
    xAxis: {
      type: 'category',
      data: data.map((d) => d.date),
      axisLabel: { color: 'rgba(255,255,255,0.3)', fontSize: 10 },
      axisLine: { lineStyle: { color: 'rgba(0,212,255,0.06)' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: 'rgba(255,255,255,0.25)', fontSize: 10 },
      splitLine: { lineStyle: { color: 'rgba(0,212,255,0.04)' } },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series,
  };
  return <ChartBase options={options} />;
}
