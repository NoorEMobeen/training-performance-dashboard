import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Bin = { start: number; end: number; count: number };

export default function ScoreDistributionChart({ data }: { data: Bin[] }) {
  const rows = data.map(bin => ({
    range: `${bin.start}-${bin.end}`,
    count: bin.count
  }));

  return (
    <div className="card p-4 h-80">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700">Score Distribution</h3>
        <div className="text-xs text-slate-500">Number of sessions</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={rows} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="range" tickMargin={6} stroke="#94a3b8" />
          <YAxis allowDecimals={false} tickMargin={6} stroke="#94a3b8" />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload;
              return (
                <div className="rounded-lg border bg-white/95 shadow-md p-3 text-sm">
                  <div className="font-medium">{p.range}</div>
                  <div className="text-slate-600">{p.count} sessions</div>
                </div>
              );
            }}
          />
          <Bar dataKey="count" fill="#06b6d4" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
