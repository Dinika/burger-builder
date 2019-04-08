import { put } from 'redux-saga/effects';
import * as actions from '../actions';
import axios from '../../axios-order';

export function* purchaseBurgerSaga(action) {
  yield put(actions.purchaseBurgerStart());
  try {
    const response = yield axios.post(
      '/orders.json?auth=' + action.tokenId,
      action.payload
    );
    yield put(actions.purchaseBurgerSuccess(response.data));
  } catch (error) {
    yield put(actions.purchaseBurgerError(error));
  }
}

export function* fetchOrdersSaga(action) {
  yield put(actions.fetchOrdersStart());
  const queryParams = `?auth=${
    action.payload.tokenId
  }&orderBy="userId"&equalTo="${action.payload.userId}"`;
  try {
    const response = yield axios.get('/orders.json' + queryParams);
    let fetchedOrders = [];
    for (let key in response.data) {
      fetchedOrders.push({
        ...response.data[key],
        key: key
      });
    }
    yield put(actions.fetchOrdersSuccess(fetchedOrders));
  } catch (error) {
    yield put(actions.fetchOrdersError());
  }
}
