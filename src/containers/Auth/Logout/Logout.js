import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import {logOut} from "../../../store/actions/index";

/**
 * @class
 * @classdesc Logout and redirect to the index page
 */
class Logout extends Component {
    componentDidMount() {
        this.props.onLogout();
    }

    render() {
        return <Redirect to={'/'} />;
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logOut())
    }
};

export default connect(null, mapDispatchToProps)(Logout);