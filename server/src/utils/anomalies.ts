import { zScores, mean } from './stats.js';

export function detectAnomalies(daily: { date: string; avgScore: number }[]) {
  const vals = daily.map(d => d.avgScore);
  const zs = zScores(vals);
  return daily.map((d, i) => ({
    ...d,
    isAnomaly: Math.abs(zs[i]) >= 2,
    z: zs[i]
  }));
}
