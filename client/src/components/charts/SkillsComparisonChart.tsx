import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

type Skill = { skill: string; avg: number; department?: string };

export default function SkillsComparisonChart({ data }: { data: Skill[] }) {
  return (
    <div className="card p-4 h-80">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-medium text-slate-700">Top Skills</h3>
        <div className="text-xs text-slate-500">Average scores</div>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="skill" tickMargin={6} stroke="#94a3b8" />
          <YAxis domain={[0, 100]} tickMargin={6} stroke="#94a3b8" />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const p = payload[0].payload as Skill;
              return (
                <div className="rounded-lg border bg-white/95 shadow-md p-3 text-sm">
                  <div className="font-medium">{p.skill}</div>
                  <div className="text-slate-600">Avg: {p.avg.toFixed(1)}</div>
                </div>
              );
            }}
          />
          <Bar dataKey="avg" fill="#4f46e5" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
