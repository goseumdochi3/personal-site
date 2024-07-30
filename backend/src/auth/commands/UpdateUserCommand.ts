import { ICommand } from '../../cqrsInterfaces/ICommand'

export class UpdateUserCommand implements ICommand {
  constructor(
    public readonly userId: number,
    public readonly firstName: string,
    public readonly lastName: string,
    public readonly email: string
  ) {}
}
