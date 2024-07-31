import { date, decimal, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

const SoldItemsSchema = pgTable('sold_items', {
  id: serial('id').primaryKey(),
  title: varchar('title', { length: 256 }),
  link: varchar('link', { length: 1024 }),
  soldDate: date('sold_date'),
  price: decimal('price', { precision: 10, scale: 2 }),
})

type SoldItemInferType = typeof SoldItemsSchema.$inferSelect

export { SoldItemsSchema, SoldItemInferType }
