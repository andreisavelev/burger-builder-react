import React, {Component} from 'react';
import {Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import {authCheckState} from "./store/actions";

class App extends Component {
    componentDidMount() {
        this.props.onTryAutoAuth();
    }

    render() {
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path={'/'}
                               exact
                               component={BurgerBuilder}/>
                        <Route path={'/orders'}
                               component={Orders}/>
                        <Route path={'/checkout'}
                               component={Checkout}/>
                        <Route path={'/logout'}
                               component={Logout}/>
                        <Route path={'/auth'}
                               component={Auth}/>
                    </Switch>
                </Layout>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoAuth: () => {
            dispatch(authCheckState())
        }
    }
};

export default connect(null, mapDispatchToProps)(App);
