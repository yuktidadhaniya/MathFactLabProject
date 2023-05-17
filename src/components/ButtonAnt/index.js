import React from "react";
import "assets/sass/components/button-ant.scss";

const ButtonAnt = props => {
  const { name, title, type, className, onClick, disabled } = props;

  const propsObj = {
    ...(title && { title }),
    ...(className && { className }),
    ...(type && { type }),
    ...(onClick && { onClick }),
    ...(disabled && { disabled }),
  };

  return <button {...propsObj}>{name}</button>;
};

export default ButtonAnt;
