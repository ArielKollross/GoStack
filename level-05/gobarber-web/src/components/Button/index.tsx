import React, { ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

type ButtonsProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

const Button: React.FC<ButtonsProps> = ({ children, loading, ...rest }) => (
  <Container type="button" {...rest}>
    {loading ? 'Carregando ...' : children}
  </Container>
);

export default Button;
