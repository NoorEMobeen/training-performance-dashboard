import { addDays, endOfMonth, format, isAfter, isBefore, isValid, parseISO, startOfMonth, subDays } from 'date-fns';

export function applyRange(range?: string): { startDate?: string; endDate?: string } {
  const today = new Date();
  if (!range) return {};
  if (range === 'last7days') return { startDate: format(subDays(today, 6), 'yyyy-MM-dd'), endDate: format(today, 'yyyy-MM-dd') };
  if (range === 'last30days') return { startDate: format(subDays(today, 29), 'yyyy-MM-dd'), endDate: format(today, 'yyyy-MM-dd') };
  if (range === 'thisMonth') return { startDate: format(startOfMonth(today), 'yyyy-MM-dd'), endDate: format(endOfMonth(today), 'yyyy-MM-dd') };
  return {};
}

export function inDateWindow(dateStr: string, start?: string, end?: string) {
  const d = parseISO(dateStr);
  if (!isValid(d)) return false;
  if (start && isBefore(d, parseISO(start))) return false;
  if (end && isAfter(d, addDays(parseISO(end), 1))) return false; // inclusive end
  return true;
}
