import { useCallback, useEffect, useState } from 'react';
import { ITask } from '../utils/types';
import { useSelectUser } from '../redux/hooks/selectHooks/useSelectUser';
import { Principal } from '@dfinity/principal';
import { useDfinityAgent } from './useDfinityAgent';
import { todoapp_icp_react_backend } from '../../../declarations/todoapp-icp-react-backend';
import { toast } from 'react-toastify';

type UseTasksList = () => {
  tasks: ITask[];
  isLoading: boolean;
  createTask: (title: string, description: string) => Promise<void>;
  deleteTask: (id: bigint) => Promise<void>;
};

export const useTasksList: UseTasksList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const actor = useDfinityAgent();

  const user = useSelectUser();

  const principalId = user?.principalId;

  const getTasksAndSet = async () => {
    try {
      const userTasks: ITask[] =
        await todoapp_icp_react_backend.get_user_tasks();

      setTasks(userTasks);

      // if (principalId && actor) {
      //   const userTasks: ITask[] = (await actor.get_user_tasks()) as ITask[];

      //   setTasks(userTasks);
      // }
    } catch (error) {
      toast.error('An error occured during the tasks list retreiving');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = useCallback(async (title: string, description: string) => {
    try {
      // await actor?.create_task(title, description);
      await todoapp_icp_react_backend.create_task(title, description);

      toast.success('Congratulations! The task was created');
      await getTasksAndSet();
    } catch {
      toast.error('Something went wrong during the task creation');
    }
  }, []);

  const deleteTask = useCallback(async (id: bigint) => {
    try {
      // await actor?.delete_task(id);
      await todoapp_icp_react_backend.delete_task(id);

      toast.info('The task was deleted');
      await getTasksAndSet();
    } catch {
      toast.error('Something went wrong during the task deletion');
    }
  }, []);

  useEffect(() => {
    setIsLoading(true);

    getTasksAndSet();
  }, []);

  return {
    tasks,
    isLoading,
    createTask,
    deleteTask,
  };
};
