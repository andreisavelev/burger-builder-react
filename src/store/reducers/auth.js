import {AUTH_START, AUTH_FAILED, AUTH_SUCCESS, LOG_OUT} from "../actions/actionTypes";
import updateObject from "../utility/updateObject";

const initialState = {
    token: null,
    userId: null,
    error: null,
    loading: null
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_START:
            return updateObject(state, {
                error: null,
                loading: true
            });

        case AUTH_SUCCESS:
            return updateObject(state, {
                token: action.idToken,
                userId: action.localId,
                error: null,
                loading: false
            });

        case AUTH_FAILED:
            return updateObject(state, {
                error: action.error,
                loading: false
            });

        case LOG_OUT:
            return updateObject(state, {
                token: null,
                userId: null
            });

        default:
            return state;
    }
};

export default reducer;