import React from 'react';
import classes from './Button.module.css';

const Button = props => (
  <button
    onClick={props.onButtonClicked}
    className={[classes.Button, classes[props.type]].join(' ')}
    disabled={props.disabled}
  >
    {props.children}
  </button>
);

export default Button;
