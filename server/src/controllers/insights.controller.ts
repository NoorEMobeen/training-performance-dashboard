import { z } from 'zod';
import { computeInsights } from '../services/insights.service.js';

const querySchema = z.object({
  department: z.string().min(1).optional(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  range: z.enum(['last7days','last30days','thisMonth']).optional()
});

export function getInsights(req: any, res: any, next: any) {
  try {
    const q = querySchema.parse(req.query);
    const data = computeInsights(q);
    res.json(data);
  } catch (err) {
    next(err);
  }
}
