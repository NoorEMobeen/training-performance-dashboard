import { Router } from 'express';
import { getInsights } from '../controllers/insights.controller.js';

const router = Router();
router.get('/insights', getInsights);

export default router;
