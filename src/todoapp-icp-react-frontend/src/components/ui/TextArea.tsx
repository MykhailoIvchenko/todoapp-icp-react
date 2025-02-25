import clsx from 'clsx';
import { TextareaHTMLAttributes } from 'react';

interface ITextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const TextArea: React.FC<ITextAreaProps> = ({ label, error, ...props }) => {
  return (
    <textarea
      {...props}
      className={clsx('form-field', { error: !!error })}
    ></textarea>
  );
};

export default TextArea;
