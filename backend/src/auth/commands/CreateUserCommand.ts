import { ICommand } from "../../commandInterfaces/ICommand"

export class CreateUserCommand implements ICommand {
    constructor(
        public readonly firstName: string,
        public readonly lastName: string,
        public readonly email: string,
        public readonly password: string,
        public readonly role: string
    ) {}
}
