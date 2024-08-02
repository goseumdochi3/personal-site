import { PokemonCardSet } from '../../models/PokemonCardSets'
import { db } from '../../db/database'
import { PokemonCardsSchema } from '../../db/schemas/PokemonCardSchema'
import { eq } from 'drizzle-orm'
import { getLastSoldData } from '../EbayScraperClient'
import { createSoldItem } from './SoldItemService'

const getSoldDataForEntireSet = async (set_name: PokemonCardSet) => {
  const pokemonCardsInSet = await db
    .select()
    .from(PokemonCardsSchema)
    .where(eq(PokemonCardsSchema.cardSet, set_name))

  console.log(`Starting collection of sold data for ${set_name}`)

  for (const card of pokemonCardsInSet) {
    const soldItemsData = await getLastSoldData(
      card.cardSet,
      card.cardName,
      card.cardNumber
    )

    console.log(`Found ${soldItemsData.length} sold items for ${card.cardName}`)

    for (const soldItem of soldItemsData) {
      await createSoldItem(
        soldItem.title,
        new Date(soldItem.soldDate),
        soldItem.price,
        soldItem.link,
        card.uuid
      )
    }
  }

  console.log(`Finished collection of sold data for ${set_name}`)
}

export { getSoldDataForEntireSet }
