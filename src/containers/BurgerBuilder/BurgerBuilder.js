import React, { memo, useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/ui/Modal/Modal";
import Spinner from "../../components/ui/Spinner/Spinner";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import widthErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-orders";
import * as burgerBuilderActions from "../../store/actions/";

/**
 * Container for the burger controls
 */
const BurgerBuilder =  memo((props) => {
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    props.onInitIngredients();
  }, []);

  const updatePurchaseState = useCallback((ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igKey) => {
        return ingredients[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }, []);

  const purchaseHandler = useCallback(() => {
    if (props.isAuthenticated) {
      setPurchasing(true);
    } else {
      props.history.push("/auth");
    }
  }, [setPurchasing]);

  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
  }, [setPurchasing]);

  const purchaseContinueHandler = useCallback(() => {
    props.onInitPurchase();
    props.history.push("/checkout");
  }, []);

    const disabledInfo = {
      ...props.ingredients,
    };
    let orderSummary = null;
    let burger = props.error ? (
      <p>Ingredients can`t be loaded!</p>
    ) : (
      <Spinner />
    );

    if (props.ingredients) {
      burger = (
        <div style={{
          display: 'grid',
          gridAutoRows: '100% 318px'
        }}>
          <Burger ingredients={props.ingredients} />
          <BuildControls
            ingredientAdded={props.onIngredientAdded}
            ingredientRemoved={props.onIngredientRemoved}
            disabled={disabledInfo}
            purchasable={updatePurchaseState(props.ingredients)}
            ordered={purchaseHandler}
            isAuth={props.isAuthenticated}
            price={props.totalPrice}
          />
        </div>
      );

      orderSummary = (
        <OrderSummary
          ingredients={props.ingredients}
          price={props.totalPrice}
          purchaseCancelled={purchaseCancelHandler}
          purchaseContinued={purchaseContinueHandler}
        />
      );
    }

    for (let key in disabledInfo) {
      if (disabledInfo.hasOwnProperty(key)) {
        disabledInfo[key] = disabledInfo[key] <= 0;
      }
    }

    return (
      <Aux>
        {purchasing && (<Modal
          show={purchasing}
          modalClosed={purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>)}
        {burger}
      </Aux>
    );
});

const mapStateToProps = function (state) {
  return {
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = function (dispatch) {
  return {
    onIngredientAdded: function (ingredientName) {
      dispatch(burgerBuilderActions.addIngredient(ingredientName));
    },
    onIngredientRemoved: function (ingredientName) {
      dispatch(burgerBuilderActions.removeIngredient(ingredientName));
    },
    onInitIngredients: function () {
      dispatch(burgerBuilderActions.initIngredients());
    },
    onInitPurchase: function () {
      dispatch(burgerBuilderActions.purchaseInit());
    },
    onSetAuthRedirectPath: function (path) {
      dispatch(burgerBuilderActions.setAuthRedirectPath(path));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(widthErrorHandler(BurgerBuilder, axios));
