import * as actionTypes from './actionTypes';
import axios from '../../axios-order';

export const addIngredient = ingredient => ({
  type: actionTypes.ADD_INGREDIENT,
  payload: { ingredient }
});

export const removeIngredient = ingredient => ({
  type: actionTypes.REMOVE_INGREDIENT,
  payload: { ingredient }
});

const setIngredients = ingredients => ({
  type: actionTypes.SET_INGREDIENTS,
  payload: { ingredients }
});

const fetchIngredientsError = () => ({
  type: actionTypes.FETCH_INGREDIENTS_ERROR
});

export const initIngredient = () => {
  return dispatch => {
    axios
      .get('https://burger-builder-19d47.firebaseio.com/ingredients.json')
      .then(response => {
        dispatch(setIngredients(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsError());
      });
  };
};
