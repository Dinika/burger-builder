import * as actions from '../actions';
import axios from 'axios';
import { put } from 'redux-saga/effects';

export function* initIngredientSaga() {
  try {
    const response = yield axios.get(
      'https://burger-builder-19d47.firebaseio.com/ingredients.json'
    );
    yield put(actions.setIngredients(response.data));
  } catch (error) {
    yield put(actions.fetchIngredientsError());
  }
}
