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

  const { tasks, isLoading } = useTasksList();

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className='todos-page-container'>
      <div className='todos-page'>
        <h1 className='todos-page__title'>{user?.username || 'Anonymous'}</h1>
        <div className='todos-page__content'>
          <header className='todos-page__header'>
            <span className='todos-page__list-title'>
              What needs to be done?
            </span>

            <Button text='Add' onClick={openModal} />
          </header>

          <section className='todos-page__main'>
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
              />
            ))}
          </section>

          <footer className='todos-page__footer'>
            <span className='todo-count'>{tasks.length} items left</span>
          </footer>
        </div>

        {showAddModal && (
          <Modal isOpen={showAddModal} onClose={closeModal}>
            <AddTodoForm externalAction={closeModal} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TodosPage;
