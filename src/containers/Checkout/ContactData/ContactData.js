import React, {Component} from 'react';

import axios from '../../../axios-orders';
import Button from '../../../components/ui/Button/Button';
import classes from './ContactData.css';
import Spinner from '../../../components/ui/Spinner/Spinner';

class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },

        loading: false
    };

    orderHandler = event => {
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.price,
            customer: {
                name: 'Andrey Savelev',
                address: {
                    street: 'Teststreet 1',
                    zipCode: '12412'
                },
                email: 'test@test.com',
                deliveryMethod: 'fastest'
            }
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

    render() {
        let form = (
            <form>
                <input type="text"
                       name="name"
                       placeholder="Your Name"/>
                <input type="email"
                       name="email"
                       placeholder="Your Email"/>
                <input type="number"
                       name="postal"
                       placeholder="Your Postal Code"/>
                <Button btnType={'Success'}
                        clicked={this.orderHandler}>
                    ORDER
                </Button>
            </form>
        );

        if (this.state.loading) {
            form = <Spinner />;
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