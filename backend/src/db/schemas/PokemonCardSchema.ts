import { pgTable, primaryKey, uuid, varchar } from 'drizzle-orm/pg-core'

import { pgEnum } from 'drizzle-orm/pg-core'
import { allPokemonCardSets } from '../../models/PokemonCardSets'

const PokemonCardSetEnumSchema = pgEnum('card_set', allPokemonCardSets)

const PokemonCardsSchema = pgTable(
  'pokemon_cards',
  {
    uuid: uuid('uuid').notNull(),
    cardName: varchar('card_name', { length: 128 }).notNull(),
    cardNumber: varchar('card_number', { length: 8 }).default('').notNull(),
    cardSet: PokemonCardSetEnumSchema('card_set').notNull(),
    imageLink: varchar('image_link', { length: 1024 }),
  },
  (table) => {
    return {
      pk: primaryKey({
        columns: [table.cardName, table.cardNumber, table.cardSet],
      }),
    }
  }
)

type PokemonCardInferType = typeof PokemonCardsSchema.$inferSelect

export { PokemonCardsSchema, PokemonCardInferType, PokemonCardSetEnumSchema }
