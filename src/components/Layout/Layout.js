import React, { useState, useCallback, memo } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Auxiliary";
import classes from "./Layout.css";
import Toolbar from "../Navigation/Toolbar/Toolbar";
import SideDrawer from "../Navigation/SideDrawer/SideDrawer";

const Layout = memo(({ isAuthenticated, children }) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);
  const sideDrawerClosedHandler = useCallback(() => {
    setShowSideDrawer(true);
  }, []);
  const sideDrawerToggleHandler = useCallback(() => {
    setShowSideDrawer(!showSideDrawer);
  }, []);

  return (
    <Aux>
      <Toolbar
        drawerToggleClicked={sideDrawerToggleHandler}
        isAuth={isAuthenticated}
      />
      <SideDrawer
        open={showSideDrawer}
        isAuth={isAuthenticated}
        closed={sideDrawerClosedHandler}
      />
      <main className={classes.Content}>
        {children}
      </main>
    </Aux>
  );
});

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
