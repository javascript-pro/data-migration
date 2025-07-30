// data-migration/sql/src/routes/applications/index.ts

import { Router, Request, Response } from 'express';
import { header } from '../../lib/header';
import { db } from '../../lib/database';
// import readRouter from './read';

const router = Router();

/**
 * GET /applications
 * Returns all rows from the applications table.
 */
router.get('/', (_req: Request, res: Response) => {
  try {
    const tableName = 'applications';
    const sql = `SELECT * FROM ${tableName} ORDER BY id DESC`;
    const rows = db.prepare(sql).all();

    res.json({
      ...header,
      severity: 'success',
      title: `* SELECTED FROM from ${tableName}`,
      description: `Applications ${rows.length}`,
      data: {
        count: rows.length,
        rows,
      }
    });
  } catch (err: any) {
    console.error(`[applications/index] Error:`, err);
    res.status(500).json({
      ...header,
      severity: 'error',
      title: 'Error reading applications',
      data: {
        error: err.message || 'Internal server error',
      }
    });
  }
});

// router.use('/read', readRouter );

export default router;
