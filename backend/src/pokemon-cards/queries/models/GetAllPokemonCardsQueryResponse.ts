import { PokemonCard } from 'models/PokemonCard'
import { PokemonCardSet } from 'models/PokemonCardSets'

interface PokemonCardsResponse {
  uuid: string
  cardNumber: string
  cardName: string
  cardSet: PokemonCardSet
  imageLink: string | null
}

export class GetAllPokemonCardsQueryResponse {
  pokemonCards: PokemonCardsResponse[]

  constructor(pokemonCards: PokemonCard[]) {
    this.pokemonCards = pokemonCards.map((pokemonCard) => ({
      uuid: pokemonCard.uuid,
      cardNumber: pokemonCard.cardNumber,
      cardName: pokemonCard.cardName,
      cardSet: pokemonCard.cardSet,
      imageLink: pokemonCard.imageLink,
    }))
  }
}
