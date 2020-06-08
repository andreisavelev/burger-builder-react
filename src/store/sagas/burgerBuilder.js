import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import { fetchIngredientsFailed, setIngredients } from "../actions";
/**
 * Handle action for init ingredients
 * @generator
 */
export function* initIngredientsSaga() {
  try {
    const response = yield axios.get("/ingredients.json");
    yield put(setIngredients(response.data));
  } catch (e) {
    yield put(fetchIngredientsFailed());
  }
}
