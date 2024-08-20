class PokemonCardSalesData {
  id: number
  title: string
  soldDate: Date
  price: string
  link: string
  itemTypeUUID: string

  constructor(
    id: number,
    title: string,
    soldDate: Date,
    price: string,
    link: string,
    itemTypeUUID: string
  ) {
    this.id = id
    this.title = title
    this.soldDate = soldDate
    this.price = price
    this.link = link
    this.itemTypeUUID = itemTypeUUID
  }
}

export { PokemonCardSalesData }
