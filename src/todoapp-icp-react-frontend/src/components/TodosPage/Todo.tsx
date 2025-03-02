import React from 'react';
import { TaskStatus } from '../../utils/enums';

interface ITodoProps {
  id: bigint;
  title: string;
  description: string;
  status: TaskStatus;
}

const Todo: React.FC<ITodoProps> = ({ id, title, description, status }) => {
  const handleDelete = async () => {};

  return (
    <div className='todo'>
      <label className='todo__status-label' title={'Make completed'}>
        <input
          type='checkbox'
          className='todo__status'
          checked={status === TaskStatus.Completed}
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

export default Todo;
