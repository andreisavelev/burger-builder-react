import React from 'react';

import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';

import Toolbar from '../navigation/Toolbar/Toolbar'

const Layout = props => (
    <Aux>
        <Toolbar />
        <main className={classes['burger-content']}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;