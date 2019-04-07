import * as actionTypes from '../actions/actionTypes';
import { logoutSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
}
