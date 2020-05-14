import { takeEvery } from "redux-saga/effects";

import { logOutSaga, checkAuthTimeoutSaga, authUserSaga } from "./auth";
import {
  AUTH_INITIATE_LOG_OUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_USER,
} from "../actions/actionTypes";

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
}
