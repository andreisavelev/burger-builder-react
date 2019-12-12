import React from 'react';

import classes from './Button.css';

const Button = props => (
    <button className={[classes.Button, classes[props.buttonType]].join(' ')} 
            onCLick={props.clicled}>
        {props.children}
    </button>
);

export default Button;