import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  orders: [],
  purchased: false
};

const purchaseInit = (state, action) => ({
  ...state,
  purchased: false
});

const purchaseBurgerStart = (state, action) => ({
  ...state,
  loading: true
});

const purchaseBurgerSuccess = (state, action) => ({
  ...state,
  loading: false,
  purchased: true,
  orders: [...state.orders, action.payload]
});

const purchaseBurgerError = (state, action) => ({
  ...state,
  loading: false
});

const fetchOrdersStart = (state, action) => ({
  ...state,
  loading: true
});

const fetchOrdersSuccess = (state, action) => ({
  ...state,
  loading: false,
  orders: action.payload
});

const fetchOrdersError = (state, action) => ({
  ...state,
  loading: false
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_INIT:
      return purchaseInit(state, action);
    case actionTypes.PURCHASE_BURGER_START:
      return purchaseBurgerStart(state, action);
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return purchaseBurgerSuccess(state, action);
    case actionTypes.PURCHASE_BURGER_ERROR:
      return purchaseBurgerError(state, action);
    case actionTypes.FETCH_ORDERS_START:
      return fetchOrdersStart(state, action);
    case actionTypes.FETCH_ORDERS_SUCCESS:
      return fetchOrdersSuccess(state, action);
    case actionTypes.FETCH_ORDERS_ERROR:
      return fetchOrdersError(state, action);
    default:
      return state;
  }
};

export default reducer;
