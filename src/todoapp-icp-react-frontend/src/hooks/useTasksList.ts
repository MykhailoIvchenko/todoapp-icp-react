import { useCallback, useEffect, useState } from 'react';
import { ITask } from '../utils/types';
import { useSelectUser } from '../redux/hooks/selectHooks/useSelectUser';
import { useDfinityAgent } from './useDfinityAgent';
import { toast } from 'react-toastify';
import { TaskStatus } from '../utils/enums';

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
      if (principalId && actor) {
        let userTasks: ITask[] = (await actor.get_user_tasks()) as ITask[];

        userTasks.sort(
          (prev, next) => Number(next.createdAt) - Number(prev.createdAt)
        );

        setTasks(userTasks);
      }
    } catch (error) {
      console.log(error);
      toast.error('An error occured during the tasks list retreiving');
    } finally {
      setIsLoading(false);
    }
  };

  const createTask = useCallback(
    async (title: string, description: string) => {
      try {
        const currentTime = Date.now();

        setTasks((prev) => [
          {
            taskId: currentTime as unknown as bigint,
            title,
            description,
            username: '',
            status: { [TaskStatus.NotCompleted]: null },
            createdAt: currentTime as unknown as bigint,
          },
          ...prev,
        ]);

        await actor?.create_task(
          title,
          description,
          user?.username || 'Uknown'
        );

        toast.success('Congratulations! The task was created');
        await getTasksAndSet();
      } catch (error) {
        toast.error('Something went wrong during the task creation');
      }
    },
    [actor]
  );

  const deleteTask = useCallback(
    async (id: bigint) => {
      try {
        setTasks((prev) => prev.filter((task) => task.taskId !== id));

        await actor?.delete_task(id);

        toast.info('The task was deleted');
        await getTasksAndSet();
      } catch (error) {
        console.log(error);
        toast.error('Something went wrong during the task deletion');
      }
    },
    [actor]
  );

  useEffect(() => {
    setIsLoading(true);

    if (actor) {
      getTasksAndSet();
    }
  }, [actor]);

  return {
    tasks,
    isLoading,
    createTask,
    deleteTask,
  };
};
