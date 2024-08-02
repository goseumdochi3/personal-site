import { SoldItemInferType } from '../db/schemas/SoldItemsSchema'

class SoldItem implements SoldItemInferType {
  id: number
  title: string
  soldDate: Date
  price: string
  link: string
  itemTypeUUID: string

  constructor(
    title: string,
    soldDate: Date,
    price: string,
    link: string,
    itemTypeUUID: string
  ) {
    this.title = title
    this.soldDate = soldDate
    this.price = price
    this.link = link
    this.itemTypeUUID = itemTypeUUID
  }
}

export { SoldItem }
