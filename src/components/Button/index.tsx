import { StyledButton } from './styles';
import type { ButtonProps } from './styles';
import React from 'react';

export const Button = React.forwardRef<
  HTMLButtonElement,
  ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ variant, size, fullWidth, ...rest }, ref) => {
  return (
    <StyledButton
      ref={ref}
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      {...rest}
    />
  );
});

Button.displayName = 'Button';

export type { ButtonProps };

