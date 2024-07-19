import React from 'react';

const Button = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded text-white';
  const variantClasses = variant === 'secondary' ? 'bg-gray-500' : 'bg-blue-500';

  return (
    <button className={`${baseClasses} ${variantClasses}`} {...props}>
      {children}
    </button>
  );
};

export default Button;