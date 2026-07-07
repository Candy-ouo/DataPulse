import ChartBase from "./core/ChartBase";
export default function BarChart({ data = [], title }) {
  const options = {
    title: title ? { text: title, textStyle: { color: "rgba(255,255,255,0.8)", fontSize: 13 } } : undefined,
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    grid: { left: "3%", right: "4%", bottom: "8%", top: title ? 30 : 8, containLabel: true },
    xAxis: { type: "category", data: data.map(d => d.label||d.name||d.date), axisLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11 } },
    yAxis: { type: "value", axisLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11 }, splitLine: { lineStyle: { color: "rgba(255,255,255,0.05)" } } },
    series: [{ type: "bar", data: data.map(d => d.value||d.pv||0), itemStyle: { borderRadius: [4,4,0,0], color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{offset:0,color:"#00ffaa"},{offset:1,color:"#006644"}] } } }],
  };
  return <ChartBase options={options} />;
}
