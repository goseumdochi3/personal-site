class PokemonCard {
  uuid: string
  cardNumber: string
  cardName: string
  cardSet: string
  cardType: string
  imageLink: string | null

  constructor(
    uuid: string,
    cardNumber: string,
    cardName: string,
    cardSet: string,
    cardType: string,
    imageLink: string | null
  ) {
    this.uuid = uuid
    this.cardNumber = cardNumber
    this.cardName = cardName
    this.cardSet = cardSet
    this.cardType = cardType
    this.imageLink = imageLink
  }
}

export { PokemonCard }
