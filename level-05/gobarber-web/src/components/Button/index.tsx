import React, { ButtonHTMLAttributes } from "react";

import { Container } from "./styles";

type ButtonsProps = ButtonHTMLAttributes<HTMLButtonElement>;

const Button: React.FC<ButtonsProps> = ({ children, ...rest }) => (
  <Container type="button" {...rest}>
    {children}
  </Container>
);

export default Button;
