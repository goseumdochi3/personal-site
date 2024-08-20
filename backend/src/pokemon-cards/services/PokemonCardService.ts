import { PokemonCardsSchema } from 'db/schemas/PokemonCardSchema'
import { PokemonCard } from 'models/PokemonCard'
import { PokemonCardSet } from 'models/PokemonCardSets'
import { db } from '../../db/database'

export class PokemonCardService {
  async getAllPokemonCards() {
    return db.select().from(PokemonCardsSchema)
  }

  async createPokemonCard(
    cardNumber: string,
    cardName: string,
    cardSet: PokemonCardSet,
    imageLink: string
  ) {
    const pokemonCard = new PokemonCard(
      cardNumber,
      cardName,
      cardSet,
      imageLink
    )

    return db.insert(PokemonCardsSchema).values(pokemonCard)
  }
}
