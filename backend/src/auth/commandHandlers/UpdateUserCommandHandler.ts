import { ICommandHandler } from '../../commandInterfaces/ICommandHandler'
import { UpdateUserCommand } from '../commands/UpdateUserCommand'
import { UserService } from '../services/UserService'

export class UpdateUserCommandHandler
  implements ICommandHandler<UpdateUserCommand>
{
  async handle(command: UpdateUserCommand): Promise<void> {
    const userService = new UserService()
    await userService.updateUser(
      command.userId,
      command.firstName,
      command.lastName,
      command.email
    )
  }
}
