import * as actionTypes from '../actions/actionTypes';

const INGREDIENT_PRICES = {
  salad: 0.4,
  bacon: 0.5,
  cheese: 0.3,
  meat: 0.7
};

const initialState = {
  ingredients: null,
  totalPrice: 2,
  error: false,
  buildingTheBurger: false
};

const addIngredient = (state, action) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    [action.payload.ingredient]:
      state.ingredients[action.payload.ingredient] + 1
  },
  totalPrice: state.totalPrice + INGREDIENT_PRICES[action.payload.ingredient],
  buildingTheBurger: true
});

const removeIngredient = (state, action) => ({
  ...state,
  ingredients: {
    ...state.ingredients,
    [action.payload.ingredient]:
      state.ingredients[action.payload.ingredient] - 1
  },
  totalPrice: state.totalPrice - INGREDIENT_PRICES[action.payload.ingredient],
  buildingTheBurger: true
});

const setIngredients = (state, action) => ({
  ...state,
  ingredients: action.payload.ingredients,
  error: false,
  totalPrice: 2,
  buildingTheBurger: false
});

const fetchIngredientsError = (state, action) => ({
  ...state,
  error: true
});

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return addIngredient(state, action);
    case actionTypes.REMOVE_INGREDIENT:
      return removeIngredient(state, action);
    case actionTypes.SET_INGREDIENTS:
      return setIngredients(state, action);
    case actionTypes.FETCH_INGREDIENTS_ERROR:
      return fetchIngredientsError(state, action);
    default:
      return state;
  }
};

export default reducer;
