import { Router, Request, Response } from 'express';
import { header } from '../../lib/header';
import { db } from '../../lib/database';

const router = Router();

/**
 * GET /table/:table_name
 * Returns schema, row count, and rows from the specified table.
 */
router.get('/:table_name', (req: Request, res: Response) => {
  const tableName = req.params.table_name;

  try {
    // Check if table exists
    const tableExists = db.prepare(`
      SELECT name FROM sqlite_master WHERE type='table' AND name = ?
    `).get(tableName);

    if (!tableExists) {
      return res.status(404).json({
        ...header,
        severity: 'warning',
        title: `Table "${tableName}" not found`,
        data: {
          error: `No table named "${tableName}"`,
        }
      });
    }

    // Get schema
    const schema = db.prepare(`PRAGMA table_info(${tableName})`).all();

    // Get rows
    const rows = db.prepare(`SELECT * FROM ${tableName} ORDER BY id DESC`).all();

    res.json({
      ...header,
      severity: 'success',
      title: `* SELECT FROM ${tableName}`,
      description: `${tableName} table info`,
      data: {
        table: tableName,
        schema,
        count: rows.length,
        rows,
      }
    });
  } catch (err: any) {
    console.error(`[table/${tableName}] Error:`, err);
    res.status(500).json({
      ...header,
      severity: 'error',
      title: 'Error accessing table',
      data: {
        error: err.message || 'Internal server error',
      }
    });
  }
});

export default router;
