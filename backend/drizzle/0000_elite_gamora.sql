CREATE TABLE IF NOT EXISTS "users" (
	"id" serial PRIMARY KEY NOT NULL,
	"first_name" varchar(128),
	"last_name" varchar(128),
	"email" varchar(256),
	"password" varchar(256)
);
