import * as actionTypes from "./actionTypes";
import axios from "../../axios-orders";

// SYNC ACTION CREATORS

/**
 * Sync action creator for initialization of burger purchasing
 * @returns {{type: string}}
 */
export const purchaseInit = function () {
  return {
    type: actionTypes.PURCHASE_INIT,
  };
};

/**
 * Sync action creator for successful purchasing
 * @param id {string|number}
 * @param orderData {object}
 * @returns {{orderId: string|number, orderData: object, type: string}}
 */
export const purchaseBurgerSuccess = function (id, orderData) {
  return {
    type: actionTypes.PURCHASE_BURGER_SUCCESS,
    orderId: id,
    orderData,
  };
};

/**
 * Sync action creator for failure purchasing
 * @param error {object}
 * @returns {{type: string, error: object}}
 */
export const purchaseBurgerFail = function (error) {
  return {
    type: actionTypes.PURCHASE_BURGER_FAIL,
    error,
  };
};

/**
 * Sync action creator to initialize burger purchasing
 * @returns {{type: string}}
 */
export const purchaseBurgerStart = function () {
  return {
    type: actionTypes.PURCHASE_BURGER_START,
  };
};

/**
 * Sync action creator for start fetching orders
 * @returns {{type: string}}
 */
export const fetchOrderStart = function () {
  return {
    type: actionTypes.FETCH_ORDERS_START,
  };
};

/**
 * Sync action creator for success fetched orders
 * @param orders {object[]}
 * @returns {{orders: object[], type: string}}
 */
export const fetchOrdersSuccess = function (orders) {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    orders,
  };
};

/**
 * Sync action creator for failed fetching orders
 * @param error {object}
 * @returns {{type: string, error: object}}
 */
export const fetchOrdersFailed = function (error) {
  return {
    type: actionTypes.FETCH_ORDERS_FAILED,
    error,
  };
};

/**
 * Async action creator to stating purchasing the burger
 * @param orderData {object}
 * @param token {string}
 * @returns {{type: string, payload: {orderData: object, token: string}}}
 */
export const purchaseBurger = function (orderData, token) {
  return {
    type: actionTypes.PURCHASE_BURGER,
    payload: {
      orderData,
      token,
    },
  };
};

/**
 * Async action creator for fetching orders
 * @param token {string}
 * @param userId {string}
 * @returns {{type: string, payload: {token: string, userId: string}}}
 */
export const fetchOrders = function (token, userId) {
  return {
    type: actionTypes.FETCH_ORDER,
    payload: {
      userId,
      token,
    },
  };
};
