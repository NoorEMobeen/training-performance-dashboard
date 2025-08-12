type Props = {
  label: string;
  value: string;
  hint?: string;
  trend?: 'up' | 'down' | null;
};

export default function StatCard({ label, value, hint, trend }: Props) {
  return (
    <div className="card p-4">
      <div className="text-sm text-slate-500">{label}</div>
      <div className="mt-1 text-2xl font-semibold">{value}</div>
      {hint && (
        <div
          className={`mt-1 text-xs ${
            trend === 'up'
              ? 'text-emerald-600'
              : trend === 'down'
              ? 'text-rose-600'
              : 'text-slate-500'
          }`}
        >
          {hint}
        </div>
      )}
    </div>
  );
}
