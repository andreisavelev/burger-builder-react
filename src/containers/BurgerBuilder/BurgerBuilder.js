import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls.js'

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.5,
    bacon: 0.7
};

/**
 * @classdesc Main burger builder component that includes Burger and Build Controls
 * @class
 * @version 1.0.0
 */
class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4
    }

    /**
     * Adding an new ingredient and calculating new priceAddition
     * @type {function}
     * @param {string} type - Type of selected ingredient 
     */
    addIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const priceAddition = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;

        updatedIngredients[type] = updatedCount;

        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        });
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} />
            </Aux>
        );
    }
}

export default BurgerBuilder;