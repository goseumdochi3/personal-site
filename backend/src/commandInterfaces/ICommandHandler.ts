import { ICommandResponse } from "./ICommandResponse";

export interface ICommandHandler<TCommand> {
    handle(command: TCommand): Promise<ICommandResponse | void>;
  }