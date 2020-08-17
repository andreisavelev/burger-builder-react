import React, { Suspense, lazy, useEffect, memo } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Layout from "./components/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions";

const AsyncAuth = lazy(() => {
  return import("./containers/Auth/Auth");
});
const AsyncCheckout = lazy(() => {
  return import("./containers/Checkout/Checkout");
});
const AsyncOrders = lazy(() => {
  return import("./containers/Orders/Orders");
});

/**
 * The main application's component, contains routes and layout
 * @param {function} onTryAutoAuth
 * @param {boolean} isAuth
 */
const App = ({ onTryAutoAuth, isAuth }) => {
  useEffect(() => {
    onTryAutoAuth();
  }, [onTryAutoAuth]);

  let routes = (
    <Switch>
      <Route path={"/"} exact component={BurgerBuilder}/>
      <Route path={"/auth"} component={AsyncAuth}/>
      <Route
        component={() => (
          <h1 style={{ textAlign: "center" }}>
            Sorry... something goes wrong...
          </h1>
        )}
      />
    </Switch>
  );

  if (isAuth) {
    routes = (
      <Switch>
        <Route path={"/"} exact component={BurgerBuilder}/>
        <Route path={"/orders"} component={AsyncOrders}/> :
        <Route path={"/checkout"} render={(props) => <AsyncCheckout {...props}/>}/>
        <Route path={"/logout"} component={Logout}/>
        <Route path={"/auth"} component={AsyncAuth}/>
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
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>
          {routes}
        </Suspense>
      </Layout>
    </div>
  );
};

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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(memo(App)));
