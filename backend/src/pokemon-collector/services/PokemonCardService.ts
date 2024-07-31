import { db } from '../../db/database'
import { PokemonCardsSchema } from '../../db/schemas/PokemonCardSchema'
import { ExpansionSet } from '../../models/ExpansionSet'
import { PokemonCard } from '../../models/PokemonCard'
import { PokemonCardResponseModel } from './BackfillPokemonService'

export class PokemonCardService {
  async getPokemonCards() {
    return db.select().from(PokemonCardsSchema)
  }

  async createPokemonCard(
    cardNumber: number,
    cardName: string,
    imageUrl: string,
    expansionSet: ExpansionSet
  ) {
    const pokemonCard = new PokemonCard(
      cardNumber,
      cardName,
      imageUrl,
      expansionSet
    )

    return db.insert(PokemonCardsSchema).values(pokemonCard)
  }

  async bulkCreatePokemonCardsFromList(
    pokemonCards: PokemonCardResponseModel[]
  ) {
    const pokemonCardPromises = pokemonCards.map(async (card) => {
      return this.createPokemonCard(
        card.cardNumber,
        card.cardName,
        card.imageUrl,
        card.expansionSet
      )
    })

    return Promise.all(pokemonCardPromises)
  }
}
