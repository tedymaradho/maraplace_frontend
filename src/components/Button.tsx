import React from 'react';

interface IProps {
  buttonType: string;
  otherProps?: string[];
  children: React.ReactNode;
}

const Button: React.FC<IProps> = (props) => {
  const { buttonType, otherProps, children } = props;
  return (
    <button className={`button-container ${buttonType}`} {...otherProps}>
      {children}
    </button>
  );
};

export default Button;
