import React from 'react';
import classes from './InputElement.module.css';

const InputElement = props => {
  let inputEle;
  const inputElementClasses = [classes.Input];
  if (props.isValid && props.shouldValidate && props.touched) {
    inputElementClasses.push(classes.Invalid);
  }
  switch (props.elementType) {
    case 'input':
      inputEle = (
        <input
          className={inputElementClasses.join(' ')}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onInputChanged}
        />
      );
      break;
    case 'textarea':
      inputEle = (
        <textarea
          className={classes.InputElement}
          {...props.elementConfig}
          value={props.value}
          onChange={props.onInputChanged}
        />
      );
      break;
    case 'select':
      inputEle = (
        <select
          className={classes.InputElement}
          onChange={props.onInputChanged}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputEle = (
        <input className={classes.InputElement} {...props.elementConfig} />
      );
  }
  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputEle}
    </div>
  );
};

export default InputElement;
