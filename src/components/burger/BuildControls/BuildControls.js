import React from 'react';

import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {
        label: 'Salad',
        type: 'salad'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Meat',
        type: 'meat'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    }
];
const BuildControls = props => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(control => <BuildControl key={control.label} 
                                                   label={control.label}  
                                                   added={() => props.ingredientAdded(control.type)}
                                                   disabled={props.disabled[control.type]} 
                                                   removed={() => props.ingredientRemoved(control.type)} />)}
        </div>
    );
};

export default BuildControls;