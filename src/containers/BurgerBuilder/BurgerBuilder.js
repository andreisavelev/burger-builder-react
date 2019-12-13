import React, { Component } from 'react';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/burger/Burger';
import BuildControls from '../../components/burger/BuildControls/BuildControls.js';
import Modal from '../../components/ui/Modal/Modal';
import Backdrop from '../../components/ui/Backdrop/Backdrop';
import OrderSummary from '../../components/burger/OrderSummary/OrderSummary';

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
        purchasable: false,
        purchasing: false
    }

    /**
     * Handling click on order button
     * @type {Function}
     */
    purchaseHandler() {
        this.setState({
            purchasing: true
        });
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

    purchaseCancaleHandler() {
        this.setState({
            purchasing: false
        });
    }

    purchaseContinueHandler = () => {
        alert('You continue!');
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
                <Backdrop show={this.state.purchasing} 
                          closeModal={() => {this.purchaseCancaleHandler()}} />
                <Modal show={this.state.purchasing}>
                    <OrderSummary ingredients={this.state.ingredients} 
                                  purchaseCancelled={() => this.purchaseCancaleHandler()}
                                  purchaseContinue={() => this.purchaseContinueHandler()} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls ingredientAdded={this.addIngredientHandler} 
                               ingredientRemoved={this.removeIngredientHandler} 
                               price={this.state.totalPrice}
                               purchasable={this.state.purchasable}
                               ordered={() => this.purchaseHandler()}
                               disabled={disabledControls} />
            </Aux>
        );
    }
}

export default BurgerBuilder;