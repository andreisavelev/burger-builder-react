import {put} from 'redux-saga/effects';

import {LOG_OUT} from '../actions/actionTypes';

export function* logOutSaga () {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield put({
        type: LOG_OUT
    });
}