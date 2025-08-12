import AppHeader from '../components/layout/AppHeader';
import StatCard from '../components/ui/StatCard';
import { useInsights } from '../hooks/useInsights';
import PerformanceTrendChart from '../components/charts/PerformanceTrendChart';
import AnomalyPanel from '../components/panels/AnomalyPanel';
import { fmt1, fmtPct } from '../lib/formatters';
import SkillsComparisonChart from '../components/charts/SkillsComparisonChart';
import ScoreDistributionChart from '../components/charts/ScoreDistributionChart';

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useInsights({ range: 'last7days' });

  const k = data?.kpis;

  return (
    <div className="min-h-screen">
      <AppHeader />
       <main className="container py-6 space-y-6">
        {isError && (
          <div className="rounded-md bg-rose-50 border border-rose-200 p-3 text-rose-700">
            Something went wrong. <button className="underline" onClick={() => refetch()}>Retry</button>
          </div>
        )}

        {/* KPI row */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Avg Score" value={isLoading ? '—' : k ? fmt1(k.avgScore) : '—'} />
          <StatCard label="Pass Rate" value={isLoading ? '—' : k ? fmtPct(k.passRate) : '—'} />
          <StatCard label="Total Sessions" value={isLoading ? '—' : `${k?.totalSessions ?? '—'}`} />
          <StatCard
            label="7d Change"
            value={isLoading || k?.last7dChange == null ? '—' : fmt1(k.last7dChange)}
            hint={k?.last7dChange != null ? (k.last7dChange >= 0 ? 'Up vs prev 7d' : 'Down vs prev 7d') : undefined}
            trend={k?.last7dChange != null ? (k.last7dChange >= 0 ? 'up' : 'down') : null}
          />
        </section>

        {/* Trend + anomalies grid */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <PerformanceTrendChart data={data?.trends ?? []} />
          </div>
          <div className="xl:col-span-1">
            <AnomalyPanel items={data?.anomalies} />
          </div>
        </section>
        {/* Skills + Distribution */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          <SkillsComparisonChart data={data?.skillsTop ?? []} />
          <ScoreDistributionChart data={data?.distribution?.bins ?? []} />
        </section>

      </main>
    </div>

  );
}
