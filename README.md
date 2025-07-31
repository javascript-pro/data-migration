## Data Migration with Next.js, Python & SQL
Technical interview project demonstrating a full-stack data migration pipeline using SQL, Python, and a Next.js interface.

Agile Story
"Inherited a legacy SQL Server database with undocumented schema, profiled inconsistencies including nulls, duplicates, and format drift across related tables."

Solution
Staged raw data and applied deterministic SQL transformations using ROW_NUMBER(), CASE, TRY_CAST, and window functions. Built cleaned tables with audit metadata. Python was used for orchestration and test validation. Exposed RESTful endpoints via a Node-based SQL API, with a Next.js frontend for triggering workflows and inspecting results. Validated output via checksums and row counts, preparing the data for analytics and ML.

## Install & Use

Clone the [repo](https://github.com/javascript-pro/data-migration) and change dir to the project route and run...

```sh
yarn install & yarn dev
```

If all goes well, the Next.js frontend will be avilable on http://localhost:3000/, the API on http://localhost:4000/

__Note__: Node will create `data-migration/data-migration.db` on first run
