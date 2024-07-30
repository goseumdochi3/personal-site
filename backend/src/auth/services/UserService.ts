import bcrypt from 'bcrypt'
import { db } from '../../db/database'
import { User } from '../../models/user'
import { eq } from 'drizzle-orm'
import { Role } from '../../models/Role'
import { UsersSchema } from '../../db/schemas/UsersSchema'

export class UserService {
  async getUsers() {
    return db.select().from(UsersSchema)
  }

  async createUser(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role = Role.USER
  ) {
    const passwordHash = await this.generatePasswordHash(password)
    const user = new User(firstName, lastName, email, passwordHash, role)

    return db.insert(UsersSchema).values(user)
  }

  async updateUser(
    userId: number,
    firstName: string,
    lastName: string,
    email: string
  ): Promise<void> {
    await db
      .update(UsersSchema)
      .set({
        firstName,
        lastName,
        email,
      })
      .where(eq(UsersSchema.id, userId))
  }

  async generatePasswordHash(password: string) {
    return await bcrypt.hash(password, 10)
  }
}
