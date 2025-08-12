import { useQuery } from '@tanstack/react-query';
import { fetchInsights } from '../lib/api';
import type { InsightsQuery } from '../types/api';

export function useInsights(q: InsightsQuery){
  return useQuery({
    queryKey: ['insights', q],
    queryFn: () => fetchInsights(q),
    staleTime: 60_000,
  });
}
