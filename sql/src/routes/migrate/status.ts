import { Router } from 'express';
// import { getMigrationStatus } from '../../../lib/sql/migrate/getMigrationStatus';

const router = Router();

router.get('/', async (req, res) => {
  try {
    // const status = await getMigrationStatus();
    res.status(200).json(status);
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
});

export default router;
