// data-migration/sql/src/server.ts
import express from 'express';
import cors from 'cors';
import {header, endpoints} from './lib';
import tableRouter from './routes/table';
import migrateRouter from './routes/migrate';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());


app.use('/table', tableRouter);
app.use('/migrate', migrateRouter);

app.all('/', (req, res) => {
  try {
    res.json({ 
      ...header,
      endpoints,
    });
  } catch (err: any) {
    console.error('Error in /:', err);
    res.status(500).json({ 
      success: false, 
      error: err.message || 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Data Migration Service running on http://localhost:${PORT}`);
});
