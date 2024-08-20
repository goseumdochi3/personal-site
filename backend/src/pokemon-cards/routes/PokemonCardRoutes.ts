import express, { Request, Response } from 'express'
import { GetAllPokemonCardsQuery } from 'pokemon-cards/queries/GetAllPokemonCardsQuery'
import { GetPokemonCardSalesDataQuery } from 'pokemon-cards/queries/GetPokemonCardSalesData'
import { GetAllPokemonCardsQueryHandler } from 'pokemon-cards/queries/handlers/GetAllPokemonCardsQueryHandler'
import { GetPokemonCardSalesDataQueryHandler } from 'pokemon-cards/queries/handlers/GetPokemonCardSalesDataQueryHandler'

export default class PokemonCardRoutes {
  private pokemonCardBasePath = '/pokemon-cards'
  router = express.Router()

  constructor() {
    this.initRoutes()
  }

  initRoutes() {
    return [
      this.router.get(`${this.pokemonCardBasePath}`, this.getAllPokemonCards),
      this.router.get(
        `${this.pokemonCardBasePath}/:expansion/:cardNumber`,
        this.getPokemonCardSalesData
      ),
    ]
  }

  getAllPokemonCards = async (request: Request, response: Response) => {
    const query = new GetAllPokemonCardsQuery()
    const queryHandler = new GetAllPokemonCardsQueryHandler()

    const result = await queryHandler.handle(query)

    response.status(200).send(result)
  }

  getPokemonCardSalesData = async (request: Request, response: Response) => {
    const { expansion, cardNumber } = request.params
    const query = new GetPokemonCardSalesDataQuery(expansion, cardNumber)
    const queryHandler = new GetPokemonCardSalesDataQueryHandler()

    const result = await queryHandler.handle(query)

    response.status(200).send(result)
  }
}

export { PokemonCardRoutes }
