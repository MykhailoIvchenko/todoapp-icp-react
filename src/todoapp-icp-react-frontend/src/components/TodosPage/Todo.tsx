import React, { memo, useState } from 'react';
import { TaskStatus } from '../../utils/enums';
import { toast } from 'react-toastify';
import clsx from 'clsx';

interface ITodoProps {
  id: bigint;
  title: string;
  description: string;
  status: TaskStatus;
  deleteTask: (id: bigint) => Promise<void>;
}

const TodoComponent: React.FC<ITodoProps> = ({
  id,
  title,
  description,
  status,
  deleteTask,
}) => {
  const [taskStatus, setTaskStatus] = useState<TaskStatus>(status);

  const handleDelete = async () => {
    await deleteTask(id);
  };

  const handleComplete = async () => {
    setTaskStatus(TaskStatus.Completed);

    toast.info(
      "Congratulations! You've completed the task and it would be deleted"
    );

    setTimeout(() => {
      deleteTask(id);
    }, 1000);
  };

  return (
    <div
      className={clsx('todo', {
        completed: taskStatus === TaskStatus.Completed,
      })}
    >
      <label className='todo__status-label' title={'Make completed'}>
        <input
          type='checkbox'
          className='todo__status'
          checked={taskStatus === TaskStatus.Completed}
          onChange={handleComplete}
        />
      </label>

      <div className='todo__text'>
        <span className='todo__title'>{title}</span>

        <span className='todo__description'>{description}</span>
      </div>
      <button type='button' className='todo__remove' onClick={handleDelete}>
        ×
      </button>
    </div>
  );
};

const Todo = memo(TodoComponent);
export default Todo;
