import * as actionTypes from './actionTypes';

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
  return {
    type: actionTypes.POST_ORDER_DATA,
    tokenId,
    payload
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
  return {
    type: actionTypes.FETCH_ORDERS,
    payload: {
      tokenId,
      userId
    }
  };
};
