import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkTokenExpirySaga,
  authSaga,
  tryAutoSignInSaga
} from './auth';
import { initIngredientSaga } from './burgerBuilder';
import { takeEvery } from 'redux-saga/effects';

export function* watchAuth() {
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga);
  yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkTokenExpirySaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_LOGIN, authSaga);
  yield takeEvery(actionTypes.AUTH_INITIATE_AUTO_SIGNIN, tryAutoSignInSaga);
}

export function* watchBurgerBuilder() {
  yield takeEvery(actionTypes.INIT_INGREDIENTS_START, initIngredientSaga);
}
