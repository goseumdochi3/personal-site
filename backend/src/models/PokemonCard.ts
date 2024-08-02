import { PokemonCardInferType } from '../db/schemas/PokemonCardSchema'
import { PokemonCardSet } from './PokemonCardSets'
import { v4 as uuid } from 'uuid'

class PokemonCard implements PokemonCardInferType {
  uuid: string
  cardNumber: string
  cardName: string
  cardSet: PokemonCardSet
  imageLink: string | null

  constructor(
    cardNumber: string,
    cardName: string,
    cardSet: PokemonCardSet,
    imageLink: string | null
  ) {
    this.uuid = uuid()
    this.cardNumber = cardNumber
    this.cardName = cardName
    this.cardSet = cardSet
    this.imageLink = imageLink
  }
}

export { PokemonCard }
