import express, { Request, Response } from 'express'
import { db } from '../../db/database'
import { UsersSchema } from '../../db/schemas/UsersSchema'
import { eq } from 'drizzle-orm'
import { CreateUserCommand } from '../commands/CreateUserCommand'
import { CreateUserCommandHandler } from '../commandHandlers/CreateUserCommandHandler'
import { GetUsersQuery } from '../queries/GetUsersQuery'
import { GetUsersQueryHandler } from '../queryHandlers/GetUsersQueryHandler'

class UserRouter {
  private userBasePath = '/users'
  router = express.Router()

  constructor() {
    this.initRoutes()
  }

  initRoutes() {
    this.router.get(this.userBasePath, this.getUsers)
    this.router.get(`${this.userBasePath}/:userId`, this.getUserById)
    this.router.post(this.userBasePath, this.createUser)
    this.router.patch(`${this.userBasePath}/:userId`, this.updateUser)
    this.router.delete(`${this.userBasePath}/:userId`, this.deleteUser)
  }

  getUsers = async (request: Request, response: Response) => {
    const query = new GetUsersQuery()
    const queryHandler = new GetUsersQueryHandler()
    const result = await queryHandler.handle(query)

    response.status(200).send(result)
  }

  getUserById = async (request: Request, response: Response) => {
    const userId = parseInt(request.params.userId, 10)
    if (isNaN(userId)) {
      response.status(400).send('Invalid user ID')
      return
    }
    const result = db
      .select()
      .from(UsersSchema)
      .where(eq(UsersSchema.id, userId))

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
    const result = await db
      .update(UsersSchema)
      .set({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
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
    const result = await db
      .delete(UsersSchema)
      .where(eq(UsersSchema.id, userId))

    response.status(200).send(result)
  }
}

export { UserRouter }
