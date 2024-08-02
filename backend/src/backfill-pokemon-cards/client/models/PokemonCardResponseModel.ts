import { PokemonCardSet } from '../../../models/PokemonCardSets'

interface IPokemonCardResponseModel {
  cardNumber: string
  cardName: string
  cardSet: PokemonCardSet
  imageUrl: string | null
}

class PokemonCardResponseModel implements IPokemonCardResponseModel {
  constructor(
    readonly cardNumber: string,
    readonly cardName: string,
    readonly cardSet: PokemonCardSet,
    readonly imageUrl: string | null
  ) {}
}

export { PokemonCardResponseModel }
