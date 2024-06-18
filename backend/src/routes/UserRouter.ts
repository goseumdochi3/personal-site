import express, { Request, Response } from 'express'

import db from '../mongodb/mongo-client.js'

import { ObjectId } from 'mongodb'

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
    const collection = db.collection('users')
    const results = await collection.find().toArray()

    response.status(200).send(results)
  }

  getUserById = async (request: Request, response: Response) => {
    const collection = db.collection('users')
    const query = { _id: new ObjectId(request.params.userId) }
    const result = await collection.findOne(query)

    if (!result) {
      response.status(404).send('User not found')
    } else {
      response.status(200).send(result)
    }
  }

  createUser = async (request: Request, response: Response) => {
    const user = new User(
      request.body.firstName,
      request.body.lastName,
      request.body.email,
      request.body.password,
      request.body.role
    )
    const collection = db.collection('users')
    const result = await collection.insertOne(user)

    response.status(201).send(result)
  }

  updateUser = async (request: Request, response: Response) => {
    const query = { _id: new ObjectId(request.params.userId) }
    const updates = {
      $set: {
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
      },
    }
    const collection = db.collection('users')
    const result = await collection.updateOne(query, updates)

    if (result.matchedCount === 0) {
      response.status(404).send('User not found')
    } else {
      response.status(200).send(result)
    }
  }

  deleteUser = async (request: Request, response: Response) => {
    const query = { _id: new ObjectId(request.params.userId) }
    const collection = db.collection('users')
    const result = await collection.deleteOne(query)

    if (result.deletedCount === 0) {
      response.status(404).send('User not found')
    } else {
      response.status(200).send(result)
    }
  }
}

export { UserRouter }
