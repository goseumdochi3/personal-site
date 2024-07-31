import { IQueryResponse } from './IQueryResponse'

export interface IQueryHandler<TQuery> {
  handle(query: TQuery): Promise<IQueryResponse<TQuery>>
}
