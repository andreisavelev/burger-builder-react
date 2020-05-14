import { takeEvery } from "redux-saga/effects";

import {
  logOutSaga,
  checkAuthTimeoutSaga,
  authUserSaga,
  authCheckSaga,
} from "./auth";
import {
  AUTH_INITIATE_LOG_OUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
  AUTH_CHECK_STATE,
  INIT_INGEREDIENTS,
} from "../actions/actionTypes";
import { initIngredientsSaga } from "./burgerBuilder";

/**
 * Dispatch logout saga when AUTH_INITIATE_LOG_OUT action occures
 * It seem that we attach listener to watch when AUTH_INITATE_LOG_OUT action will be dispatch
 * @generator
 * @yields logOutSaga
 */
export function* wathcAuth() {
  yield takeEvery(AUTH_INITIATE_LOG_OUT, logOutSaga);

  /** attach a listener for AUTH_CHEC_TIMEOUT */
  yield takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);

  /** listen for AUTH_USER action */
  yield takeEvery(AUTH_USER, authUserSaga);

  /** listen for AUTH_CHECK_STATE */
  yield takeEvery(AUTH_CHECK_STATE, authCheckSaga);
}

export function* watchBurgerBuilder() {
  yield console.log("watched");
  yield takeEvery(INIT_INGEREDIENTS, initIngredientsSaga);
}
