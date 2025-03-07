import { ReactChildren } from '../../utils/types';
import logoutIcon from '../../assets/img/logout.svg';
import { useSelectUser } from '../../redux/hooks/selectHooks/useSelectUser';
import { useInternetIdentity } from 'ic-use-internet-identity';
import useUserDispatch from '../../redux/hooks/dispatchHooks/useUserDispatch';
import Loader from './Loader';
import { useState } from 'react';

interface IDefaultPageLayoutProps {
  children: ReactChildren;
}

const DefaultPageLayout: React.FC<IDefaultPageLayoutProps> = ({ children }) => {
  const user = useSelectUser();
  const setUser = useUserDispatch();

  const { clear, loginStatus } = useInternetIdentity();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await clear();

      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  if (loginStatus === 'logging-in' || isLoading) {
    return (
      <div className='default-page-layout'>
        <Loader />
      </div>
    );
  }

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
