import React, { memo, useCallback } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import Aux from "../../hoc/Auxiliary";
import { purchaseInit } from "../../store/actions";

const Checkout = (props) => {
  const checkoutCancelledHandler = useCallback(() => {
    props.history.goBack();
  }, []);

  const checkoutContinuedHandler = useCallback(() => {
    props.history.replace("/checkout/contact-data");
  }, []);

  let purchasedRedirect = null;
  let summary = <Redirect to={"/"}/>;

  if (props.ingredients) {
    purchasedRedirect = props.purchased ? <Redirect to={"/"}/> : null;
    summary = (
      <Aux>
        {purchasedRedirect}
        <CheckoutSummary
          ingredients={props.ingredients}
          checkoutCancelled={checkoutCancelledHandler}
          checkoutContinued={checkoutContinuedHandler}
        />
        <Route
          path={`${props.match.path}/contact-data`}
          component={ContactData}
        />
      </Aux>
    );
  }

  return summary;
};

const mapStateToProps = function(state) {
  return {
    ingredients: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    onInitPurchase: () => dispatch(purchaseInit()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(memo(Checkout));
