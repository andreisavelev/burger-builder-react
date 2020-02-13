import * as actionTypes from './actions';

const initialState = {
    ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
    },
    totalPrice: 4
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

/**
 * Main reducer
 * @param state {object}
 * @param action {object}
 * @param action.type {string}
 * @param action.ingredientName {string}
 * @returns {{}|{totalPrice: number, ingredients: {bacon: number, salad: number, meat: number, cheese: number}}}
 */
const reducer = function (state = initialState, action) {
    // store prev ingredient value
    let ingredientValue = state.ingredients[action.ingredientName];

    switch (action.type) {
        case (actionTypes.ADD_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: ingredientValue + 1
                },
                totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
            };

        case (actionTypes.REMOVE_INGREDIENT):
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: ingredientValue > 0 ? ingredientValue - 1 : 0
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            };

        default:
            return  state;

    }
};

export default reducer;