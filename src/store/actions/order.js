import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/**
 * Sync action creator for successful purchasing
 * @param id {string|number}
 * @param orderData {object}
 * @returns {{orderId: string|number, orderData: object, type: string}}
 */
export const purchaseBurgerSuccess = function(id, orderData) {
    console.log(orderData);
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
 * Async action creator to stating purchasing the burger
 * @param orderData
 * @returns {function(...[*]=)}
 */
export const purchaseBurger = function(orderData) {
    return  function(dispatch) {
        dispatch(purchaseBurgerStart());

        axios.post('/orders.json', orderData)
            .then(response => {
                console.log(response);
                dispatch(purchaseBurgerSuccess(response.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            });
    }
};