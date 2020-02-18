import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

/**
 * Action creator to add ingredient
 * @param ingredientName
 * @returns {{ingredientName: string, type: string}}
 */
export const addIngredient = function (ingredientName) {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    };
};

/**
 * Action creator to remove ingredient
 * @param ingredientName
 * @returns {{ingredientName: string, type: string}}
 */
export const removeIngredient = function (ingredientName) {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    };
};

/**
 * Action creator to set ingredients synchronously
 * @param ingredients {object}
 * @returns {{action: string, ingredients: array}}
 */
export const setIngredients = function(ingredients) {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients
    }
};

/**
 * Action creator to handle fallen ingredients fetching
 * @returns {{type: string}}
 */
export const fetchIngredientsFailed = function () {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED
    }
};

/**
 * Async action creator to fetch ingredients and set correct state in depending on that result
 * @returns {function(...[*]=)}
 */
export const initIngredients = function () {
    return function(dispatch) {
        axios.get('/ingredients.json')
            .then(res => dispatch(setIngredients(res.data)))
            .catch(() => {
                console.log(fetchIngredientsFailed());
                dispatch(fetchIngredientsFailed())
            });
    }
};