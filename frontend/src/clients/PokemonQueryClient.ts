import { useQuery } from 'react-query'
import { GetAllPokemonCardsResponse } from './response/PokemonCardResponse'
import { GetPokemonCardSalesDataResponse } from './response/PokemonCardSalesDataResponse'

const BASE_URL = 'http://localhost:5050'
const API_URL = `${BASE_URL}/pokemon-cards`

const getAllPokemonCards = async () => {
  const response = await fetch(API_URL)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

const getPokemonCardSalesData = async (
  expansion: string | undefined,
  cardNumber: string | undefined
) => {
  const response = await fetch(`${API_URL}/${expansion}/${cardNumber}`)
  if (!response.ok) {
    throw new Error('Network response was not ok')
  }

  return response.json()
}

export const useGetAllPokemonCards = () => {
  return useQuery<GetAllPokemonCardsResponse>(
    'getAllPokemonCards',
    getAllPokemonCards
  )
}

export const useGetPokemonCardSalesData = (
  expansion: string | undefined,
  cardNumber: string | undefined
) => {
  return useQuery<GetPokemonCardSalesDataResponse>(
    'getPokemonCardSalesData',
    () => getPokemonCardSalesData(expansion, cardNumber)
  )
}
