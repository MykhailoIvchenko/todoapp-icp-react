import { Controller, useForm } from 'react-hook-form';
import Input from './ui/Input';
import Button from './ui/Button';
interface IUserNameForm {
  username: string;
}

const AddUserName: React.FC = () => {
  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<IUserNameForm>();

  const saveUsername = async (data: IUserNameForm) => {};

  return (
    <div className='add-username'>
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
    </div>
  );
};

export default AddUserName;
