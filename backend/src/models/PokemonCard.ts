import { PokemonCardInferType } from '../db/schemas/PokemonCardSchema'
import { ExpansionSet } from './ExpansionSet'

class PokemonCard implements PokemonCardInferType {
  id: number
  cardNumber: number
  cardName: string
  imageLink: string
  expansionSet: ExpansionSet

  constructor(
    cardNumber: number,
    cardName: string,
    imageLink: string,
    expansionSet: ExpansionSet
  ) {
    this.cardNumber = cardNumber
    this.cardName = cardName
    this.imageLink = imageLink
    this.expansionSet = expansionSet
  }
}

export { PokemonCard }
