import { Router } from 'express';
import { transformData } from '../../../lib/sql/migrate/transformData';

const router = Router();

router.post('/', async (req, res) => {
  try {
    await transformData();
    res.status(200).json({ message: 'Data transformed successfully' });
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
