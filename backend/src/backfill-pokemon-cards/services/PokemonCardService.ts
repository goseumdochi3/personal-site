import { db } from '../../db/database'
import { PokemonCardsSchema } from '../../db/schemas/PokemonCardSchema'
import { PokemonCard } from '../../models/PokemonCard'
import { PokemonCardSet } from '../../models/PokemonCardSets'
import { PokemonCardResponseModel } from '../client/models/PokemonCardResponseModel'

export class PokemonCardService {
  getPokemonCards() {
    return db.select().from(PokemonCardsSchema)
  }

  async createPokemonCard(
    cardNumber: string,
    cardName: string,
    cardSet: PokemonCardSet,
    imageUrl: string | null
  ) {
    const pokemonCard = new PokemonCard(cardNumber, cardName, cardSet, imageUrl)

    await db
      .insert(PokemonCardsSchema)
      .values(pokemonCard)
      .onConflictDoNothing()
      .catch((error) => {
        console.error(error, pokemonCard)
      })

    return pokemonCard
  }

  bulkCreatePokemonCardsFromList(pokemonCards: PokemonCardResponseModel[]) {
    const pokemonCardPromises = pokemonCards.map(async (card) => {
      return this.createPokemonCard(
        card.cardNumber,
        card.cardName,
        card.cardSet,
        card.imageUrl
      )
    })

    return Promise.all(pokemonCardPromises)
  }
}
