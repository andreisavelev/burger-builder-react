import React, { useState, useEffect, memo, useCallback } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import Input from "../../components/ui/Input/Input";
import Button from "../../components/ui/Button/Button";
import classes from "./Auth.css";
import { auth, setAuthRedirectPath } from "../../store/actions/index";
import Aux from "../../hoc/Auxiliary";
import Spinner from "../../components/ui/Spinner/Spinner";

/**
 *
 * @param {Object} props
 * @returns {JSX.Element}
 * @constructor
 */
const Auth = (props) => {

  const [authForm, setAuthForm] = useState({
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Please, enter your email",
          type: "email",
        },
        validation: {
          required: true,
          isEmail: true,
          valid: false,
        },
        value: "",
        touched: false,
      },

      password: {
        elementType: "input",
        elementConfig: {
          placeholder: "Please, enter your password",
          type: "password",
        },
        validation: {
          required: true,
          minLength: 6,
          valid: false,
        },
        value: "",
        touched: false,
      },
    },
  });
  const [isSignUp, setIsSignUp] = useState(false);

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

  const onInputChangedHandler = useCallback((event, controlName) => {
    const updatedControls = {
      ...authForm.controls,
      [controlName]: {
        ...authForm.controls[controlName],
        value: event.target.value,
        validation: {
          ...authForm.controls[controlName].validation,
          valid: checkValidity(
            event.target.value,
            authForm.controls[controlName].validation,
          ),
        },
        touched: true,
      },
    };

    setAuthForm({
      controls: {
        ...updatedControls,
      },
    });
  }, [setAuthForm, authForm, checkValidity]);

  const onAuth = useCallback((event) => {
    event.preventDefault();

    props.onAuth(
      authForm.controls.email.value,
      authForm.controls.password.value,
      authForm.isSignUp,
    );
  }, [authForm]);

  const onSwitchModeHandler = useCallback(() => {
    setIsSignUp(!isSignUp);
  }, [isSignUp, setIsSignUp]);

  useEffect(() => {
    if (!props.buildingBurger && props.authRedirectPath !== "/") {
      props.onSetAuthRedirectPath();
    }
  }, []);

  const orderFormArray = [];

  for (let key in authForm.controls) {
    if (authForm.controls.hasOwnProperty(key)) {
      orderFormArray.push({
        id: key,
        config: authForm.controls[key],
      });
    }
  }

  let form = (
    <Aux>
      <form onSubmit={onAuth}>
        {orderFormArray.map((item) => (
          <Input
            key={item.id}
            changed={(event) => onInputChangedHandler(event, item.id)}
            elementType={item.config.elementType}
            elementConfig={item.config.elementConfig}
            valid={
              item.config.validation ? item.config.validation.valid : true
            }
            touched={item.config.touched}
            value={item.config.value}
          />
        ))}
        <Button btnType={"Success"}>SUBMIT</Button>
      </form>

      <Button btnType={"Danger"} clicked={onSwitchModeHandler}>
        SWITCH TO {isSignUp ? "SIGN-IN" : "SIGN-UP"}
      </Button>
    </Aux>
  );

  let errorMessage = null;

  if (props.error) {
    errorMessage = (
      <p
        style={{
          padding: "15px 10px",
          display: "inline-block",
          border: "1px solid red",
          color: "red",
          textAlign: "center",
        }}
      >
        {props.error.message}
      </p>
    );
  }

  if (props.loading) {
    form = <Spinner/>;
  }

  return !props.isAuth ? (
    <div className={classes.AuthWrapper}>
      <div className={classes.Auth}>
        {errorMessage}
        {form}
      </div>
    </div>
  ) : (
    <Redirect to={props.authRedirectPath}/>
  );
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const maoDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(auth(email, password, isSignUp)),
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, maoDispatchToProps)(memo(Auth));
