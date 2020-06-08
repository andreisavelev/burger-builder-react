import React, { Component } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoAuth();
  }

  render() {
    let routes = (
      <Switch>
        <Route path={"/"} exact component={BurgerBuilder} />
        <Route path={"/auth"} component={Auth} />
        <Route
          component={() => (
            <h1 style={{ textAlign: "center" }}>
              Sorry... something goes wrong...
            </h1>
          )}
        />
      </Switch>
    );

    if (this.props.isAuth) {
      routes = (
        <Switch>
          <Route path={"/"} exact component={BurgerBuilder} />
          <Route path={"/orders"} component={Orders} /> :
          <Route path={"/checkout"} component={Checkout} />
          <Route path={"/logout"} component={Logout} />
          <Route path={"/auth"} component={Auth} />
          <Route
            component={() => (
              <h1 style={{ textAlign: "center" }}>
                Sorry... something goes wrong...
              </h1>
            )}
          />
        </Switch>
      );
    }

    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoAuth: () => {
      dispatch(authCheckState());
    },
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
