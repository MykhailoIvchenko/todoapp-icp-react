import { ReactNode } from 'react';

export interface IUser {
  username?: string;
  principalId?: string;
}

export interface ITaskUpdatableData {
  title: string;
  description: string;
}

export interface ITask extends ITaskUpdatableData {
  createdAt: bigint;
  taskId: bigint;
  username: string;
  status: Record<string, any>;
}

export type ReactChildren = ReactNode | ReactNode[];
