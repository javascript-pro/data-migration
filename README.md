

## Data Migration

> Technical interview: Using Next.js, Python and SQL.  with the use of an online coding interview tool, coding exerciseswill be presented and discussed.

#### Problem

"In a project where we inherit a legacy SQL Server database, the data is inconsistent and undocumented. Profiled nulls, duplicates, and inconsistent formats across tables."

#### Solution

I staged raw data, applied deterministic cleanup logic with SQL (using ROW_NUMBER(), CASE, TRY_CAST, and window functions), and created a cleaned model with metadata columns for audit. I validated transformations with checksum diffs and row counts. This allowed us to make the data usable for reporting and downstream ML.



___ 

## Install & Use

Change dir to the project route and run 
`yarn install & yarn dev`
If all goes well, the Next.js frontend will be avilable on http://localhost:3000/, the API on http://localhost:4000/

Note: Node will create `data-migration/data-migration.db` on first run

#### [SQL in Data Migration](./sql)


SQL is the core tool for profiling, cleaning, transforming, and loading data during migration. It allows direct manipulation of source and target schemas, detection of data quality issues, and implementation of business rules at scale. Using SQL ensures transformations are transparent, testable, and performant within the database engine itself.
