ALTER TABLE "sold_items" ALTER COLUMN "link" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "sold_items" ADD CONSTRAINT "sold_items_link_unique" UNIQUE("link");