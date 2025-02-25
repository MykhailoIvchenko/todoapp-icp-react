import { memo, ReactNode } from 'react';

interface IFormFieldWrapperProps {
  children: ReactNode | ReactNode[];
  error: string;
  label: string;
}

const FormFieldWrapperComponent: React.FC<IFormFieldWrapperProps> = ({
  children,
  error,
  label,
}) => {
  return (
    <label className='form-field'>
      <span className='label-text'>{label}</span>

      {children}

      {error && <span className='error-text'></span>}
    </label>
  );
};

const FormFieldWrapper = memo(FormFieldWrapperComponent);

export default FormFieldWrapper;
