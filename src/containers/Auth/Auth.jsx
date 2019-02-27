import React, { Component } from 'react';
import { connect } from 'react-redux';
import InputElement from '../../components/UI/InputElement/InputElement';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.module.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'E-mail address'
        },
        value: '',
        rules: {
          required: true,
          isEmail: true
        },
        isValid: false,
        touched: false
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        rules: {
          required: true,
          minLength: 8
        },
        isValid: false,
        touched: false
      }
    }
  };

  checkValidity(value, rules) {
    let isValid = true;
    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }
    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }
    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }
    return isValid;
  }

  onInputChanged(event, inputIdentifier) {
    const updatedControls = {
      ...this.state.controls,
      [inputIdentifier]: {
        ...this.state.controls[inputIdentifier],
        touched: true,
        value: event.target.value,
        isValid: this.checkValidity(
          event.target.value,
          this.state.controls[inputIdentifier].rules
        )
      }
    };
    this.setState({ controls: updatedControls });
  }

  onFormSubmitted(event) {
    event.preventDefault();
    this.props.onAuthenticate(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  }

  render() {
    let formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key]
      });
    }
    const form = (
      <form onSubmit={event => this.onFormSubmitted(event)}>
        {formElementsArray.map(formElement => (
          <InputElement
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            isValid={!formElement.config.isValid}
            shouldValidate={formElement.config.rules}
            touched={formElement.config.touched}
            onInputChanged={event => this.onInputChanged(event, formElement.id)}
          />
        ))}
        <Button type="Success">Authenticate</Button>
      </form>
    );
    return <div className={classes.Auth}>{form}</div>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (email, password) => dispatch(actions.auth(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);