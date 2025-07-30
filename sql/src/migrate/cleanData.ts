import {db} from '../lib/database';

export const cleanData = async () => {
  db.exec(\`
    DELETE FROM users WHERE email IS NULL;
    UPDATE users SET name = TRIM(name);
    UPDATE users SET country = 'United Kingdom' WHERE country IN ('UK', 'U.K.', 'Britain');
  \`);
};
