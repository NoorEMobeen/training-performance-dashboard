import { z } from 'zod';
import type { InsightsQuery, InsightsResponse } from '../types/api';

const base = import.meta.env.VITE_API_BASE_URL;

const insightsSchema: z.ZodType<InsightsResponse> = z.object({
  meta: z.object({ generatedAt: z.string(), filters: z.record(z.string(), z.unknown()) }),
  kpis: z.object({
    avgScore: z.number(),
    passRate: z.number(),
    totalSessions: z.number(),
    last7dChange: z.number().optional(),
  }),
  byDepartment: z.array(z.object({
    department: z.string(),
    avgScore: z.number(),
    passRate: z.number(),
    sessions: z.number(),
  })),
  trends: z.array(z.object({
    date: z.string(),
    avgScore: z.number(),
    sessions: z.number(),
    isAnomaly: z.boolean().optional(),
  })),
  skillsTop: z.array(z.object({
    skill: z.string(),
    avg: z.number(),
    department: z.string().optional(),
  })),
  distribution: z.object({
    bins: z.array(z.object({ start: z.number(), end: z.number(), count: z.number() })),
  }).optional(),
  anomalies: z.array(z.object({
    date: z.string(),
    scope: z.string(),
    metric: z.string(),
    value: z.number(),
    zScore: z.number().optional(),
    message: z.string().optional(),
  })).optional(),
});

export async function fetchInsights(q: InsightsQuery): Promise<InsightsResponse> {
  const url = new URL('/api/insights', base);
  Object.entries(q).forEach(([k, v]) => (v ? url.searchParams.set(k, String(v)) : null));
  const res = await fetch(url.toString(), { headers: { accept: 'application/json' } });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  return insightsSchema.parse(json);
}
