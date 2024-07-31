import { Role } from '../../../models/Role'
import { User } from '../../../models/user'

interface UsersResponse {
  id: string
  firstName: string
  lastName: string
  email: string
  role: Role
}

export class GetUsersQueryResponse {
  users: UsersResponse[]

  constructor(users: User[]) {
    this.users = users.map((user) => ({
      id: user.id.toString(),
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }))
  }
}
