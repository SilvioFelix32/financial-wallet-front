import { forwardRef } from 'react';
import { StyledInput } from './styles';
import type { InputProps } from './styles';

export const Input = forwardRef<HTMLInputElement, InputProps & React.InputHTMLAttributes<HTMLInputElement>>(
  (props, ref) => <StyledInput ref={ref} {...props} />
);

Input.displayName = 'Input';

export type { InputProps };

