## Data Migration with Next, Python & SQL

> Technical interview: Using Next.js, Python and SQL.  with the use of an online coding interview tool, coding exerciseswill be presented and discussed.

#### Agile Story

"In a project where we inherit a legacy SQL Server database, the data is inconsistent and undocumented. Profiled nulls, duplicates, and inconsistent formats across tables."

#### Solution

Staged raw data, applied deterministic cleanup logic with SQL (using ROW_NUMBER(), CASE, TRY_CAST, and window functions), and created a cleaned model with metadata columns for audit. Validated transformations with checksum diffs and row counts. This allowed us to make the data usable for reporting and downstream ML.

## Install & Use

Clone the [repo](https://github.com/javascript-pro/data-migration) and change dir to the project route and run...

```sh
yarn install & yarn dev
```

If all goes well, the Next.js frontend will be avilable on http://localhost:3000/, the API on http://localhost:4000/

__Note__: Node will create `data-migration/data-migration.db` on first run




#### SQL in Data Migration

SQL is the core tool for profiling, cleaning, transforming, and loading data during migration. It allows direct manipulation of source and target schemas, detection of data quality issues, and implementation of business rules at scale. Using SQL ensures transformations are transparent, testable, and performant within the database engine itself.


## Python in Data Migration

Python is used here to support data migration by handling tasks that go beyond pure SQL — such as automating ETL workflows, validating data across environments, transforming unstructured inputs (e.g. JSON, CSV), and integrating with APIs or file systems. It enables reproducible, testable pipelines and bridges gaps where SQL Server alone isn't sufficient.

