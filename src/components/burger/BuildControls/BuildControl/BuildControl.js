import React from 'react';

import classes from './BuildControl.css';

const BuildControl = props => {
    return (
        <div className={classes.BuildControl}>
            <label className={classes.Label}>{props.label}</label>
            <button disabled={props.disabled} 
                    className={classes.Less} 
                    onClick={props.removed}>Less</button>
            <button className={classes.More} onClick={props.added}>More</button>
        </div>
    );
};

export default BuildControl;