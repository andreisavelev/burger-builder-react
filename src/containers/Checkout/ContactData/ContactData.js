import React, {Component} from 'react';
import {connect} from 'react-redux';

import axios from '../../../axios-orders';
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import {purchaseBurger} from '../../../store/actions/index'

/**
 * @class
 * @classdesc Form to store orders
 */
class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your name',
                    type: 'text'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    valid: false
                }
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your address',
                    type: 'text'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    valid: false
                }
            },

            zipCode: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your zip code',
                    type: 'number'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    valid: false
                }
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your country',
                    type: 'string'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    valid: false
                }
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your email',
                    type: 'email'
                },
                value: '',
                touched: false,
                validation: {
                    required: true,
                    valid: false
                }
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        {
                            value: 'fastest',
                            displayValue: 'Fastest'
                        },
                        {
                            value: 'cheapest',
                            displayValue: 'Cheapest'
                        }
                    ]
                },
                value: 'fastest'
            }
        },

        formIsValid: false
    };

    /**
     * Run validation checks
     * @param value
     * @param rule
     * @returns {boolean}
     */
    checkValidity(value, rule) {
        let isValid = true;


        if (rule && rule.required) {
            isValid = value.trim() !== '';
        }

        return isValid;
    }

    /**
     * Handle the submit event
     * @param event
     */
    orderHandler = event => {
        const orderData = {};
        const {orderForm} = this.state;
        for (let formElementId in orderForm) {
            if (orderForm.hasOwnProperty(formElementId)) {
                orderData[formElementId] = orderForm[formElementId].value;
            }
        }

        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: orderData
        };

        event.preventDefault();

        this.props.onOrderBurger(order, this.props.token);
    };

    /**
     * Handle the input changes
     * @param event
     * @param inputId
     */
    onInputChangedHandler = (event, inputId) => {
        const orderForm = {
            ...this.state.orderForm
        };
        let validFormElements = [];
        let formIsValid = false;

        orderForm[inputId] = {
            ...orderForm[inputId],
            validation: {
                ...orderForm[inputId].validation,
                touched: true,
                valid: this.checkValidity(
                    event.target.value,
                    orderForm[inputId].validation
                )
            },
            value: event.target.value
        };

        validFormElements = Object.values(orderForm)
            .map(item => item.validation ? item.validation.valid : true)
            .filter(item => !item);

        formIsValid = !!validFormElements.length;

        this.setState({
            orderForm,
            formIsValid
        });
    };

    /**
     * @override Component.render
     * @returns {*}
     */
    render() {
        const orderFormArray = [];

        for (let key in this.state.orderForm) {
            if (this.state.orderForm.hasOwnProperty(key)) {
                orderFormArray.push({
                    id: key,
                    config: this.state.orderForm[key]
                });
            }
        }

        let form = (
            <form onSubmit={this.orderHandler}>
                {orderFormArray.map(item => (
                    <Input key={item.id}
                           changed={event => this.onInputChangedHandler(event, item.id)}
                           elementType={item.config.elementType}
                           elementConfig={item.config.elementConfig}
                           valid={item.config.validation ? item.config.validation.valid : true}
                           touched={item.config.touched}
                           value={item.config.value}/>
                ))}
                <Button btnType={'Success'} disabled={this.state.formIsValid}>
                    ORDER
                </Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>;
        }

        return (
            <div className={classes.ContactData}>
                <h1>Enter your contact data</h1>
                {form}
            </div>
        );
    }
}

const mapStateToProps = function (state) {
    return {
        ingredients: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token
    };
};

const mapDispatchToProps = function(dispatch) {
    return {
        onOrderBurger: (orderData, token) => dispatch(purchaseBurger(orderData, token))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));