import { IQueryHandler } from '../../cqrsInterfaces/IQueryHandler'
import { Role } from '../../models/Role'
import { GetUsersQuery } from '../queries/GetUsersQuery'
import { GetUsersQueryResponse } from '../queries/responseModels/GetUsersQueryResponse'
import { UserService } from '../services/UserService'

export class GetUsersQueryHandler implements IQueryHandler<GetUsersQuery> {
  async handle(query: GetUsersQuery): Promise<GetUsersQueryResponse> {
    const userService = new UserService()
    const users = await userService.getUsers()

    const transformedUsers = users.map((user) => ({
      id: user.id.toString(),
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      role: (user.role as Role) || Role.USER,
    }))

    const response = new GetUsersQueryResponse(transformedUsers)
    return response
  }
}
