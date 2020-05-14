import React, { Component } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/ui/Spinner/Spinner";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { fetchOrders } from "../../store/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.onInitOrders(this.props.token, this.props.userId);
  }

  render() {
    let ordersList = <Spinner />;

    if (!this.props.loading) {
      ordersList = this.props.orders.map((item) => (
        <Order
          key={item.id}
          ingredients={item.ingredients}
          price={item.totalPrice}
        />
      ));
    }

    return <div>{ordersList}</div>;
  }
}

const mapStateToProps = function (state) {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    /**
     * Invokes when fetching starts
     * @param token {string}
     * @param userId {string}
     */
    onInitOrders: function (token, userId) {
      dispatch(fetchOrders(token, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
