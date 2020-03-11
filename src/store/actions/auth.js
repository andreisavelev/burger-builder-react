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
                const  {idToken, localId} = response.data;

                dispatch(authSuccess({
                    idToken,
                    localId
                }));
            })
            .catch(error => {
                dispatch(authFailed(error.response.data.error));
            })
    }
};
