import { useCallback, useState } from 'react';
import { useSelectUser } from '../../redux/hooks/selectHooks/useSelectUser';
import { TaskStatus } from '../../utils/enums';
import Button from '../ui/Button';
import Todo from './Todo';
import AddTodoForm from '../AddTodoForm';
import Modal from '../ui/Modal';
import { useTasksList } from '../../hooks/useTasksList';
import Loader from '../ui/Loader';

const TodosPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const openModal = () => {
    setShowAddModal(true);
  };

  const closeModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const user = useSelectUser();

  const { tasks, isLoading, createTask, deleteTask } = useTasksList();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='todos-list'>
      <h1 className='todos-list__title'>{user?.username || 'Anonymous'}</h1>

      <div className='todos-list__content'>
        <header className='todos-list__header'>
          <span className='todos-list__list-title'>What needs to be done?</span>

          <Button text='Add' onClick={openModal} />
        </header>

        <section className='todos-list__main'>
          {tasks.map((task, i) => (
            <Todo
              key={task.taskId}
              id={task.taskId}
              title={task.title}
              description={task.description}
              status={
                task.status.notCompleted === null
                  ? TaskStatus.NotCompleted
                  : TaskStatus.Completed
              }
              deleteTask={deleteTask}
            />
          ))}
        </section>

        <footer className='todos-list__footer'>
          <span>{tasks?.length} items left</span>
        </footer>
      </div>

      {showAddModal && (
        <Modal isOpen={showAddModal} onClose={closeModal}>
          <AddTodoForm externalAction={closeModal} createTask={createTask} />
        </Modal>
      )}
    </div>
  );
};

export default TodosPage;
