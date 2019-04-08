import * as actionTypes from '../actions/actionTypes';
import {
  logoutSaga,
  checkTokenExpirySaga,
  authSaga,
  tryAutoSignInSaga
} from './auth';
import { initIngredientSaga } from './burgerBuilder';
import { fetchOrdersSaga, purchaseBurgerSaga } from './orders';
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

export function* watchOrders() {
  yield takeEvery(actionTypes.POST_ORDER_DATA, purchaseBurgerSaga);
  yield takeEvery(actionTypes.FETCH_ORDERS, fetchOrdersSaga);
}
