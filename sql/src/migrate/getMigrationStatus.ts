import {db} from '../lib/database';

export const getMigrationStatus = async (): Promise<{ migratedRows: number }> => {
  const row = db.prepare('SELECT COUNT(*) as count FROM users_clean').get();
  return { migratedRows: row.count };
};
