## Data Migration

> Technical interview: Using Next.js, Python and SQL.  with the use of an online coding interview tool, coding exerciseswill be presented and discussed.

#### Problem

"In a project where we inherit a legacy SQL Server database, the data is inconsistent and undocumented. Profiled nulls, duplicates, and inconsistent formats across tables."

#### Solution

I staged raw data, applied deterministic cleanup logic with SQL (using ROW_NUMBER(), CASE, TRY_CAST, and window functions), and created a cleaned model with metadata columns for audit. I validated transformations with checksum diffs and row counts. This allowed us to make the data usable for reporting and downstream ML.

