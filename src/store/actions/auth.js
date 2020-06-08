import {
  AUTH_USER,
  AUTH_START,
  AUTH_FAILED,
  AUTH_SUCCESS,
  AUTH_INITIATE_LOG_OUT,
  SET_AUTH_REDIRECT_PATH,
  LOG_OUT,
  AUTH_CHECK_TIMEOUT,
  AUTH_CHECK_STATE,
} from "./actionTypes";

export const authStart = function () {
  return {
    type: AUTH_START,
  };
};

export const authSuccess = (authData) => {
  return {
    type: AUTH_SUCCESS,
    ...authData,
  };
};

export const authFailed = (error) => {
  return {
    type: AUTH_FAILED,
    error,
  };
};

export const logOut = () => {
  return {
    type: AUTH_INITIATE_LOG_OUT,
  };
};

/**
 * Dispatch the LOG_OUT action
 * @function
 * @returns {{type: string}}
 */
export const didLogOut = () => {
  return {
    type: LOG_OUT,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: SET_AUTH_REDIRECT_PATH,
    path,
  };
};

/**
 * Action creator for checking the expire date of token
 * @param {number} expirationTime
 * @returns {{type: string, payload: number}}
 */
export const checkAuthTimeout = (expirationTime) => {
  return {
    type: AUTH_CHECK_TIMEOUT,
    payload: expirationTime,
  };
};

export const authCheckState = () => {
  return {
    type: AUTH_CHECK_STATE,
  };
};

/**
 * Action creator for the user authentication
 * @param {string} email
 * @param {string} password
 * @param {boolean} isSignUp
 */
export const auth = (email, password, isSignUp) => {
  return {
    type: AUTH_USER,
    payload: {
      email,
      password,
      isSignUp,
    },
  };
};
