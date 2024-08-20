import { IQuery } from '../../cqrsInterfaces/IQuery'

export class GetPokemonCardSalesDataQuery implements IQuery {
  constructor(
    public readonly expansion: string,
    public readonly cardNumber: string
  ) {}
}
