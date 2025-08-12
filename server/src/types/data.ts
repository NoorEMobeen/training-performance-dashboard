export type Session = {
  id: string;
  date: string; // YYYY-MM-DD
  department: string;
  score: number; // 0-100
  passed: boolean;
  durationMinutes: number;
  skills: Record<string, number>; // skill -> score
};

export type InsightsFilters = {
  department?: string;
  startDate?: string; // YYYY-MM-DD
  endDate?: string;   // YYYY-MM-DD
  range?: 'last7days' | 'last30days' | 'thisMonth';
};

export type InsightsResponse = {
  meta: { generatedAt: string; filters: InsightsFilters };
  kpis: { avgScore: number; passRate: number; totalSessions: number; last7dChange?: number };
  byDepartment: { department: string; avgScore: number; passRate: number; sessions: number }[];
  trends: { date: string; avgScore: number; sessions: number; isAnomaly?: boolean }[];
  skillsTop: { skill: string; avg: number; department?: string }[];
  distribution: { bins: { start: number; end: number; count: number }[] };
  anomalies: { date: string; scope: string; metric: string; value: number; zScore?: number; message?: string }[];
};
