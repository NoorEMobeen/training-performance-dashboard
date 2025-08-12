import AppHeader from '../components/layout/AppHeader';
import StatCard from '../components/ui/StatCard';
import { useInsights } from '../hooks/useInsights';

export default function DashboardPage() {
  const { data, isLoading, isError, refetch } = useInsights({ range: 'last7days' });

  const k = data?.kpis;

  return (
    <div className="min-h-screen">
      <AppHeader />
      <main className="container py-6 space-y-6">
        {isError && (
          <div className="rounded-md bg-rose-50 border border-rose-200 p-3 text-rose-700">
            Something went wrong.{' '}
            <button className="underline" onClick={() => refetch()}>
              Retry
            </button>
          </div>
        )}

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Avg Score" value={isLoading ? '—' : `${k?.avgScore?.toFixed(1) ?? '—'}`} />
          <StatCard label="Pass Rate" value={isLoading ? '—' : `${Math.round((k?.passRate ?? 0) * 100)}%`} />
          <StatCard label="Total Sessions" value={isLoading ? '—' : `${k?.totalSessions ?? '—'}`} />
          <StatCard
            label="7d Change"
            value={isLoading || k?.last7dChange == null ? '—' : `${k.last7dChange.toFixed(1)}`}
            hint={k?.last7dChange != null ? (k.last7dChange >= 0 ? 'Up vs prev 7d' : 'Down vs prev 7d') : undefined}
            trend={k?.last7dChange != null ? (k.last7dChange >= 0 ? 'up' : 'down') : null}
          />
        </section>
      </main>
    </div>
  );
}
