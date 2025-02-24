import { setPrincipalId } from '../../slices/userSlice';
import { useAppDispatch } from '../helperHooks';

type SetPrincipalIdAction = (principalId: string) => void;

const useUserNameDispatch = (): SetPrincipalIdAction => {
  const dispatch = useAppDispatch();

  const setPrincipal = (principalId: string) => {
    dispatch(setPrincipalId(principalId));
  };

  return setPrincipal;
};

export default useUserNameDispatch;
