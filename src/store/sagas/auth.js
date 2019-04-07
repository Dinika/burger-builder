import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from 'axios';

const apiKey = 'AIzaSyBM3HLMSeFlhxCqdg3R4d3XOpSABaSZySw';
const signUpUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=' +
  apiKey;
const signInUrl =
  'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
  apiKey;

export function* logoutSaga(action) {
  yield localStorage.removeItem('token');
  yield localStorage.removeItem('expirationDate');
  yield localStorage.removeItem('userId');
  yield put(actions.didLogout());
}

export function* checkTokenExpirySaga(action) {
  yield delay(action.payload.expiryTime * 1000);
  yield put(actions.logout());
}

export function* authSaga(action) {
  yield put(actions.authStart());
  const url = action.payload.isSignUp ? signUpUrl : signInUrl;
  const authData = {
    email: action.payload.email,
    password: action.payload.password,
    returnSecureToken: true
  };
  try {
    const response = yield axios.post(url, authData);
    const expirationDate = new Date(
      new Date().getTime() + response.data.expiresIn * 1000
    );
    let payload = {
      tokenId: response.data.idToken,
      userId: response.data.localId
    };
    yield put(actions.authSuccess(payload));
    yield put(actions.checkTokenExpiry(response.data.expiresIn));
    localStorage.setItem('token', response.data.idToken);
    localStorage.setItem('expirationDate', expirationDate);
    localStorage.setItem('userId', response.data.localId);
  } catch (error) {
    let payload = {
      error: error.response.data.error
    };
    yield put(actions.authError(payload));
  }
}

export function* tryAutoSignInSaga(action) {
  const tokenId = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  if (!tokenId) {
    yield put(actions.logout());
  } else {
    const timeLeft = (expirationDate.getTime() - new Date().getTime()) / 1000;
    if (timeLeft > 0) {
      const payload = { tokenId, userId };
      yield put(actions.authSuccess(payload));
      yield put(actions.checkTokenExpiry(expirationDate.getSeconds()));
    } else {
      yield put(actions.logout());
    }
  }
}
