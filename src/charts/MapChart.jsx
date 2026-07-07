import ChartBase from "./core/ChartBase";
export default function MapChart({ data = [], title }) {
  const options = {
    title: title ? { text: title, left: "center", textStyle: { color: "rgba(255,255,255,0.8)", fontSize: 13 } } : undefined,
    tooltip: { trigger: "item", formatter: "{b}: {c}" },
    series: [{
      type: "map", map: "china", roam: true,
      label: { show: true, color: "rgba(255,255,255,0.6)", fontSize: 10 },
      itemStyle: { areaColor: "rgba(0,255,170,0.05)", borderColor: "rgba(0,255,170,0.2)", borderWidth: 1 },
      emphasis: { label: { color: "#00ffaa", fontWeight: "bold" }, itemStyle: { areaColor: "rgba(0,255,170,0.2)" } },
      data: data.map(d => ({ name: d.province||d.name, value: d.value })),
    }],
    visualMap: { min: 0, max: Math.max(...data.map(d => d.value||0), 1000), text: ["高","低"], textStyle: { color: "rgba(255,255,255,0.5)" }, inRange: { color: ["rgba(0,255,170,0.1)","rgba(0,255,170,0.4)","#00ffaa"] }, calculable: true, left: "left", bottom: 10 },
  };
  return <ChartBase options={options} />;
}
