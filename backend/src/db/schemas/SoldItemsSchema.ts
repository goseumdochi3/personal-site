import {
  date,
  decimal,
  pgTable,
  serial,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core'

const SoldItemsSchema = pgTable('sold_items', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }).notNull(),
  link: varchar('link', { length: 1024 }).notNull().unique(),
  soldDate: date('sold_date', { mode: 'date' }).notNull(),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  itemTypeUUID: uuid('item_type_uuid').notNull(),
})

type SoldItemInferType = typeof SoldItemsSchema.$inferSelect

export { SoldItemsSchema, SoldItemInferType }
