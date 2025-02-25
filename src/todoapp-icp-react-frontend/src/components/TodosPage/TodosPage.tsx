import { useCallback, useState } from 'react';
import { useSelectUser } from '../../redux/hooks/selectHooks/useSelectUser';
import { TaskStatus } from '../../utils/enums';
import Button from '../ui/Button';
import Todo from './Todo';
import AddTodoForm from '../AddTodoForm';
import Modal from '../ui/Modal';
import { useDfinityAgent } from '../../hooks/useDfinityAgent';

const mockedTodos = [
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
  {
    title: 'First todo',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium assumenda dolor numquam mollitia quae quas eaque cumque rem explicabo pariatur.',
    status: 'notCompleted',
  },
];

const TodosPage: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState<boolean>(false);

  const openModal = () => {
    setShowAddModal(true);
  };

  const closeModal = useCallback(() => {
    setShowAddModal(false);
  }, []);

  const user = useSelectUser();

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
            {mockedTodos.map((todo, i) => (
              <Todo
                key={i}
                title={todo.title}
                description={todo.description}
                status={todo.status as TaskStatus}
              />
            ))}
          </section>

          <footer className='todos-page__footer'>
            <span className='todo-count'>{mockedTodos.length} items left</span>
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
