export type Anomaly = { date: string; scope: string; metric: string; value: number; message?: string };

export default function AnomalyPanel({ items }: { items: Anomaly[] | undefined }) {
  return (
    <div className="card p-4 h-80">
      <h3 className="text-sm font-medium text-slate-700 mb-2">Anomalies</h3>
      {(!items || items.length === 0) ? (
        <div className="h-full grid place-items-center text-slate-500 text-sm">No anomalies in this range.</div>
      ) : (
        <ul className="space-y-3 overflow-y-auto h-[calc(100%-1.75rem)] pr-1">
          {items.map((a, i) => (
            <li key={i} className="rounded-lg border border-rose-100 bg-rose-50/60 p-3">
              <div className="text-xs text-rose-700 font-medium">{a.scope} • {a.metric}</div>
              <div className="text-sm">{a.message ?? `Value ${a.value.toFixed(1)}`}</div>
              <div className="text-xs text-slate-500">{a.date}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
