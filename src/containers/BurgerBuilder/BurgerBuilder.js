import React, { memo, useState, useCallback, useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";

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
 * @param {object} history
 */
const BurgerBuilder = ({ history }) => {
  const [purchasing, setPurchasing] = useState(false);

  // dispatchers
  const dispatch = useDispatch();
  const ingredients = useSelector(state => (state.burgerBuilder.ingredients));
  const totalPrice = useSelector(state => (state.burgerBuilder.totalPrice));
  const error = useSelector(state => (state.burgerBuilder.error));
  const isAuthenticated =  useSelector(state => (state.auth.token !== null));

  // selectors
  const onIngredientAdded = useCallback((ingredientName) => {
    dispatch(burgerBuilderActions.addIngredient(ingredientName))
  }, [dispatch]);
  const onIngredientRemoved = useCallback((ingredientName) => {
    dispatch(burgerBuilderActions.removeIngredient(ingredientName));
  }, [dispatch]);
  const onInitIngredients = useCallback(() => {
    dispatch(burgerBuilderActions.initIngredients());
  }, [dispatch]);
  const onInitPurchase = useCallback(() => {
    dispatch(burgerBuilderActions.purchaseInit());
  }, []);

  useEffect(() => {
    onInitIngredients();
  }, [onInitIngredients]);

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
    if (isAuthenticated) {
      setPurchasing(true);
    } else {
      history.push("/auth");
    }
  }, [setPurchasing, history, isAuthenticated]);

  const purchaseCancelHandler = useCallback(() => {
    setPurchasing(false);
  }, [setPurchasing]);

  const purchaseContinueHandler = useCallback(() => {
    onInitPurchase();
    history.push("/checkout");
  }, [onInitPurchase, history]);

  const disabledInfo = {
    ...ingredients,
  };
  let orderSummary = null;
  let burger = error ? (
    <p>Ingredients can`t be loaded!</p>
  ) : (
    <Spinner/>
  );

  if (ingredients) {
    burger = (
      <div style={{
        display: "grid",
        gridAutoRows: "100% 318px",
      }}>
        <Burger ingredients={ingredients}/>
        <BuildControls
          ingredientAdded={onIngredientAdded}
          ingredientRemoved={onIngredientRemoved}
          disabled={disabledInfo}
          purchasable={updatePurchaseState(ingredients)}
          ordered={purchaseHandler}
          isAuth={isAuthenticated}
          price={totalPrice}
        />
      </div>
    );

    orderSummary = (
      <OrderSummary
        ingredients={ingredients}
        price={totalPrice}
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
};

export default widthErrorHandler(memo(BurgerBuilder), axios);
