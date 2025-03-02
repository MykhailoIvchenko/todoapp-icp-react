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
    <>
      {loginStatus == 'logging-in' || (!!identity && loginStatus == 'idle') ? (
        <Loader />
      ) : (
        <Button text={'Login'} addClasses={'login-button'} onClick={login} />
      )}
    </>
  );
};

export default LoginPage;
