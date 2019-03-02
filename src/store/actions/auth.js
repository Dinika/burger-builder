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

export const logout = () => ({
  type: actionTypes.AUTH_LOGOUT
});

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
        let payload = {
          tokenId: response.data.idToken,
          userId: response.data.localId
        };
        dispatch(authSuccess(payload));
        dispatch(checkTokenExpiry(response.data.expiresIn));
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
