import axios from 'axios';

import {AUTH_START, AUTH_FAILED, AUTH_SUCCESS, LOG_OUT, SET_AUTH_REDIRECT_PATH} from "./actionTypes";

export const authStart = function() {
    return {
        type: AUTH_START
    }
};

export const authSuccess = authData => {
    return {
        type: AUTH_SUCCESS,
        ...authData
    }
};

export const authFailed = error => {
    return {
        type: AUTH_FAILED,
        error
    }
};

export const logOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    return {
        type: LOG_OUT
    }
};

export const setAuthRedirectPath = path => {
    return {
        type: SET_AUTH_REDIRECT_PATH,
        path
    }
};

export const checkAuthTimeout = expirationTime => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logOut())
        }, expirationTime * 1000); // Turn milliseconds to seconds
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        let expirationDate = null;
        let localId = null;
        let expirationTime = null;

        if (!token) {
            dispatch(logOut());
        } else {
            localId = localStorage.getItem('localId');
            expirationDate = new Date(localStorage.getItem('expirationDate'));
            expirationTime = Math.floor((new Date(expirationDate).getTime() - new Date().getTime()) / 1000);

            if (expirationDate > new Date()) {
                dispatch(authSuccess({
                    token,
                    localId
                }));
                dispatch(checkAuthTimeout(expirationTime));
            } else {
                dispatch(logOut());
            }
        }
    }
};

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        const baseUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:';
        let requestUrl = '';

        if (isSignUp) {
            requestUrl = `${baseUrl}signUp?key=AIzaSyBCTKitKeCWZB_p9JEcR08t6r4f4yjOhts`;
        } else {
            requestUrl = `${baseUrl}signInWithPassword?key=AIzaSyBCTKitKeCWZB_p9JEcR08t6r4f4yjOhts`
        }

        dispatch(authStart());

        axios.post(requestUrl, {
            email,
            password,
            returnSecureToken: true
        })
            .then(response => {
                const  {idToken, localId, expiresIn} = response.data;
                const expirationDate = String(new Date(new Date().getTime() + expiresIn * 1000));

                localStorage.setItem('token', idToken);
                localStorage.setItem('localId', localId);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(authSuccess({
                    idToken,
                    localId
                }));
                dispatch(checkAuthTimeout(expiresIn))
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error));
            })
    }
};
