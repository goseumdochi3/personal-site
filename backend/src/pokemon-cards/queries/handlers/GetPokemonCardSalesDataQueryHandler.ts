import { IQueryHandler } from 'cqrsInterfaces/IQueryHandler'
import { SalesDataService } from 'pokemon-cards/services/PokemonCardSalesService'
import { GetPokemonCardSalesDataQuery } from '../GetPokemonCardSalesData'
import { GetPokemonCardSalesDataQueryResponse } from '../models/GetPokemonCardSalesDataQueryResponse'

export class GetPokemonCardSalesDataQueryHandler
  implements IQueryHandler<GetPokemonCardSalesDataQuery>
{
  async handle(
    query: GetPokemonCardSalesDataQuery
  ): Promise<GetPokemonCardSalesDataQueryResponse> {
    const salesDataService = new SalesDataService()
    const pokemonCardSalesData = await salesDataService.getPokemonCardSalesData(
      query.expansion,
      query.cardNumber
    )

    const transformedPokemonCards = pokemonCardSalesData.map((pokemonCard) => ({
      id: pokemonCard.id,
      title: pokemonCard.title,
      soldDate: pokemonCard.soldDate,
      price: pokemonCard.price,
      itemTypeUUID: pokemonCard.itemTypeUUID,
      link: pokemonCard.link,
    }))

    const response = new GetPokemonCardSalesDataQueryResponse(
      transformedPokemonCards
    )
    return response
  }
}
