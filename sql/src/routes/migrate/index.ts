// data-migration/sql/src/routes/log/index.ts

import { Router, Request, Response } from 'express';
import { header } from '../../lib/header';
import { db } from '../../lib/database';
import cleanRouter from './clean';

const router = Router();

/**
 * GET /log
 * Returns all rows from the log table.
 */
router.get('/', (_req: Request, res: Response) => {
  try {

    res.json({
      ...header,
      severity: 'success',
      title: `All records in`,
      description: `Total`,
      data: {
        foo: "bar"
      }
    });
  } catch (err: any) {
    console.error(`[log/index] Error:`, err);
    res.status(500).json({
      ...header,
      severity: 'error',
      title: 'Error reading logs',
      data: {
        error: err.message || 'Internal server error',
      }
    });
  }
});

router.use('/clean', cleanRouter);

export default router;
