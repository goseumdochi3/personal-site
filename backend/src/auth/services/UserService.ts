import bcrypt from 'bcrypt'
import { db } from '../../db'
import { User } from '../../models/user'
import { UsersSchema } from '../../db/schemas/usersSchema'
import { eq } from 'drizzle-orm';

export class UserService {
    async createUser(firstName: string, lastName: string, email: string, password: string, role: string) {
        const passwordHash = await this.generatePasswordHash(password)
        const user = new User(firstName, lastName, email, passwordHash, role)
        
        return db.insert(UsersSchema).values(user)
    }

    async updateUser(userId: number, firstName: string, lastName: string, email: string): Promise<void> {
        await db.update(UsersSchema).set({
      firstName,
      lastName,
      email
    }).where(eq(UsersSchema.id, userId));
  }

  async generatePasswordHash(password: string) {
    return await bcrypt.hash(password, 10)
  }
}