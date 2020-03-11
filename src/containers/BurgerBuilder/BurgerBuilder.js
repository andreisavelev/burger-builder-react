import React, {Component} from 'react';
import {connect} from 'react-redux';

import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/ui/Modal/Modal';
import Spinner from '../../components/ui/Spinner/Spinner';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import widthErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuilderActions from '../../store/actions/';

/**
 * @class
 * @classdesc Main burger builder component
 * @extends React.Component
 */
class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        if (this.props.isAuth) {
            this.setState({purchasing: true});
        } else {
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can`t be loaded!</p> : <Spinner/>;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        isAuth={this.props.isAuth}
                        price={this.props.totalPrice}/>
                </Aux>
            );

            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler}/>;
        }

        for (let key in disabledInfo) {
            if (disabledInfo.hasOwnProperty(key)) {
                disabledInfo[key] = disabledInfo[key] <= 0
            }
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing}
                       modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = function(state) {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    }
};

const mapDispatchToProps = function(dispatch) {
    return {
        onIngredientAdded: function(ingredientName) {
            dispatch(burgerBuilderActions.addIngredient(ingredientName));
        },
        onIngredientRemoved: function(ingredientName) {
            dispatch(burgerBuilderActions.removeIngredient(ingredientName));
        },
        onInitIngredients: function () {
            dispatch(burgerBuilderActions.initIngredients())
        },
        onInitPurchase: function () {
            dispatch(burgerBuilderActions.purchaseInit());
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(widthErrorHandler(BurgerBuilder, axios));