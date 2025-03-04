import { memo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { ITaskUpdatableData } from '../utils/types';
import Button from './ui/Button';
import Input from './ui/Input';
import TextArea from './ui/TextArea';
import Loader from './ui/Loader';

interface IAddTodoFormProps {
  createTask: (title: string, description: string) => Promise<void>;
  externalAction: VoidFunction;
}

const AddTodoFormComponent: React.FC<IAddTodoFormProps> = ({
  externalAction,
  createTask,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<ITaskUpdatableData>();

  const saveTask = async (taskData: ITaskUpdatableData) => {
    setIsLoading(true);

    externalAction();
    
    await createTask(taskData.title, taskData.description);

    setIsLoading(false);
  };

  return (
    <form className='add-todo-form' onSubmit={handleSubmit(saveTask)}>
      <h3 className='add-todo-form_title'>Add a task</h3>

      <Controller
        name='title'
        control={control}
        rules={{
          required: 'Title is required',
        }}
        render={({ field }) => (
          <Input
            {...field}
            label={'Task title'}
            placeholder={'Enter a title...'}
            error={errors?.title?.message}
          />
        )}
      />

      <Controller
        name='description'
        control={control}
        rules={{
          required: 'Description is required',
        }}
        render={({ field }) => (
          <TextArea
            {...field}
            rows={3}
            label={'Task description'}
            placeholder={'Enter a description...'}
            error={errors?.description?.message}
          />
        )}
      />

      {isLoading ? (
        <Loader isSmall />
      ) : (
        <Button
          text={'Create'}
          addClasses='add-todo-form_button'
          type='submit'
        />
      )}
    </form>
  );
};

const AddTodoForm = memo(AddTodoFormComponent);

export default AddTodoForm;
