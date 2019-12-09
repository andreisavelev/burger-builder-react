import React from 'react';

import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

/**
 * Main burger builder compoent to render ingredients alltogethe
 * @type {function}
 * @returns {object}
 */
const Burger = props => {
    const {ingredients} = props;
    let trasformedIngredients = Object.keys(ingredients)
        .map(igKey => {
            return [...Array(ingredients[igKey])].map((_, index) => {
                return <BurgerIngredient key={igKey + index} 
                                         type={igKey} />;
            });
        })
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);

    if (trasformedIngredients.length === 0) {
        trasformedIngredients = <p>Please, start to adding ingredients</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {trasformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
}

export default Burger;