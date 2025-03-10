import { ReactNode } from 'react';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  text: string;
  startIcon?: ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  isLoading?: boolean;
}

const variantClasses = {
  primary: 'bg-primary text-white',
  secondary: 'bg-secondary text-text',
  defaultButton:
    'px-4 py-2 rounded-md font-light flex items-center gap-2 text-sm cursor-pointer',
};

export const Button = ({
  variant,
  text,
  startIcon,
  onClick,
  fullWidth = false,
  isLoading = false,
}: ButtonProps) => {
  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className={
        variantClasses[variant] +
        ' ' +
        variantClasses['defaultButton'] +
        ' ' +
        `${fullWidth ? 'w-full flex items-center justify-center' : ''}` +
        ' ' +
        `${isLoading ? 'opacity-50' : ''}`
      }
    >
      {startIcon}
      {text}
    </button>
  );
};
