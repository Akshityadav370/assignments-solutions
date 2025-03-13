import React from 'react';

const Button = ({ variant, text }) => {
  const variantClasses = {
    default: 'rounded p-4 cursor-pointer text-sm font-bold self-start',
    primary: 'bg-main text-white hover:bg-white hover:text-main',
    secondary: 'bg-gray-300',
  };

  return (
    <div className={variantClasses['default'] + ' ' + variantClasses[variant]}>
      {text}
    </div>
  );
};

export default Button;
