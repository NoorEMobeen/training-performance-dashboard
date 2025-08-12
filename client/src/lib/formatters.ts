import { format, parseISO } from 'date-fns';

export const fmtPct = (n: number) => `${Math.round(n * 100)}%`;
export const fmt1 = (n: number) => n.toFixed(1);
export const fmtDate = (iso: string) => format(parseISO(iso), 'MMM d');
