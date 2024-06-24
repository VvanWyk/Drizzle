CREATE TABLE IF NOT EXISTS "Users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"lastName" varchar(255) NOT NULL
);
