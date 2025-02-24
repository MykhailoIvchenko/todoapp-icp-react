import { useInternetIdentity } from 'ic-use-internet-identity';
import Loader from './Loader';
import { useEffect } from 'react';
import usePrincipalIdDispatch from '../redux/hooks/dispatchHooks/usePrincipalIdDispatch';
import useUserDispatch from '../redux/hooks/dispatchHooks/useUserDispatch';

const LoginPage: React.FC = () => {
  const { login, loginStatus, identity, clear } = useInternetIdentity();

  const setUser = useUserDispatch();

  const handleLoginCompleted = () => {
    if (identity) {
      const principalId = identity.getPrincipal().toString();

      console.log(principalId);

      setUser({ principalId });
    }
  };

  useEffect(() => {
    handleLoginCompleted();
  }, [identity]);

  return (
    <div className='login-page'>
      {loginStatus == 'logging-in' ? (
        <Loader />
      ) : (
        <button type='button' onClick={login} className='login-button'>
          Login
        </button>
      )}
    </div>
  );
};

export default LoginPage;
