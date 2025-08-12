import {
  LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer,
  CartesianGrid, ReferenceDot
} from 'recharts';
import { fmtDate } from '../../lib/formatters';

type Point = { date: string; avgScore: number; isAnomaly?: boolean; sessions: number };

function CustomTooltip({ active, payload, label }: any) {
  if (!active || !payload?.length) return null;
  const p = payload[0].payload as Point;
  return (
    <div className="rounded-lg border bg-white/95 shadow-md p-3 text-sm">
      <div className="font-medium">{fmtDate(label)}</div>
      <div className="mt-1">
        <div className="flex items-center justify-between gap-6">
          <span className="text-slate-500">Avg score</span>
          <span className="font-semibold">{p.avgScore.toFixed(1)}</span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="text-slate-500">Sessions</span>
          <span className="font-semibold">{p.sessions}</span>
        </div>
        {p.isAnomaly && <div className="mt-2 text-rose-600">Anomaly detected</div>}
      </div>
    </div>
  );
}

export default function PerformanceTrendChart({ data }: { data: Point[] }) {
  // recharts expects a simple string label for X
  const rows = data.map(d => ({ ...d, label: d.date }));

  return (
    <div className="card p-4 h-80">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700">Performance Trend</h3>
        <div className="text-xs text-slate-500">Daily average score</div>
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={rows} margin={{ top: 10, left: 4, right: 8, bottom: 0 }}>
          <defs>
            {/* subtle gradient for the line */}
            <linearGradient id="scoreGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.95" />
            </linearGradient>
          </defs>

          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="label"
            tickFormatter={fmtDate}
            tickMargin={8}
            stroke="#94a3b8"
          />
          <YAxis domain={[0, 100]} tickMargin={8} stroke="#94a3b8" />
          <Tooltip content={<CustomTooltip />} />

          <Line
            type="monotone"
            dataKey="avgScore"
            stroke="url(#scoreGrad)"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
          />

          {/* mark anomalies with dots */}
          {rows.filter(r => r.isAnomaly).map((r, i) => (
            <ReferenceDot
              key={i}
              x={r.label}
              y={r.avgScore}
              r={5}
              fill="#e11d48" // rose-600
              stroke="#fff"
              strokeWidth={1.5}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
