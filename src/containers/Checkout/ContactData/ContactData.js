import React, {Component} from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/ui/Spinner/Spinner';
import Input from '../../../components/ui/Input/Input';

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
            },

            street: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your address',
                    type: 'text'
                },
                value: ''
            },

            zipCode: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your zip code',
                    type: 'number'
                },
                value: ''
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your country',
                    type: 'string'
                },
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    placeholder: 'Please, enter your email',
                    type: 'email'
                },
                value: ''
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
                value: ''
            }
        },

        loading: false
    };

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

        this.setState({
            loading: true
        });

        axios.post('/orders.json', order)
            .then(response => {
                this.setState({
                    loading: false
                });

                this.props.history.push('/');
            })
            .catch(error => this.setState({
                loading: false
            }));
    };

    onInputChangedHandler = (event, inputId) => {
        const orderForm = {
            ...this.state.orderForm
        };
        const updatedFormElement = {
            ...orderForm[inputId],
            value: event.target.value
        };

        orderForm[inputId] = updatedFormElement;
        this.setState({
            orderForm: orderForm
        })
    };

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
                           value={item.config.value}/>
                ))}
                <Button btnType={'Success'}>
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
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

export default ContactData;