import { useInternetIdentity } from 'ic-use-internet-identity';
import Loader from './ui/Loader';
import { useEffect } from 'react';
import usePrincipalIdDispatch from '../redux/hooks/dispatchHooks/usePrincipalIdDispatch';
import Button from './ui/Button';

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
      {loginStatus == 'logging-in' || (!!identity && loginStatus == 'idle') ? (
        <Loader />
      ) : (
        <Button text={'Login'} addClasses={'login-button'} onClick={login} />
      )}
    </div>
  );
};

export default LoginPage;
