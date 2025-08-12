import { readFile } from 'node:fs/promises';
import { parseISO, format } from 'date-fns';
import type { Session, InsightsFilters, InsightsResponse } from '../types/data.js';
import { applyRange, inDateWindow } from '../utils/date.js';
import { mean, pct, histogram } from '../utils/stats.js';
import { detectAnomalies } from '../utils/anomalies.js';

let SESSIONS: Session[] = [];

export async function loadData() {
  const raw = await readFile(new URL('../../data/training-data.json', import.meta.url));
  SESSIONS = JSON.parse(raw.toString()) as Session[];
}

function applyFilters(filters: InsightsFilters) {
  const { startDate, endDate } = { ...filters, ...applyRange(filters.range) };
  const dep = filters.department?.toLowerCase();
  return SESSIONS.filter(s =>
    (!dep || s.department.toLowerCase() === dep) &&
    inDateWindow(s.date, startDate, endDate)
  );
}

export function computeInsights(filters: InsightsFilters): InsightsResponse {
  const rows = applyFilters(filters);
  const total = rows.length;
  const avgScore = mean(rows.map(r => r.score));
  const passRate = pct(rows.filter(r => r.passed).length, total);

  // by department
  const depMap = new Map<string, Session[]>();
  rows.forEach(r => {
    if (!depMap.has(r.department)) depMap.set(r.department, []);
    depMap.get(r.department)!.push(r);
  });
  const byDepartment = Array.from(depMap.entries()).map(([department, list]) => ({
    department,
    avgScore: mean(list.map(r => r.score)),
    passRate: pct(list.filter(r => r.passed).length, list.length),
    sessions: list.length
  }));

  // daily trends
  const dayMap = new Map<string, number[]>();
  rows.forEach(r => {
    const day = format(parseISO(r.date), 'yyyy-MM-dd');
    if (!dayMap.has(day)) dayMap.set(day, []);
    dayMap.get(day)!.push(r.score);
  });
  const trendsRaw = Array.from(dayMap.entries())
    .sort(([a],[b]) => a.localeCompare(b))
    .map(([date, arr]) => ({ date, avgScore: mean(arr), sessions: arr.length }));
  const trends = detectAnomalies(trendsRaw).map(d => ({ date: d.date, avgScore: d.avgScore, sessions: (dayMap.get(d.date)?.length ?? 0), isAnomaly: d.isAnomaly }));

  // top skills (overall)
  const skillAgg = new Map<string, number[]>();
  rows.forEach(r => Object.entries(r.skills).forEach(([skill, val]) => {
    if (!skillAgg.has(skill)) skillAgg.set(skill, []);
    skillAgg.get(skill)!.push(val);
  }));
  const skillsTop = Array.from(skillAgg.entries())
    .map(([skill, arr]) => ({ skill, avg: mean(arr) }))
    .sort((a,b) => b.avg - a.avg)
    .slice(0, 5);

  const distribution = { bins: histogram(rows.map(r => r.score)) };

  // simple 7d change vs previous 7d (if data exists)
  const last7 = rows.slice(-7).map(r => r.score);
  const prev7 = rows.slice(-14, -7).map(r => r.score);
  const last7dChange = last7.length && prev7.length ? mean(last7) - mean(prev7) : undefined;

  const anomalies = trends
    .filter(t => t.isAnomaly)
    .map(t => ({
      date: t.date,
      scope: (filters.department ?? 'overall'),
      metric: 'avgScore',
      value: t.avgScore,
      message: `Unusual average score: ${t.avgScore.toFixed(1)}`
    }));

  return {
    meta: { generatedAt: new Date().toISOString(), filters },
    kpis: { avgScore, passRate, totalSessions: total, last7dChange },
    byDepartment,
    trends,
    skillsTop,
    distribution,
    anomalies
  };
}
