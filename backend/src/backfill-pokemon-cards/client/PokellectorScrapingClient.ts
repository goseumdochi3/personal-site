import * as cheerio from 'cheerio'
import axios from 'axios'
import {
  CollectionSet,
  ExpansionSet,
  PokemonCardSet,
  collectionSets,
  expansionSets,
} from '../../models/PokemonCardSets'
import { PokemonCardResponseModel } from './models/PokemonCardResponseModel'

const pokellectorBaseUrl = 'https://www.pokellector.com'

const buildPokellectorUrl = (setName: PokemonCardSet) => {
  let setType = ''
  if (expansionSets.includes(setName as ExpansionSet)) {
    setType = 'Expansion'
  } else if (collectionSets.includes(setName as CollectionSet)) {
    setType = 'Collection'
  }

  return `${pokellectorBaseUrl}/${setName.replace(/ /g, '-')}-${setType}/`
}

const getPokemonCardsFromSet = async (setName: PokemonCardSet) => {
  const url = buildPokellectorUrl(setName)
  const { data } = await axios.get(url)

  return parsePokemonCardsFromSiteData(data, setName)
}

const parsePokemonCardsFromSiteData = (data: any, setName: PokemonCardSet) => {
  const results: PokemonCardResponseModel[] = []
  const $ = cheerio.load(data)

  $('.cardlisting')
    .find('div.card')
    .each((_, el) => {
      const cardDetails = $(el).find('.plaque').text()
      const { cardNumber, cardName } = parseCardDetails(cardDetails)
      const imageUrl = $(el).find('img').attr('data-src')

      results.push(
        new PokemonCardResponseModel(
          cardNumber,
          cardName,
          setName,
          imageUrl || ''
        )
      )
    })

  return results
}

const parseCardDetails = (cardDetails: string) => {
  if (cardDetails.includes('-')) {
    const [numberString, ...nameParts] = cardDetails.split(' - ')
    return {
      cardNumber: numberString.replace('#', ''),
      cardName: nameParts.join(' '),
    }
  } else {
    return {
      cardNumber: '',
      cardName: cardDetails,
    }
  }
}

export { getPokemonCardsFromSet }
