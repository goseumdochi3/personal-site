import { User } from '../models/User'
import { UserResponse } from './response/UserResponse'

class UserClient {
  async getUsers(): Promise<User[]> {
    const response = await fetch(`${import.meta.env.VITE_BASE_URL}/users`)
    const data: UserResponse = await response.json()

    return data.users.map((user: User) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    }))
  }
}

export { UserClient }
