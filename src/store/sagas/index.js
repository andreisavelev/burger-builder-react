import { takeEvery, takeLatest, all } from "redux-saga/effects";

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
  PURCHASE_BURGER,
  FETCH_ORDER,
} from "../actions/actionTypes";
import { initIngredientsSaga } from "./burgerBuilder";
import { purchaseBurgerSaga, fetchOrderSaga } from "./order";

/**
 * Dispatch logout saga when AUTH_INITIATE_LOG_OUT action occures
 * It seem that we attach listener to watch when AUTH_INITATE_LOG_OUT action will be dispatch
 * @generator
 * @yields logOutSaga
 */
export function* wathcAuth() {
  all([
    takeEvery(AUTH_INITIATE_LOG_OUT, logOutSaga),

    /** attach a listener for AUTH_CHEC_TIMEOUT */
    takeEvery(AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),

    /** listen for AUTH_USER action */
    takeEvery(AUTH_USER, authUserSaga),

    /** listen for AUTH_CHECK_STATE */
    takeEvery(AUTH_CHECK_STATE, authCheckSaga),
  ]);
}

export function* watchBurgerBuilder() {
  yield takeEvery(INIT_INGEREDIENTS, initIngredientsSaga);
}

/**
 * Subscribe on all purchasing and ordering actions
 * @generator
 */
export function* watchOrder() {
  yield takeLatest(PURCHASE_BURGER, purchaseBurgerSaga);
  yield takeLatest(FETCH_ORDER, fetchOrderSaga);
}
