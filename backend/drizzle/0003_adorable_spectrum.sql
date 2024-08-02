ALTER TABLE "pokemon_cards" RENAME COLUMN "expansion_set" TO "card_set";--> statement-breakpoint
ALTER TABLE "pokemon_cards" ALTER COLUMN "card_name" SET DATA TYPE varchar(128);--> statement-breakpoint
ALTER TABLE "pokemon_cards" ALTER COLUMN "image_link" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "pokemon_cards" DROP COLUMN IF EXISTS "id";
ALTER TABLE "pokemon_cards" ADD CONSTRAINT "pokemon_cards_card_name_card_number_card_set_pk" PRIMARY KEY("card_name","card_number","card_set");--> statement-breakpoint
