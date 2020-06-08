import * as actionTypes from "../actions/actionTypes";

const initialState = {
  ingredients: null,
  totalPrice: 4,
  error: false,
  building: false,
};

const INGREDIENT_PRICES = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7,
};

/**
 * Common function helper to get the updated state
 * @param state {object}
 * @param action {object}
 * @param newIngredientValue {number}
 * @param newTotalPrice {number}
 * @param newBuildingValue {boolean}
 * @returns {{totalPrice: number, ingredients: object}}
 */
function getUpdatedState(
  state,
  action,
  newIngredientValue,
  newTotalPrice,
  newBuildingValue
) {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [action.ingredientName]: newIngredientValue,
    },
    totalPrice: newTotalPrice,
    building: newBuildingValue,
  };
}

/**
 * The state initialization after ingredients was fetched
 * @param state {object}
 * @param action {object}
 * @returns {{ingredients: (null|{}|Array), error: boolean}}
 */
function getFetchedStated(state, action) {
  let ingredients = { ...action.ingredients };

  return {
    ...state,
    ingredients: {
      salad: ingredients.salad,
      bacon: ingredients.bacon,
      cheese: ingredients.cheese,
      meat: ingredients.cheese,
    },
    totalPrice: 4,
    error: false,
    building: false,
  };
}

/**
 * Set error state after fetching ingredients was failed
 * @param state {object}
 * @returns {{error: boolean}}
 */
function getFailedFetchIngredientsState(state) {
  return {
    ...state,
    building: false,
    error: true,
  };
}

/**
 * Main reducer to get state with added or removed ingredient and updated total price
 * @param state {object}
 * @param action {object}
 * @param action.type {string}
 * @param action.ingredientName {string}
 * @returns {{}|{totalPrice: number, ingredients: {bacon: number, salad: number, meat: number, cheese: number}}}
 */
const reducer = function (state = initialState, action) {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT:
      return getUpdatedState(
        state,
        action,
        state.ingredients[action.ingredientName] + 1,
        state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        true
      );

    case actionTypes.REMOVE_INGREDIENT:
      return getUpdatedState(
        state,
        action,
        state.ingredients[action.ingredientName] > 0
          ? state.ingredients[action.ingredientName] - 1
          : 0,
        state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        true
      );

    case actionTypes.SET_INGREDIENTS:
      return getFetchedStated(state, action);

    case actionTypes.FETCH_INGREDIENTS_FAILED:
      return getFailedFetchIngredientsState(state);

    default:
      return state;
  }
};

export default reducer;
