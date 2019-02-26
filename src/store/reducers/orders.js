import * as actionTypes from '../actions/actionTypes';

const initialState = {
  loading: false,
  orders: []
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_BURGER_START:
      return {
        ...state,
        loading: true
      };
    case actionTypes.PURCHASE_BURGER_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: [...state.orders, action.payload]
      };
    case actionTypes.PURCHASE_BURGER_ERROR:
      return {
        ...state,
        loading: false
      };
    default:
      return state;
  }
};

export default reducer;
