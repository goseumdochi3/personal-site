import { ICommandHandler } from '../../cqrsInterfaces/ICommandHandler'
import { CreateUserCommand } from '../commands/CreateUserCommand'
import { UpdateUserCommand } from '../commands/UpdateUserCommand'
import { UserService } from '../services/UserService'

export class CreateUserCommandHandler
  implements ICommandHandler<CreateUserCommand>
{
  async handle(command: CreateUserCommand): Promise<void> {
    const userService = new UserService()
    await userService.createUser(
      command.firstName,
      command.lastName,
      command.email,
      command.password,
      command.role
    )
  }
}
