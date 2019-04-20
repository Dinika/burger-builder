import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import checkValidity from '../../utils/checkValidity';
import InputElement from '../../components/UI/InputElement/InputElement';
import Button from '../../components/UI/Button/Button';
import classes from '../Auth/Auth.module.css';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';

const Auth = props => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [controls, setControls] = useState({
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
  });

  useEffect(() => {
    if (!props.buildingTheBurger && props.authRedirectPath) {
      props.setAuthRedirectPath('/');
    }
  }, []);

  function onInputChanged(event, inputIdentifier) {
    const updatedControls = {
      ...controls,
      [inputIdentifier]: {
        ...controls[inputIdentifier],
        touched: true,
        value: event.target.value,
        isValid: checkValidity(
          event.target.value,
          controls[inputIdentifier].rules
        )
      }
    };
    setControls(updatedControls);
  }

  function onFormSubmitted(event) {
    event.preventDefault();
    props.onAuthenticate(
      controls.email.value,
      controls.password.value,
      isSignUp
    );
  }

  function onAuthMethodChanged() {
    setIsSignUp(!isSignUp);
  }

  let formElementsArray = [];
  for (let key in controls) {
    formElementsArray.push({
      id: key,
      config: controls[key]
    });
  }
  const formOrLoader = !props.loading ? (
    <form onSubmit={event => onFormSubmitted(event)}>
      {formElementsArray.map(formElement => (
        <InputElement
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          isValid={!formElement.config.isValid}
          shouldValidate={formElement.config.rules}
          touched={formElement.config.touched}
          onInputChanged={event => onInputChanged(event, formElement.id)}
        />
      ))}
      <Button type="Success">Authenticate</Button>
    </form>
  ) : (
    <Loader />
  );

  const errorMessage = props.error ? <p>{props.error.message}</p> : null;

  let redirectToHomePage = props.isAuthenticated ? (
    <Redirect to={props.authRedirectPath} />
  ) : null;

  return (
    <div className={classes.Auth}>
      {redirectToHomePage}
      {errorMessage}
      {formOrLoader}
      <Button type="Danger" onButtonClicked={onAuthMethodChanged}>
        Switch to {isSignUp ? 'SignIn' : 'SignUp'}
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.tokenId !== null,
    buildingTheBurger: state.burger.buildingTheBurger,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuthenticate: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
