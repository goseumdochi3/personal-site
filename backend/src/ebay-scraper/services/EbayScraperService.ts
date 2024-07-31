import * as cheerio from 'cheerio'
import axios from 'axios'

const ebayBaseUrl = 'https://www.ebay.com/sch/i.html'

const buildItemLastSoldUrl = (
  set_name: string,
  card_name: string,
  card_set_number: number,
  cards_in_set: number,
  items_per_page: number = 240,
  page: number = 1
) => {
  const set_name_encoded = encodeURIComponent(set_name)
  const card_title_encoded = encodeURIComponent(card_name)
  const formatted_card_set_number = card_set_number.toString().padStart(3, '0')
  return `${ebayBaseUrl}?_nkw=${set_name_encoded}+${card_title_encoded}+${formatted_card_set_number}%2F${cards_in_set}&_sacat=0&rt=nc&LH_Sold=1&LH_Complete=1&_ipg=${items_per_page}&_pgn=${page}`
}

const getLastSoldData = async (
  set_name: string,
  card_name: string,
  card_set_number: number,
  cards_in_set: number
) => {
  const results: any[] = []
  const url = buildItemLastSoldUrl(
    set_name,
    card_name,
    card_set_number,
    cards_in_set
  )
  const { data } = await axios.get(url)
  const $ = cheerio.load(data)
  const numResults = parseInt(
    $('.srp-controls__count-heading').text().split(' ')[0]
  )

  $('.srp-results')
    .find('.s-item')
    .each((index, el) => {
      if (index >= numResults) {
        return false
      }
      const title = $(el).find('.s-item__title').text()
      const soldDate = $(el).find('.s-item__caption').text()
      const link = $(el).find('.s-item__link').attr('href')
      const price = $(el).find('.s-item__price').text()
      results.push({ title, soldDate, link, price })
    })
  return cleanResults(results, card_name)
}

const cleanResults = (results: any[], card_name: string) => {
  const cardNameLower = card_name.trim().toLowerCase()
  return results.filter((result) => {
    const titleLower = result.title.trim().toLowerCase()
    return titleLower.includes(cardNameLower)
  })
}

export { buildItemLastSoldUrl, getLastSoldData }
