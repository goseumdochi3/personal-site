interface ISoldItemResponseModel {
  title: string
  soldDate: Date
  link: string
  price: string
}

class SoldItemResponseModel implements ISoldItemResponseModel {
  constructor(
    readonly title: string,
    readonly soldDate: Date,
    readonly link: string,
    readonly price: string
  ) {}
}

export { SoldItemResponseModel }
