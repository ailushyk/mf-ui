import React, { FC } from 'react';

interface ButtonProps {
  onClick(): void
}

export const Button: FC<ButtonProps> = ({ onClick, children }) => (
  <button onClick={onClick}>{children}</button>
);
