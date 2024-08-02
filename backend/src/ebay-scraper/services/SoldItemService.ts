import { db } from '../../db/database'
import { SoldItemsSchema } from '../../db/schemas/SoldItemsSchema'
import { SoldItem } from '../../models/SoldItem'

const getSoldItems = () => {
  return db.select().from(SoldItemsSchema)
}

const createSoldItem = async (
  title: string,
  soldDate: Date,
  price: string,
  link: string,
  itemTypeUUID: string
) => {
  const soldItem = new SoldItem(title, soldDate, price, link, itemTypeUUID)

  await db
    .insert(SoldItemsSchema)
    .values(soldItem)
    .onConflictDoNothing()
    .catch((error) => {
      console.error(error)
    })

  return soldItem
}

export { getSoldItems, createSoldItem }
