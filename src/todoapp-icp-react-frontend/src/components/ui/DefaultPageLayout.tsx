import { ReactChildren } from '../../utils/types';
import logoutIcon from '../../assets/img/logout.svg';
import { useSelectUser } from '../../redux/hooks/selectHooks/useSelectUser';
import { useInternetIdentity } from 'ic-use-internet-identity';
import useUserDispatch from '../../redux/hooks/dispatchHooks/useUserDispatch';

interface IDefaultPageLayoutProps {
  children: ReactChildren;
}

const DefaultPageLayout: React.FC<IDefaultPageLayoutProps> = ({ children }) => {
  const user = useSelectUser();
  const setUser = useUserDispatch();

  const { clear } = useInternetIdentity();

  const handleLogout = async () => {
    try {
      await clear();

      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='default-page-layout'>
      {user && (
        <button type='button' className='logout-button' onClick={handleLogout}>
          <img alt='Logout icon' src={logoutIcon} />
        </button>
      )}

      {children}
    </div>
  );
};

export default DefaultPageLayout;
