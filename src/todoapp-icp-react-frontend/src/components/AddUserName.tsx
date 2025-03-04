import { Controller, useForm } from 'react-hook-form';
import Input from './ui/Input';
import Button from './ui/Button';
import { useUserName } from '../hooks/useUsername';
import Loader from './ui/Loader';

interface IUserNameForm {
  username: string;
}

const AddUserName: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserNameForm>();

  const { isLoading, setUserName } = useUserName();

  const saveUsername = async (data: IUserNameForm) => {
    if (setUserName) {
      await setUserName(data.username);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <h3 className='add-username_title'>Add your username</h3>

      <form className='username-form' onSubmit={handleSubmit(saveUsername)}>
        <Controller
          name='username'
          control={control}
          rules={{
            required: 'Username is required',
          }}
          render={({ field }) => (
            <Input
              {...field}
              placeholder={'Enter your username...'}
              error={errors?.username?.message}
            />
          )}
        />

        <Button text={'Save'} addClasses='username-form_button' type='submit' />
      </form>
    </>
  );
};

export default AddUserName;
