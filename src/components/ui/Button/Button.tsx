/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  children?: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  options?: {
    font?: 'small' | 'medium' | 'big',
    padding?: 'small' | 'medium' | 'big',
  }
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({
  onClick, children = '', type = undefined, options = {},
}) => (
  <button
    className={`${styles.button} ${options.font && styles[`font-${options.font}`]} ${options.padding && styles[`padding-${options.padding}`]}`}
    type={type || 'button'}
    onClick={onClick}
  >
    {children}
  </button>
);
export default Button;
