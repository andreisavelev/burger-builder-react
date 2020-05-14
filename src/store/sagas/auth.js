import { put, delay } from "redux-saga/effects";
import axios from "axios";

import {
  didLogOut,
  logOut,
  authStart,
  authFailed,
  authSuccess,
  checkAuthTimeout,
} from "../actions";

/**
 * 1) clear auth data in the localstorage
 * 2) dispatch the action LOG_OUT
 */
export function* logOutSaga() {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("localId");

  yield put(didLogOut());
}

/**
 * Dispatch the logOut actaion when the tocken will be expired
 * @param {{payload: string, type: string}}
 * @generator
 */
export function* checkAuthTimeoutSaga(action) {
  /** calc the expiration time */
  yield delay(action.payload * 1000);
  /** dispatch the logOut action */
  yield put(logOut());
}

/**
 * Authenticate a user
 * @param {{payload: {isSignUp: boolean, email: string, password: string}, type: string}} action
 */
export function* authUserSaga(action) {
  const baseUrl = "https://identitytoolkit.googleapis.com/v1/accounts:";
  const { isSignUp, email, password } = action.payload;
  let requestUrl = "";

  /** we need defferent urls depending on the type of authentication */
  if (isSignUp) {
    requestUrl = `${baseUrl}signUp?key=AIzaSyBCTKitKeCWZB_p9JEcR08t6r4f4yjOhts`;
  } else {
    requestUrl = `${baseUrl}signInWithPassword?key=AIzaSyBCTKitKeCWZB_p9JEcR08t6r4f4yjOhts`;
  }

  /** start an authentification */
  yield put(authStart());

  /** fetch an auth data from the server */
  try {
    const response = yield axios.post(requestUrl, {
      email,
      password,
      returnSecureToken: true,
    });

    /** extrct required parts from respons */
    const { idToken, localId, expiresIn } = yield response.data;
    /** calc an expiration date and covert it to the string value */
    const expirationDate = yield String(
      new Date(new Date().getTime() + expiresIn * 1000)
    );

    /** store credentials in the local storage */
    yield localStorage.setItem("token", idToken);
    yield localStorage.setItem("localId", localId);
    yield localStorage.setItem("expirationDate", expirationDate);

    /** dispatch success action */
    yield put(
      authSuccess({
        idToken,
        localId,
      })
    );
    /** start expiration counter */
    yield put(checkAuthTimeout(expiresIn));
  } catch (error) {
    /** if something goes wrong then dispatch failed action */
    yield put(authFailed(error.response.data.error));
  }
}
