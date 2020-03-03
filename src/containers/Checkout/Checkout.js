import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from './ContactData/ContactData';
import Aux from "../../hoc/Auxiliary";
import {purchaseInit} from "../../store/actions";

class Checkout extends Component {

    componentWilMount() {
        console.log('will mount');
        this.props.onInitPurchase();
    };

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    };

    render() {
        let purchasedRedirect = null;
        let summary = <Redirect to={'/'}/>;

        if (this.props.ingredients) {
            purchasedRedirect = this.props.purchased ? <Redirect to={'/'}/>: null;
            summary = (
                <Aux>
                    {purchasedRedirect}
                    <CheckoutSummary ingredients={this.props.ingredients}
                                     checkoutCancelled={this.checkoutCancelledHandler}
                                     checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={`${this.props.match.path}/contact-data`}
                           component={ContactData}/>
                </Aux>
            );
        }

        return summary;
    };
}

const mapStateToProps = function (state) {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

const mapDispatchToProps = function (dispatch) {
    return {
        onInitPurchase: () => dispatch(purchaseInit())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);