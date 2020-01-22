import React, {Component} from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    };

    componentDidMount() {
        const search = new URLSearchParams(this.props.location.search);
        const ingredients = {};

        for (let item of search.entries()) {
            ingredients[item[0]] = +item[1];
        }

        this.setState({
            ingredients
        });
    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    };

    checkoutContinuedHandler = () => {
        this.props.history.push('/checkout/contact-data');
    };

    render() {
        return (
            <CheckoutSummary ingredients={this.state.ingredients}
                             checkoutCancelled={this.checkoutCancelledHandler}
                             checkoutContinued={this.checkoutContinuedHandler} />
        );
    }
}

export default Checkout;