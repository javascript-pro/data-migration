import {db} from '../lib/database';

export const transformData = async () => {
  db.exec(\`
    CREATE TABLE IF NOT EXISTS users_clean (
      id INTEGER PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT UNIQUE,
      country TEXT,
      signup_date TEXT
    );

    INSERT INTO users_clean (id, name, email, country, signup_date)
    SELECT
      id,
      UPPER(name),
      LOWER(email),
      country,
      strftime('%Y-%m-%d', signup_date)
    FROM users;
  \`);
};
