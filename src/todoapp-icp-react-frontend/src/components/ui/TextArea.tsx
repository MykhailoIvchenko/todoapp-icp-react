import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';
import FormFieldWrapper from './FormFieldWrapper';

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea: React.FC<ITextAreaProps> = ({ label, error, ...props }) => {
  return (
    <FormFieldWrapper label={label || ''} error={error}>
      <textarea
        {...props}
        className={clsx('form-field', { error: !!error })}
      ></textarea>
    </FormFieldWrapper>
  );
};

export default TextArea;
