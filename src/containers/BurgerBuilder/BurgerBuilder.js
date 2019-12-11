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
        totalPrice: 4,
        purchasable: false
    }

    /**
     * Caclucate sum of added ingredients and 
     * convert the result in to a boolean
     * @type {Function}
     * @param ingredients {Object} - key-value list of ingredients
     */
    updatePurchaseSate(ingredients) {
        let sum = Object.values(ingredients)
            .reduce((sum, item) => sum + item, 0);

        this.setState({
            purchasable: sum > 0
        });
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
        this.updatePurchaseSate(updatedIngredients);
    }

    removeIngredientHandler = type => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount > 0 ? oldCount - 1 : 0;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        const priceDedaction = INGREDIENTS_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDedaction;

        if (updatedCount >= 0 ) {
            updatedIngredients[type] = updatedCount;

            this.setState({
                ingredients: updatedIngredients,
                totalPrice: newPrice
            });
            this.updatePurchaseSate(updatedIngredients);
        }
    }

    render() {
        const disabledControls = {
            ...this.state.ingredients
        };

        for (let key in disabledControls) {
            if (disabledControls.hasOwnProperty(key)) {
                disabledControls[key] = disabledControls[key] === 0;
            }
        }

        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} 
                               ingredientRemoved={this.removeIngredientHandler} 
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               disabled={disabledControls} />
            </Aux>
        );
    }
}

export default BurgerBuilder;