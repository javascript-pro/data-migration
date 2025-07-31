import { Router } from 'express';
// import { migrateData } from '../../../lib/sql/migrate/migrateData';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // await migrateData();
    res.status(200).json({ message: 'Data migration complete' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
