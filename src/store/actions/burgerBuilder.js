import * as actionTypes from "./actionTypes";

/**
 * Action creator to add ingredient
 * @param ingredientName
 * @returns {{ingredientName: string, type: string}}
 */
export const addIngredient = function (ingredientName) {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName,
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
    ingredientName,
  };
};

/**
 * Action creator to set ingredients synchronously
 * @param ingredients {object}
 * @returns {{action: string, ingredients: array}}
 */
export const setIngredients = function (ingredients) {
  return {
    type: actionTypes.SET_INGREDIENTS,
    ingredients,
  };
};

/**
 * Action creator to handle fallen ingredients fetching
 * @returns {{type: string}}
 */
export const fetchIngredientsFailed = function () {
  return {
    type: actionTypes.FETCH_INGREDIENTS_FAILED,
  };
};

/**
 * Aciton creator for ingredients
 * @returns {{type: string}}
 */
export const initIngredients = function () {
  return {
    type: actionTypes.INIT_INGEREDIENTS,
  };
};
