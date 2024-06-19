import { UserInferType } from "../db/schemas/usersSchema"
import { Role } from "./role"

class User implements UserInferType{
  id: number
  firstName: string
  lastName: string
  email: string
  password: string
  role: Role

  constructor(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    role: Role = Role.USER
  ) {
    this.firstName = firstName
    this.lastName = lastName
    this.email = email
    this.password = password
    this.role = role
  }
}

export { User }