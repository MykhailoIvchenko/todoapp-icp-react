import { TaskStatus } from './enums';

export interface IUser {
  username?: string;
  principalId?: string;
}

export interface ITaskUpdatableData {
  title: string;
  description: string;
}

export interface ITask extends ITaskUpdatableData {
  status: TaskStatus;
}
