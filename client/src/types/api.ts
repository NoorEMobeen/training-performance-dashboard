export type InsightsResponse = {
  meta: { generatedAt: string; filters: Record<string, unknown> };
  kpis: { avgScore: number; passRate: number; totalSessions: number; last7dChange?: number };
  byDepartment: { department: string; avgScore: number; passRate: number; sessions: number }[];
  trends: { date: string; avgScore: number; sessions: number; isAnomaly?: boolean }[];
  skillsTop: { skill: string; avg: number; department?: string }[];
  distribution?: { bins: { start: number; end: number; count: number }[] };
  anomalies?: { date: string; scope: string; metric: string; value: number; zScore?: number; message?: string }[];
};

export type InsightsQuery = {
  department?: string;
  startDate?: string;
  endDate?: string;
  range?: 'last7days' | 'last30days' | 'thisMonth';
};
