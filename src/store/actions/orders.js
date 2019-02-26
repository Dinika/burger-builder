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

export const purchaseBurger = payload => {
  return dispatch => {
    dispatch(purchaseBurgerStart());
    axios
      .post('/orders.json', payload)
      .then(response => {
        console.log(response.data);
        dispatch(purchaseBurgerSuccess(response.data));
        return response;
      })
      .catch(error => {
        dispatch(purchaseBurgerError(error));
      });
  };
};
