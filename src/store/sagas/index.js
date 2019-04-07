import * as actionTypes from '../actions/actionTypes';
import { logoutSaga, checkTokenExpirySaga, authSaga } from './auth';
import { takeEvery } from 'redux-saga/effects';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkTokenExpirySaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGIN, authSaga);
}
