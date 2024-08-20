import { IQueryHandler } from 'cqrsInterfaces/IQueryHandler'
import { PokemonCardService } from '../../../pokemon-cards/services/PokemonCardService'
import { GetAllPokemonCardsQuery } from '../GetAllPokemonCardsQuery'
import { GetAllPokemonCardsQueryResponse } from '../models/GetAllPokemonCardsQueryResponse'

export class GetAllPokemonCardsQueryHandler
  implements IQueryHandler<GetAllPokemonCardsQuery>
{
  async handle(
    query: GetAllPokemonCardsQuery
  ): Promise<GetAllPokemonCardsQueryResponse> {
    const pokemonCardService = new PokemonCardService()
    const pokemonCards = await pokemonCardService.getAllPokemonCards()

    const transformedPokemonCards = pokemonCards.map((pokemonCard) => ({
      uuid: pokemonCard.uuid,
      cardNumber: pokemonCard.cardNumber,
      cardName: pokemonCard.cardName,
      cardSet: pokemonCard.cardSet,
      imageLink: pokemonCard.imageLink,
    }))

    const response = new GetAllPokemonCardsQueryResponse(
      transformedPokemonCards
    )
    return response
  }
}
