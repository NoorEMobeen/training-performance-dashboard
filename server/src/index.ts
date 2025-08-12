import 'dotenv/config';
import app from './app.js';
import { loadData } from './services/insights.service.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 8000;

async function main(){
  await loadData();
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
main();
