/* eslint-disable react/button-has-type */
import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps {
  children?: React.ReactNode,
  onClick: React.MouseEventHandler<HTMLButtonElement>,
  type?: 'button' | 'submit' | 'reset'
}

const Button: React.FC<ButtonProps> = ({ onClick, children = '', type = undefined }) => (
  <button
    className={styles.button}
    type={type || 'button'}
    onClick={onClick}
  >
    {children}
  </button>
);
export default Button;
