import { useSelectUser } from '../redux/hooks/selectHooks/useSelectUser';
import LoginPage from './LoginPage';
import TodosPage from './TodosPage/TodosPage';

const CheckAccess = () => {
  const user = useSelectUser();

  if (!user) {
    return <LoginPage />;
  }

  // if (!user.username) {
  //   return <></>;
  // }

  return <TodosPage />;
};

export default CheckAccess;
