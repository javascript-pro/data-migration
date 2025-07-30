// data-migration/sql/src/routes/db/index.ts
import { Router, Request, Response } from 'express';
import { header } from '../../lib/header';
import schemaRouter from './schema';
import createRouter from './create';
import readRouter from './read';
import { endpoints } from '../../lib';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.json({
    ...header,
    ...endpoints['test']
  });
});

router.use('/schema', schemaRouter);
router.use('/create', createRouter);
router.use('/read', readRouter);

export default router;
