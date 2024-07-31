DO $$ BEGIN
 CREATE TYPE "public"."expansion_set" AS ENUM('Shrouded Fables', 'Twilight Masquerade', 'Temporal Forces', 'Paldaen Fates', 'Paradox Rift', 'Scarlet & Violet - 151', 'Trick or Trade 2023', 'Holiday Calendar 2023', 'McDonalds 2023', 'Obsidian Flames', 'Paldea Evolved', 'Scarlet & Violet');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon_cards" (
	"id" serial PRIMARY KEY NOT NULL,
	"card_name" varchar(256) NOT NULL,
	"image_link" varchar(1024) NOT NULL,
	"expansion_set" "expansion_set" NOT NULL,
	"card_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sold_items" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(256),
	"link" varchar(1024),
	"sold_date" date,
	"price" numeric(10, 2)
);
