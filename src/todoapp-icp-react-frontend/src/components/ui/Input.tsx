import { InputHTMLAttributes, memo } from 'react';
import FormFieldWrapper from './FormFieldWrapper';
import clsx from 'clsx';

interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const InputComponent: React.FC<IInputProps> = ({ label, error, ...props }) => {
  return (
    <FormFieldWrapper label={label || ''} error={error}>
      <input {...props} className={clsx('form-field', { error: !!error })} />
    </FormFieldWrapper>
  );
};

const Input = memo(InputComponent);

export default Input;
