import React from 'react';
import classes from './InputElement.module.css';

const InputElement = props => {
  let inputEle;
  switch (props.inputtype) {
    case 'input':
      inputEle = <input className={classes.InputElement} {...props} />;
      break;
    case 'textarea':
      inputEle = <textarea className={classes.InputElement} {...props} />;
      break;
    default:
      inputEle = <input className={classes.InputElement} {...props} />;
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEle}
    </div>
  );
};

export default InputElement;
