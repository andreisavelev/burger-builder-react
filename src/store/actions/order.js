import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

// SYNC ACTION CREATORS

/**
 * Sync action creator for initialization of burger purchasing
 * @returns {{type: string}}
 */
export const purchaseInit = function () {
    return {
        type: actionTypes.PURCHASE_INIT
    }
};

/**
 * Sync action creator for successful purchasing
 * @param id {string|number}
 * @param orderData {object}
 * @returns {{orderId: string|number, orderData: object, type: string}}
 */
export const purchaseBurgerSuccess = function(id, orderData) {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData
    }
};

/**
 * Sync action creator for failure purchasing
 * @param error {object}
 * @returns {{type: string, error: object}}
 */
export const purchaseBurgerFail = function (error) {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error
    }
};

/**
 * Sync action creator to initialize burger purchasing
 * @returns {{type: string}}
 */
export const purchaseBurgerStart = function () {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
};

/**
 * Sync action creator for start fetching orders
 * @returns {{type: string}}
 */
export const fetchOrderStart = function () {
    return {
        type: actionTypes.FETCH_ORDERS_START
    }
};

/**
 * Sync action creator for success fetched orders
 * @param orders {object[]}
 * @returns {{orders: object[], type: string}}
 */
export const fetchOrdersSuccess = function (orders) {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders
    }
};

/**
 * Sync action creator for failed fetching orders
 * @param error {object}
 * @returns {{type: string, error: object}}
 */
export const fetchOrdersFailed = function (error) {
    return {
        type: actionTypes.FETCH_ORDERS_FAILED,
        error
    }
};

// ASYNC ACTION CREATORS

/**
 * Async action creator to stating purchasing the burger
 * @param orderData {object}
 * @returns {function(...[*]=)}
 */
export const purchaseBurger = function(orderData) {
    return  function(dispatch) {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
            .then(response => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
};

/**
 * Async action creator for fetching orders
 * @returns {function(...[*]=)}
 */
export const fetchOrders = function() {
    return function (dispatch) {
        dispatch(fetchOrderStart());

        axios.get('/orders.json')
            .then(respons => {
                let orders = [];

                for (let item in respons.data) {
                    if (respons.data.hasOwnProperty(item)) {
                        orders.push({
                            id: item,
                            ...respons.data[item]
                        });
                    }
                }

                dispatch(fetchOrdersSuccess(orders));
            })
            .catch(error => dispatch(fetchOrdersFailed(error)));
    }
};