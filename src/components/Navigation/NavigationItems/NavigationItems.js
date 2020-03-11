import React from 'react';

import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = ({isAuth}) => {
    let authAction = !isAuth ?
        <NavigationItem link="/auth">
            Auth
        </NavigationItem> :
        <NavigationItem link="/logout">
            Log out
        </NavigationItem>;

    let orders = isAuth ?
        <NavigationItem link="/orders">
            Orders
        </NavigationItem>:
        null;

    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/" exact>
                Burger Builder
            </NavigationItem>

            {orders}
            {authAction}
        </ul>
    );
}

export default navigationItems;