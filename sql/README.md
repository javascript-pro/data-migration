## SQL in Data Migration

SQL is the core tool for profiling, cleaning, transforming, and loading data during migration. It allows direct manipulation of source and target schemas, detection of data quality issues, and implementation of business rules at scale. Using SQL ensures transformations are transparent, testable, and performant within the database engine itself.

## RESTful Data Migration API

This Node + SQLite app exposes a RESTful interface for data cleaning, transformation, and migration. It enables structured, testable migration workflows for messy or legacy data.

---

### 🗂 Directory Layout

```
src/
├── routes/
│   └── migrate/
│       ├── clean.ts         ← POST /api/migrate/clean
│       ├── transform.ts     ← POST /api/migrate/transform
│       ├── migrate.ts       ← POST /api/migrate/migrate
│       └── status.ts        ← GET  /api/migrate/status
├── lib/sql/
│   └── migrate/
│       ├── cleanData.ts
│       ├── transformData.ts
│       ├── migrateData.ts
│       └── getMigrationStatus.ts
```

## 🔧 Endpoints

### `POST /api/migrate/clean`
- Trims whitespace
- Removes invalid rows (e.g. missing email)
- Normalizes text fields (e.g. country names)

### `POST /api/migrate/transform`
- Creates `users_clean` table if not exists
- Transforms names, emails, and date formats
- Loads cleaned data into the new table

### `POST /api/migrate/migrate`
- Optional step: move `users_clean` into production destination

### `GET /api/migrate/status`
- Returns record count of `users_clean`


## 🛠 Setup

```bash
yarn install
yarn dev
```

Ensure the database file is loaded from `data/data-migration.db` or adjust paths accordingly.

### 📌 Notes

- Migration steps are idempotent.
- Use this service to manage staged migrations in dev/test/prod.
- Extend `/migrate` to write to external services or production systems.

### ✅ Status

Ready to implement. All logic lives in isolated files and can be unit-tested.
