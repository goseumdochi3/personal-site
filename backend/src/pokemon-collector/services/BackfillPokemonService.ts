import * as cheerio from 'cheerio'
import axios from 'axios'
import { PokemonCardService } from './PokemonCardService'
import { ExpansionSet } from '../../models/ExpansionSet'

const pokellectorBaseUrl = 'https://www.pokellector.com'

const buildPokellectorUrl = (set_name: string) => {
  return `${pokellectorBaseUrl}/${set_name.replace(' ', '-')}-Expansion/`
}

class PokemonCardResponseModel {
  cardNumber: number
  cardName: string
  imageUrl: string
  expansionSet: ExpansionSet

  constructor(
    cardNumber: number,
    cardName: string,
    imageUrl: string,
    expansionSet: ExpansionSet
  ) {
    this.cardNumber = cardNumber
    this.cardName = cardName
    this.imageUrl = imageUrl
    this.expansionSet = expansionSet
  }
}

const getPokemonCardsFromSet = async (set_name: ExpansionSet) => {
  const results: PokemonCardResponseModel[] = []
  const url = buildPokellectorUrl(set_name)
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)

  $('.cardlisting')
    .find('div.card')
    .each((_, el) => {
      const cardDetails = $(el).find('.plaque').text()
      const [numberString, ...nameParts] = cardDetails.split(' - ')
      const cardNumber = parseInt(numberString.replace('#', ''), 10)
      const cardName = nameParts.join(' ')
      const imageUrl = $(el).find('img').attr('data-src')

      results.push(
        new PokemonCardResponseModel(
          cardNumber,
          cardName,
          imageUrl || '',
          set_name
        )
      )
    })
  return results
}

const backfillPokemonCardList = async () => {
  const twilightMasqueradeSetList = await getPokemonCardsFromSet(
    ExpansionSet.TwilightMasquerade
  )

  const twilightMasqueradeCards =
    await new PokemonCardService().bulkCreatePokemonCardsFromList(
      twilightMasqueradeSetList
    )

  console.log(twilightMasqueradeCards)
}

export {
  getPokemonCardsFromSet,
  backfillPokemonCardList,
  PokemonCardResponseModel,
}
