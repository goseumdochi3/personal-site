import { integer, pgTable, serial, varchar } from 'drizzle-orm/pg-core'

import { pgEnum } from 'drizzle-orm/pg-core'
import { enumValuesToArray } from '../utils/DrizzleUtils'
import { ExpansionSet } from '../../models/ExpansionSet'

const ExpansionSetEnumSchema = pgEnum(
  'expansion_set',
  enumValuesToArray(ExpansionSet)
)

const PokemonCardsSchema = pgTable('pokemon_cards', {
  id: serial('id').primaryKey(),
  cardName: varchar('card_name', { length: 256 }).notNull(),
  imageLink: varchar('image_link', { length: 1024 }).notNull(),
  expansionSet: ExpansionSetEnumSchema('expansion_set').notNull(),
  cardNumber: integer('card_number').notNull(),
})

type PokemonCardInferType = typeof PokemonCardsSchema.$inferSelect

export { PokemonCardsSchema, PokemonCardInferType, ExpansionSetEnumSchema }
