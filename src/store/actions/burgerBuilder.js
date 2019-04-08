import * as actionTypes from './actionTypes';

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { ingredient }
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: { ingredient }
});

export const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: { ingredients }
});

export const fetchIngredientsError = () => ({
  type: actionTypes.FETCH_INGREDIENTS_ERROR
});

export const initIngredient = () => {
  return {
    type: actionTypes.INIT_INGREDIENTS_START
  };
};
