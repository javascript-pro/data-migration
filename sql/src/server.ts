// data-migration/sql/src/server.ts
import express from 'express';
import cors from 'cors';
import {header, endpoints} from './lib';
import testRouter from './routes/test/test';
import dbRouter from './routes/db';
import logRouter from './routes/log';

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use('/test', testRouter);
app.use('/db', dbRouter);
app.use('/log', logRouter);

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
