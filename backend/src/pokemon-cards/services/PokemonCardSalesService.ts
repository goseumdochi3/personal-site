import { PokemonCardsSchema } from 'db/schemas/PokemonCardSchema'
import { SoldItemsSchema } from 'db/schemas/SoldItemsSchema'
import { and, eq } from 'drizzle-orm'
import { PokemonCardSet } from 'models/PokemonCardSets'
import { db } from '../../db/database'

export class SalesDataService {
  async getPokemonCardSalesData(expansion: string, cardNumber: string) {
    const pokemonCard = await db
      .select()
      .from(PokemonCardsSchema)
      .where(
        and(
          eq(PokemonCardsSchema.cardSet, expansion as PokemonCardSet),
          eq(PokemonCardsSchema.cardNumber, cardNumber)
        )
      )
      .limit(1)

    console.log(pokemonCard)

    if (!pokemonCard) {
      throw new Error('Pokemon card not found')
    }

    const result = db
      .select()
      .from(SoldItemsSchema)
      .where(eq(SoldItemsSchema.itemTypeUUID, pokemonCard[0].uuid))
    console.log(result)
    return result
  }
}
