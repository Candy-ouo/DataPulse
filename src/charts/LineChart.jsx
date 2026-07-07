import ChartBase from "./core/ChartBase";
export default function LineChart({ data = [], title }) {
  const keys = Object.keys(data[0] || {}).filter(k => k !== "date");
  const series = keys.map((k, i) => ({
    name: k, type: "line", data: data.map(d => d[k]),
    smooth: true, symbol: "circle", symbolSize: 4,
    lineStyle: { width: 2 }, areaStyle: { opacity: 0.08 },
    itemStyle: { color: ["#00ffaa","#ffd700","#4dabf7"][i] || "#00ffaa" },
  }));
  const options = {
    title: title ? { text: title, textStyle: { color: "rgba(255,255,255,0.8)", fontSize: 13 } } : undefined,
    tooltip: { trigger: "axis" },
    legend: { bottom: 0, textStyle: { color: "rgba(255,255,255,0.5)", fontSize: 11 }, icon: "circle", itemWidth: 8 },
    grid: { left: "3%", right: "4%", bottom: "18%", top: title ? 30 : 8, containLabel: true },
    xAxis: { type: "category", data: data.map(d => d.date), axisLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11 } },
    yAxis: { type: "value", axisLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11 }, splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } } },
    series,
  };
  return <ChartBase options={options} />;
}
