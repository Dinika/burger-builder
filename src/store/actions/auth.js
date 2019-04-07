import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = payload => ({
  type: actionTypes.AUTH_SUCCESS,
  payload
});

export const authError = payload => ({
  type: actionTypes.AUTH_ERROR,
  payload
});

export const logout = () => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGOUT
  };
};

export const didLogout = () => {
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkTokenExpiry = expiryTime => {
  return {
    type: actionTypes.AUTH_CHECK_TIMEOUT,
    payload: {
      expiryTime
    }
  };
};

export const auth = (email, password, isSignUp) => {
  return {
    type: actionTypes.AUTH_INITIATE_LOGIN,
    payload: {
      email,
      password,
      isSignUp
    }
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: {
    path: path
  }
});

export const tryAutoSignIn = () => {
  return {
    type: actionTypes.AUTH_INITIATE_AUTO_SIGNIN
  };
};
