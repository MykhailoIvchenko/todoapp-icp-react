import { useSelectUser } from '../redux/hooks/selectHooks/useSelectUser';
import AddUserName from './AddUserName';
import LoginPage from './LoginPage';
import TodosPage from './TodosPage/TodosPage';

const CheckAccess = () => {
  const user = useSelectUser();

  if (!user) {
    return <LoginPage />;
  }

  if (!user?.username) {
    return <AddUserName />;
  }

  return <TodosPage />;
};

export default CheckAccess;
