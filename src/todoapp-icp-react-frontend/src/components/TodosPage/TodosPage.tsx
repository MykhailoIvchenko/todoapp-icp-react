import { useSelectUser } from '../../redux/hooks/selectHooks/useSelectUser';
import Button from '../Button';
import Todo from './Todo';

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
  const user = useSelectUser();

  return (
    <div className='todos-page'>
      <h1 className='todos-page__title'>{user?.username || 'Anonymous'}</h1>
      <div className='todos-page__content'>
        <header className='todos-page__header'>
          <span className='todos-page__list-title'>What needs to be done?</span>

          <Button text='Add' />
        </header>

        <section className='todos-page__main'>
          {mockedTodos.map((todo) => (
            <Todo
              title={todo.title}
              description={todo.description}
              status={todo.status}
            />
          ))}
        </section>

        <footer className='todos-page__footer'>
          <span className='todo-count'>3 items left</span>
        </footer>
      </div>
    </div>
  );
};

export default TodosPage;
