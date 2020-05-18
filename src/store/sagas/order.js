import { put } from "redux-saga/effects";

import axios from "../../axios-orders";
import {
  purchaseBurgerStart,
  purchaseBurgerSuccess,
  purchaseBurgerFail,
  fetchOrderStart,
  fetchOrdersSuccess,
  fetchOrdersFailed,
} from "../actions";

/**
 * Saga that handles burger purchasing from the very begining like showing a loader
 * till the end of the day like asyn cation and hiding the loader
 * @param {{payload: {token: string, orderData: object}}, type: string} action
 * @generator
 */
export function* purchaseBurgerSaga(action) {
  const { token, orderData } = action.payload;

  /** init purchasing, show loader and etc... */
  yield put(purchaseBurgerStart());

  try {
    /** store the order data on the server side */
    const response = yield axios.post(`/orders.json?auth=${token}`, orderData);

    /** update the store in this app */
    yield put(purchaseBurgerSuccess(response.data.name, orderData));
  } catch (error) {
    /** if something goes wrong, parse the error object and put int in the sore */
    yield put(purchaseBurgerFail(error));
  }
}

/**
 * Handler a fetching  order process.
 *
 * @param {{type: string, payload: {userId: string, token: string}}} action
 */
export function* fetchOrderSaga(action) {
  const { userId, token } = action.payload;
  let orders = [];
  let respons;

  yield put(fetchOrderStart());

  try {
    respons = yield axios.get(
      `/orders.json?auth=${token}&orderBy="userId"&equalTo="${userId}"`
    );

    for (let item in respons.data) {
      if (respons.data.hasOwnProperty(item)) {
        orders.push({
          id: item,
          ...respons.data[item],
        });
      }
    }

    yield put(fetchOrdersSuccess(orders));
  } catch (error) {
    yield put(fetchOrdersFailed(error));
  }
}
