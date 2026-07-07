import ChartBase from "./core/ChartBase";
export default function PieChart({ data = [], title }) {
  const options = {
    title: title ? { text: title, left: "center", textStyle: { color: "rgba(255,255,255,0.8)", fontSize: 13 } } : undefined,
    tooltip: { trigger: "item", formatter: "{b}: {c} ({d}%)" },
    series: [{
      type: "pie", radius: ["35%", "60%"], center: ["50%", "50%"],
      avoidLabelOverlap: true, label: { color: "rgba(255,255,255,0.6)", fontSize: 11 },
      emphasis: { label: { fontSize: 14, fontWeight: "bold" }, itemStyle: { shadowBlur: 10, shadowColor: "rgba(0,255,170,0.3)" } },
      data: data.map(d => ({ name: d.name||d.label, value: d.value })),
      itemStyle: { borderRadius: 4, borderColor: "rgba(10,14,26,0.8)", borderWidth: 2 },
      color: ["#00ffaa","#ffd700","#4dabf7","#ff6b6b","#a29bfe","#fd79a8","#00cec9","#fdcb6e"],
    }],
  };
  return <ChartBase options={options} />;
}
