import React, { memo, useEffect } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import { logOut } from "../../../store/actions/index";

/**
 *
 * @param {function} onLogout
 * @returns {JSX.Element}
 * @constructor
 */
const Logout = ({ onLogout }) => {
  useEffect(() => {
    onLogout();
  }, [onLogout]);


  return <Redirect to={"/"}/>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(logOut()),
  };
};

export default connect(null, mapDispatchToProps)(memo(Logout));
