import { Activity } from 'lucide-react';

export default function AppHeader({ children }: { children?: React.ReactNode }) {
  return (
    <header className="sticky top-0 z-10 bg-white/70 backdrop-blur border-b border-slate-200">
      <div className="container flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          <Activity className="h-5 w-5 text-indigo-600" />
          <h1 className="text-lg font-semibold tracking-tight">Training Performance</h1>
        </div>
        <div className="flex items-center gap-3">{children}</div>
      </div>
    </header>
  );
}
