/* eslint-disable react/button-has-type */
import React from 'react';
import { ButtonProps } from '../../../types';
import './Button.scss';

const Button: React.FC<ButtonProps> = ({ onClick, children = '', type }) => (
  <button
    type={type || 'button'}
    onClick={onClick}
  >
    {children}
  </button>
);
export default Button;
