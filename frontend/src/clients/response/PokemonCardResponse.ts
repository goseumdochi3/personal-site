import { PokemonCard } from '../../models/PokemonCard'

interface GetAllPokemonCardsResponse {
  readonly pokemonCards: PokemonCard[]
}

export type { GetAllPokemonCardsResponse }
