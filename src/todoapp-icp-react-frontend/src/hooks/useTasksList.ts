import { useEffect, useState } from 'react';
import { ITask } from '../utils/types';
import { useSelectUser } from '../redux/hooks/selectHooks/useSelectUser';
import { Principal } from '@dfinity/principal';
import { useDfinityAgent } from './useDfinityAgent';
import { todoapp_icp_react_backend } from '../../../declarations/todoapp-icp-react-backend';

type UseTasksList = () => {
  tasks: ITask[];
  isLoading: boolean;
};

export const useTasksList: UseTasksList = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<ITask[]>([]);

  const actor = useDfinityAgent();

  const user = useSelectUser();

  const principalId = user?.principalId;

  const getTasksAndSet = async () => {
    try {
      setIsLoading(true);

      const userTasks: ITask[] = await todoapp_icp_react_backend.get_user_tasks();

      setTasks(userTasks);

      // if (principalId && actor) {
      //   const principal = Principal.fromText(principalId);

      //   // const userTasks: ITask[] = (await actor.get_user_tasks(
      //   //   principalId
      //   // )) as ITask[];

      //   setTasks(userTasks);
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getTasksAndSet();
  }, []);

  return {
    tasks,
    isLoading,
  };
};
