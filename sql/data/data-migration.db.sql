BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "log" (
	"id"	INTEGER,
	"created"	INTEGER,
	"updated"	INTEGER,
	"severity"	TEXT,
	"title"	TEXT,
	"description"	TEXT,
	"data"	BLOB,
	PRIMARY KEY("id" AUTOINCREMENT)
);
INSERT INTO "log" ("id","created","updated","severity","title","description","data") VALUES (1,1753529306927,1753529306927,'success','Log entry','A log can also have a data field, which is stringified JSON','{"foo":"bar"}');
COMMIT;
