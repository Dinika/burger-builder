import * as actionTypes from './actionTypes';
import axios from 'axios';

const apiKey = 'AIzaSyBM3HLMSeFlhxCqdg3R4d3XOpSABaSZySw';
const signUpUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
  apiKey;
const signInUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
  apiKey;

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
  localStorage.removeItem('token');
  localStorage.removeItem('expirationDate');
  localStorage.removeItem('userId');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkTokenExpiry = expiryTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expiryTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return dispatch => {
    dispatch(authStart());
    const url = isSignUp ? signUpUrl : signInUrl;
    const authData = { email, password, returnSecureToken: true };
    axios
      .post(url, authData)
      .then(response => {
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiresIn * 1000
        );
        let payload = {
          tokenId: response.data.idToken,
          userId: response.data.localId
        };
        dispatch(authSuccess(payload));
        dispatch(checkTokenExpiry(response.data.expiresIn));
        localStorage.setItem('token', response.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', response.data.localId);
      })
      .catch(error => {
        let payload = {
          error: error.response.data.error
        };
        console.log(error.response.data.error);
        dispatch(authError(payload));
      });
  };
};

export const setAuthRedirectPath = path => ({
  type: actionTypes.SET_AUTH_REDIRECT_PATH,
  payload: {
    path: path
  }
});

export const tryAutoSignIn = () => {
  return dispatch => {
    const tokenId = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = new Date(localStorage.getItem('expirationDate'));
    if (!tokenId) {
      dispatch(logout());
    } else {
      const timeLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;
      if (timeLeft > 0) {
        const payload = { tokenId, userId };
        dispatch(authSuccess(payload));
        dispatch(checkTokenExpiry(expirationDate.getSeconds()));
      } else {
        dispatch(logout());
      }
    }
  };
};
