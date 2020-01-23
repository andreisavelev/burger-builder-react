import React, {Component} from 'react';

import Spinner from '../../components/ui/Spinner/Spinner'
import Order from '../../components/Order/Order';
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    };

    componentDidMount() {
        axios.get('/orders.json')
            .then(respons => {
                let orders = [];

                for (let item in respons.data) {
                    if (respons.data.hasOwnProperty(item)) {
                        orders.push({
                            id: item,
                            ...respons.data[item]
                        });
                    }
                }

                this.setState({
                    orders,
                    loading: false
                });
            })
            .catch(error => this.setState({
                loading: false
            }));
    }

    render() {
        let ordersList = <Spinner/>;

        if (!this.state.loading) {
            ordersList = this.state.orders.map(item => <Order key={item.id}/>)
        }

        return (
            <div>
                {ordersList}
            </div>
        )
    }
}

export default withErrorHandler(Orders, axios);
