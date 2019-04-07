import { put, delay } from 'redux-saga/effects';
import * as actions from '../actions';

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
