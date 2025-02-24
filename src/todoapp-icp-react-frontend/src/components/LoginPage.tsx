import { useInternetIdentity } from 'ic-use-internet-identity';
import Loader from './Loader';
import { useEffect } from 'react';
import usePrincipalIdDispatch from '../redux/hooks/dispatchHooks/usePrincipalIdDispatch';
import useUserDispatch from '../redux/hooks/dispatchHooks/useUserDispatch';

const LoginPage: React.FC = () => {
  const { login, loginStatus, identity } = useInternetIdentity();

  const setPrincipalId = usePrincipalIdDispatch();

  const handleLoginCompleted = () => {
    if (identity) {
      const principalId = identity.getPrincipal().toString();

      setPrincipalId(principalId);
    }
  };

  useEffect(() => {
    handleLoginCompleted();
  }, [identity]);

  return (
    <div className='login-page'>
      {loginStatus == 'logging-in' || loginStatus == 'idle' ? (
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
