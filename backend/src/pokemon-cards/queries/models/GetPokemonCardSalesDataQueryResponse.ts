interface PokemonCardSalesData {
  id: number
  title: string
  soldDate: Date
  price: string
  link: string
  itemTypeUUID: string
}

export class GetPokemonCardSalesDataQueryResponse {
  pokemonCardSalesData: PokemonCardSalesData[]

  constructor(pokemonCardSalesData: PokemonCardSalesData[]) {
    this.pokemonCardSalesData = pokemonCardSalesData.map((pokemonCard) => ({
      id: pokemonCard.id,
      title: pokemonCard.title,
      soldDate: pokemonCard.soldDate,
      price: pokemonCard.price,
      link: pokemonCard.link,
      itemTypeUUID: pokemonCard.itemTypeUUID,
    }))
  }
}
