import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const purchaseBurgerStart = () => ({
  type: actionTypes.PURCHASE_BURGER_START
});

export const purchaseBurgerSuccess = payload => ({
  type: actionTypes.PURCHASE_BURGER_SUCCESS,
  payload
});

export const purchaseBurgerError = error => ({
  type: actionTypes.PURCHASE_BURGER_ERROR,
  error
});

export const purchaseInit = () => ({
  type: actionTypes.PURCHASE_INIT
});

export const purchaseBurger = (tokenId, payload) => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json?auth=' + tokenId, payload)
      .then(response => {
        dispatch(purchaseBurgerSuccess(response.data));
        return response;
      })
      .catch(error => {
        dispatch(purchaseBurgerError(error));
      });
  };
};

export const fetchOrdersStart = () => ({
  type: actionTypes.FETCH_ORDERS_START
});

export const fetchOrdersSuccess = payload => ({
  type: actionTypes.FETCH_ORDERS_SUCCESS,
  payload
});

export const fetchOrdersError = payload => ({
  type: actionTypes.FETCH_ORDERS_ERROR,
  payload
});

export const fetchOrders = (tokenId, userId) => {
  return dispatch => {
    dispatch(fetchOrdersStart());
    const queryParams = `?auth=${tokenId}&orderBy="userId"&equalTo="${userId}"`;
    axios
      .get('/orders.json' + queryParams)
      .then(response => {
        let fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({
            ...response.data[key],
            key: key
          });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
      })
      .catch(error => {
        dispatch(fetchOrdersError(error));
      });
  };
};
