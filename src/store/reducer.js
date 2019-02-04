import * as actionTypes from './actions';

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.5,
  cheese: 0.3,
  meat: 0.7
};

const initialState = {
  ingredients: {
    cheese: 0,
    bacon: 0,
    meat: 0,
    salad: 0
  },
  totalPrice: 2
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient]:
            state.ingredients[action.payload.ingredient] + 1
        },
        totalPrice:
          state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient]
      };
    case actionTypes.REMOVE_INGREDIENT:
      return {
        ...state,
        ingredients: {
          ...state.ingredients,
          [action.payload.ingredient]:
            state.ingredients[action.payload.ingredient] - 1
        },
        totalPrice:
          state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient]
      };
    default:
      return state;
  }
};

export default reducer;
