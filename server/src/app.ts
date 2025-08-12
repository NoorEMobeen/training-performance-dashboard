import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import insightsRouter from './routes/insights.routes.js';
import { errorHandler } from './middleware/error.js';

const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(compression());
app.use(morgan('dev'));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.get('/', (_req, res) => {
  res.type('text/plain').send('Training Insights API. Try GET /health or /api/insights');
});
app.use('/api', insightsRouter);
app.use(errorHandler);

export default app;


// hit on 
// curl "http://localhost:8000/api/insights?range=last7days"
// curl "http://localhost:8000/api/insights?department=Sales"

