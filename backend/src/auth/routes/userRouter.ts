import express, { Request, Response } from 'express'
import { db } from '../../db'
import { UsersSchema } from '../../db/schemas/usersSchema'
import { eq } from 'drizzle-orm'
import { CreateUserCommand } from '../commands/CreateUserCommand'
import { CreateUserCommandHandler } from '../commandHandlers/CreateUserCommandHandler'

class UserRouter {
  router = express.Router()

  constructor() {
    this.initRoutes()
  }

  initRoutes() {
    this.router.get('/', this.getAllUsers)
    this.router.get('/:userId', this.getUserById)
    this.router.post('/', this.createUser)
    this.router.patch('/:userId', this.updateUser)
    this.router.delete('/:userId', this.deleteUser)
  }

  getAllUsers = async (request: Request, response: Response) => {
    const results = db.select().from(UsersSchema)

    response.status(200).send(results)
  }

  getUserById = async (request: Request, response: Response) => {
    const userId = parseInt(request.params.userId, 10)
    if (isNaN(userId)) {
      response.status(400).send('Invalid user ID')
      return
    }
    const result = db.select().from(UsersSchema).where(eq(UsersSchema.id, userId))

    if (!result) {
      response.status(404).send('User not found')
    } else {
      response.status(200).send(result)
    }
  }

  createUser = async (request: Request, response: Response) => {
    const command = new CreateUserCommand(
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      request.body.password,
      request.body.role
    )
    const commandHandler = new CreateUserCommandHandler()
    const result = await commandHandler.handle(command)
    
    response.status(201).send(result)
  }

  updateUser = async (request: Request, response: Response) => {
    const userId = parseInt(request.params.userId, 10)
    if (isNaN(userId)) {
      response.status(400).send('Invalid user ID')
      return
    }
    const result = await db.update(UsersSchema).set({
      firstName: request.body.firstName,
      lastName: request.body.lastName,
        email: request.body.email
      })
      .where(eq(UsersSchema.id, userId))

    response.status(200).send(result)
  }

  deleteUser = async (request: Request, response: Response) => {
    const userId = parseInt(request.params.userId, 10)
    if (isNaN(userId)) {
      response.status(400).send('Invalid user ID')
      return
    }
    const result = await db.delete(UsersSchema).where(eq(UsersSchema.id, userId))

    response.status(200).send(result)
  }
}

export { UserRouter }
