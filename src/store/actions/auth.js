import * as actionTypes from './actionTypes';

export const authStart = () => ({
  type: actionTypes.AUTH_START
});

export const authSuccess = payload => ({
  type: actionTypes.AUTH_SUCCESS,
  payload
});

export const authError = error => ({
  type: actionTypes.AUTH_ERROR,
  error
});

export const auth = (email, password) => {
  return dispatch => {
    dispatch(authSuccess());
  };
};
