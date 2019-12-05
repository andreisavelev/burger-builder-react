import React from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.css';

const Layout = props => (
    <Aux>
        <div>Toolbar, SideDrower, Backdrop</div>
        <main className={classes['burger-content']}>
            {props.children}
        </main>
    </Aux>
);

export default Layout;