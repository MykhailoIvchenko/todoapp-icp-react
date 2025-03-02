import { useEffect, useState } from 'react';
import { useSelectUser } from '../redux/hooks/selectHooks/useSelectUser';
import { useDfinityAgent } from './useDfinityAgent';
import { Principal } from '@dfinity/principal';
import useUserNameDispatch from '../redux/hooks/dispatchHooks/useUserNameDispatch';
import { todoapp_icp_react_backend } from '../../../declarations/todoapp-icp-react-backend';
import { toast } from 'react-toastify';

type UseUsername = () => {
  isLoading: boolean;
  username?: string;
  setUserName?: (newUsername: string) => Promise<void>;
};

export const useUserName: UseUsername = () => {
  const user = useSelectUser();

  const setUsername = useUserNameDispatch();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const principalId = user?.principalId;

  const actor = useDfinityAgent();

  const getUsernameAndSet = async () => {
    try {
      setIsLoading(true);

      if (principalId && actor) {
        // const username = (await actor.get_uername()) as string[];
        const username = await todoapp_icp_react_backend.get_username();

        if (username.length > 0 && username[0]) {
          setUsername(username[0]);
        }
      }
    } catch (error) {
      toast.error('An error occured during the username retreiving');
    } finally {
      setIsLoading(false);
    }
  };

  const saveUsername = async (newUsername: string) => {
    try {
      setIsLoading(true);

      // await actor.set_username(newUsername);
      await todoapp_icp_react_backend.set_username(newUsername);

      await getUsernameAndSet();
    } catch (error) {
      toast.error('An error occured during the username saving');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!user?.username && actor) {
      getUsernameAndSet();
    }
  }, [actor]);

  return { isLoading, setUserName: saveUsername };
};
