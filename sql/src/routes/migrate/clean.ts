import { Router } from 'express';
// import { cleanData } from '../../../lib/sql/migrate/cleanData';

const router = Router();

router.post('/', async (req, res) => {
  try {
    // await cleanData();
    res.status(200).json({ message: 'Data cleaned successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
