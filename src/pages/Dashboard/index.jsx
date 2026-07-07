import { useData } from '@/hooks/useData';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Card from '@/components/common/Card';
import TopKpiBar from '@/components/data-display/TopKpiBar';
import RankList from '@/components/data-display/RankList';
import { BarChart, LineChart, PieChart, GaugeChart } from '@/charts';

export default function DashboardPage() {
  const { data: topKpis, loading: kpiLoading } = useData('topKpis', {}, { refreshInterval: 5000 });
  const { data: trendData, loading: trendLoading, refreshing: trendRefreshing } = useData('trends', {}, { refreshInterval: 10000 });
  const { data: catData, loading: catLoading, refreshing: catRefreshing } = useData('categories', {}, { refreshInterval: 15000 });
  const { data: geoData, loading: geoLoading, refreshing: geoRefreshing } = useData('geography', {}, { refreshInterval: 20000 });
  const { data: rtData, loading: rtLoading, refreshing: rtRefreshing } = useData('realtime', {}, { refreshInterval: 5000 });

  return (
    <DashboardLayout header={<Header title="DataPulse · 数据脉动" />} footer={<Footer />}>
      <div className="flex flex-col gap-[10px] h-full">
        {/* ===== Top KPI Bar ===== */}
        <div className="shrink-0">
          {kpiLoading ? (
            <div className="grid grid-cols-6 gap-[8px]">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-[60px] rounded-[8px] animate-pulse" style={{ background: 'rgba(0,212,255,0.04)' }} />
              ))}
            </div>
          ) : (
            <TopKpiBar data={topKpis || []} />
          )}
        </div>

        {/* ===== Main Grid: 3 + 6 + 3 ===== */}
        <div className="flex-1 min-h-0 grid grid-cols-12 gap-[10px]">
          {/* === Left 3/12: 地域排名 + 系统状态 === */}
          <div className="col-span-3 flex flex-col gap-[10px]">
            <div className="flex-[3] min-h-0">
              <Card title="地域排名" loading={geoLoading} refreshing={geoRefreshing} className="h-full">
                <RankList data={geoData || []} labelKey="province" valueKey="value" />
              </Card>
            </div>
            <div className="flex-[2] min-h-0">
              <Card title="系统状态" className="h-full">
                <div className="flex flex-col justify-center h-full gap-[8px] px-[4px]">
                  {[
                    { label: '数据源', value: import.meta.env.VITE_DATA_SOURCE || 'mock', color: '#00d4ff' },
                    { label: '刷新间隔', value: '5s', color: '#48b0f7' },
                    { label: '日志级别', value: import.meta.env.VITE_LOG_LEVEL || 'info', color: '#90e0ef' },
                    { label: '运行版本', value: '1.0.0', color: 'rgba(255,255,255,0.3)' },
                  ].map((item, i) => (
                    <div key={i} className="flex justify-between items-center px-[10px] py-[6px] rounded-[6px]" style={{ background: 'rgba(0,212,255,0.04)' }}>
                      <span className="text-[10px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.label}</span>
                      <span className="text-[11px] font-mono font-semibold" style={{ color: item.color }}>{item.value}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>

          {/* === Center 6/12: 数据趋势 + 品类分布 === */}
          <div className="col-span-6 flex flex-col gap-[10px]">
            <div className="flex-1 min-h-0">
              <Card title="数据趋势" loading={trendLoading} refreshing={trendRefreshing} className="h-full">
                <div className="w-full h-full"><LineChart data={trendData || []} /></div>
              </Card>
            </div>
            <div className="flex-1 min-h-0">
              <Card title="品类分布" loading={catLoading} refreshing={catRefreshing} className="h-full">
                <div className="w-full h-full"><PieChart data={catData || []} /></div>
              </Card>
            </div>
          </div>

          {/* === Right 3/12: 品类售卖 + 实时监控 === */}
          <div className="col-span-3 flex flex-col gap-[10px]">
            <div className="flex-[3] min-h-0">
              <Card title="品类售卖" loading={catLoading} refreshing={catRefreshing} className="h-full">
                <div className="w-full h-full"><BarChart data={catData || []} /></div>
              </Card>
            </div>
            <div className="flex-[2] min-h-0">
              <Card title="实时监控" loading={rtLoading} refreshing={rtRefreshing} className="h-full">
                <div className="grid grid-cols-2 gap-[6px] w-full h-full">
                  <div className="relative">
                    <GaugeChart value={rtData?.systemLoad || 0} title="系统负载" unit="%" />
                  </div>
                  <div className="flex flex-col justify-center gap-[10px] px-[4px]">
                    {[
                      { label: '访客', value: rtData?.currentVisitors || 0, unit: '人' },
                      { label: '订单', value: rtData?.todayOrders || 0, unit: '单' },
                      { label: '营收', value: rtData?.todayRevenue ? `¥${(rtData.todayRevenue / 10000).toFixed(1)}` : '¥0', unit: '万' },
                    ].map((item, i) => (
                      <div key={i} className="text-center">
                        <p className="text-[9px]" style={{ color: 'rgba(255,255,255,0.25)' }}>{item.label}</p>
                        <p className="text-[15px] font-bold tabular-nums mt-[2px]" style={{ color: '#00d4ff' }}>{item.value}<span className="text-[9px] ml-[2px]" style={{ color: 'rgba(0,212,255,0.4)' }}>{item.unit}</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
