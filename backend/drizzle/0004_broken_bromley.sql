ALTER TABLE "sold_items" ALTER COLUMN "title" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sold_items" ALTER COLUMN "sold_date" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sold_items" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "pokemon_cards" ADD COLUMN "uuid" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "sold_items" ADD COLUMN "item_type_uuid" uuid NOT NULL;