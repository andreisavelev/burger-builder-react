import axios from 'axios';

import {AUTH_START, AUTH_FAILED, AUTH_SUCCESS} from "./actionTypes";

export const authStart = function() {
    return {
        type: AUTH_START
    }
};

export const authSuccess = authData => {
    return {
        type: AUTH_SUCCESS,
        authData
    }
};

export const authFailed = error => {
    return {
        type: AUTH_FAILED,
        error
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
                console.log(response);
                dispatch(authSuccess(response.data));
            })
            .catch(error => {
                console.log(error);
                dispatch(authFailed(error))
            })
    }
};
