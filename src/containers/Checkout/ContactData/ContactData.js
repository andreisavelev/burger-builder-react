import React, { memo, useState, useCallback } from "react";
import { connect } from "react-redux";

import axios from "../../../axios-orders";
import Button from "../../../components/ui/Button/Button";
import classes from "./ContactData.css";
import Spinner from "../../../components/ui/Spinner/Spinner";
import Input from "../../../components/ui/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import { purchaseBurger } from "../../../store/actions/index";

/**
 * Contact Data - collects and send the data about user
 * @param {Object} props
 * @param {Object[]} props.ingredients - an ingredients collection
 * @param {number} props.price - a price of the burger
 */
const ContactData = memo((props) => {
  const [orderForm, setOrderForm] = useState({
    name: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please, enter your name",
        type: "text",
      },
      value: "",
      touched: false,
      validation: {
        required: true,
        valid: false,
      },
    },

    street: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please, enter your address",
        type: "text",
      },
      value: "",
      touched: false,
      validation: {
        required: true,
        valid: false,
      },
    },

    zipCode: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please, enter your zip code",
        type: "number",
      },
      value: "",
      touched: false,
      validation: {
        required: true,
        valid: false,
      },
    },
    country: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please, enter your country",
        type: "string",
      },
      value: "",
      touched: false,
      validation: {
        required: true,
        valid: false,
      },
    },
    email: {
      elementType: "input",
      elementConfig: {
        placeholder: "Please, enter your email",
        type: "email",
      },
      value: "",
      touched: false,
      validation: {
        required: true,
        valid: false,
      },
    },
    deliveryMethod: {
      elementType: "select",
      elementConfig: {
        options: [
          {
            value: "fastest",
            displayValue: "Fastest",
          },
          {
            value: "cheapest",
            displayValue: "Cheapest",
          },
        ],
      },
      value: "fastest",
    },
  });

  const [formIsValid, setFormIsValid] = useState(false);

  /**
   * Run validation checks
   * @param value
   * @param rule
   * @returns {boolean}
   */
  const checkValidity = useCallback((value, rule) => {
    let isValid = true;

    if (rule && rule.required) {
      isValid = value.trim() !== "";
    }

    return isValid;
  }, []);

  /**
   * Handle the submit event
   * @param event
   */
  const orderHandler = useCallback((event) => {
    const orderData = {};

    for (let formElementId in orderForm) {
      if (orderForm.hasOwnProperty(formElementId)) {
        orderData[formElementId] = orderForm[formElementId].value;
      }
    }

    const order = {
      ingredients: props.ingredients,
      totalPrice: props.price,
      customer: orderData,
      userId: props.userId,
    };

    event.preventDefault();

    formIsValid && props.onOrderBurger(order, props.token);
  }, [orderForm]);

  /**
   * Handle the input changes
   * @param event
   * @param inputId
   */
  const onInputChangedHandler = useCallback((event, inputId) => {
    const updatedOrderForm = {
      ...orderForm,
    };
    let validFormElements = [];

    updatedOrderForm[inputId] = {
      ...updatedOrderForm[inputId],
      validation: {
        ...updatedOrderForm[inputId].validation,
        touched: true,
        valid: checkValidity(
          event.target.value,
          updatedOrderForm[inputId].validation,
        ),
      },
      value: event.target.value,
    };

    validFormElements = Object.values(updatedOrderForm)
      .map((item) => (item.validation ? item.validation.valid : true))
      .filter((item) => !item);

    setOrderForm(updatedOrderForm);
    setFormIsValid(!!validFormElements.length);
  }, [orderForm, setOrderForm, setFormIsValid]);

  /**
   * @override Component.render
   * @returns {*}
   */
  const orderFormArray = [];

  for (let key in orderForm) {
    if (orderForm.hasOwnProperty(key)) {
      orderFormArray.push({
        id: key,
        config: orderForm[key],
      });
    }
  }
  console.log(formIsValid);

  let form = (
    <form onSubmit={orderHandler}>
      {orderFormArray.map((item) => (
        <Input
          key={item.id}
          changed={(event) => onInputChangedHandler(event, item.id)}
          elementType={item.config.elementType}
          elementConfig={item.config.elementConfig}
          valid={item.config.validation && item.config.validation.valid}
          touched={item.config.touched}
          value={item.config.value}
        />
      ))}
      <Button btnType={"Success"} disabled={formIsValid}>
        ORDER
      </Button>
    </form>
  );

  if (props.loading) {
    form = <Spinner/>;
  }

  return (
    <div className={classes.ContactData}>
      <h1>Enter your contact data</h1>
      {form}
    </div>
  );
});

const mapStateToProps = function(state) {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = function(dispatch) {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withErrorHandler(ContactData, axios));
