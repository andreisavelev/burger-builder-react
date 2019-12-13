import React from 'react';

import Aux from '../../../hoc/Auxiliary';
import Button from '../../ui/Button/Button';

const OrderSummary = props => {
    const ingredientsSummary = Object.keys(props.ingredients)
        .map(igKey => {
            return <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}
            </li>;
        });
    return (
        <Aux>
            <h3>Your order</h3>
            <p>Delicious burger with the following ingredients:</p>

            <ul>
                {ingredientsSummary}
            </ul>

            <p>Continue to chechout?</p>
            <Button buttonType="Danger" 
                    clicked={props.purchaseCancelled}>CANCEL</Button>
            <Button buttonType="Success" 
                    clicked={props.purchaseContinue}>ORDER</Button>
        </Aux>
    );
};

export default OrderSummary;