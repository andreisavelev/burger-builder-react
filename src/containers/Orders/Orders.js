import React, { useEffect, memo } from "react";
import { connect } from "react-redux";

import Spinner from "../../components/ui/Spinner/Spinner";
import Order from "../../components/Order/Order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import { fetchOrders } from "../../store/actions";

const Orders = memo(props => {
  let ordersList = <Spinner/>;

  useEffect(() => {
    props.onInitOrders(props.token, props.userId);
  }, []);

  if (!props.loading) {
    ordersList = props.orders.map((item) => (
      <Order
        key={item.id}
        ingredients={item.ingredients}
        price={item.totalPrice}
      />
    ));
  }

  return (
    <div style={{ marginTop: '76px' }}>{ordersList}</div>
  );
});

const mapStateToProps = function(state) {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    /**
     * Invokes when component did mount
     * @param token {string}
     * @param userId {string}
     */
    onInitOrders: function(token, userId) {
      dispatch(fetchOrders(token, userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(Orders, axios));
