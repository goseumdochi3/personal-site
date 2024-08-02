import * as cheerio from 'cheerio'
import axios from 'axios'
import { SoldItemResponseModel } from './models/SoldItemResponseModel'

const ebayBaseUrl = 'https://www.ebay.com/sch/i.html'

const buildItemLastSoldUrl = (
  set_name: string,
  card_name: string,
  card_set_number: string,
  items_per_page: number = 240,
  page: number = 1
) => {
  const formatted_card_set_number = card_set_number.padStart(3, '0')
  const params = new URLSearchParams({
    _nkw: `${set_name} ${card_name} ${formatted_card_set_number}`,
    _sacat: '0',
    rt: 'nc',
    LH_Sold: '1',
    LH_Complete: '1',
    _ipg: items_per_page.toString(),
    _pgn: page.toString(),
  })
  return `${ebayBaseUrl}?${params.toString()}`
}

const getLastSoldData = async (
  set_name: string,
  card_name: string,
  card_set_number: string
) => {
  const result: SoldItemResponseModel[] = []
  let page = 1

  while (true) {
    const url = buildItemLastSoldUrl(
      set_name,
      card_name,
      card_set_number,
      240,
      page
    )
    const { data } = await axios.get(url)
    const $ = cheerio.load(data)
    result.push(...parseLastSoldData($, card_name))

    const nextPageButton = $('.pagination__next')
    if (
      nextPageButton.length === 0 ||
      nextPageButton.attr('aria-disabled') === 'true'
    ) {
      break
    }
    page++
  }

  return result
}

const parseLastSoldData = ($: any, card_name: string) => {
  let results: SoldItemResponseModel[] = []
  const numResults = parseInt(
    $('.srp-controls__count-heading').text().split(' ')[0]
  )

  $('.srp-results')
    .find('.s-item')
    .each((index: number, el: cheerio.Element) => {
      if (index >= numResults) {
        return false
      }
      const title = $(el).find('.s-item__title').text()
      const soldDate = new Date(
        $(el).find('.s-item__caption').text().replace('Sold ', '')
      )
      const link = $(el).find('.s-item__link').attr('href')
      const price = $(el).find('.s-item__price').text().replace('$', '')

      if (!validateData(card_name, title, link)) {
        return
      }

      const soldItem = new SoldItemResponseModel(title, soldDate, link!, price)

      results.push(soldItem)
    })
  return results
}

const validateData = (
  card_name: string,
  title: string,
  link: string | undefined
) => {
  const cardNameLower = card_name.trim().toLowerCase()
  return title.trim().toLowerCase().includes(cardNameLower) && link
}

export { getLastSoldData }
