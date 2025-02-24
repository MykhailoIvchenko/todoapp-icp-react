import React from 'react';
import { TaskStatus } from '../../utils/enums';

interface ITodoProps {
  title: string;
  description: string;
  status: TaskStatus;
}

const Todo: React.FC<ITodoProps> = ({ title, description, status }) => {
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
      <button type='button' className='todo__remove'>
        ×
      </button>

      <div className='modal overlay'>
        <div className='modal-background has-background-white-ter' />
        <div className='loader' />
      </div>
    </div>
  );
};

export default Todo;
