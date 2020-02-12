import React from 'react';

import classes from './Input.css';

/**
 * Generic function to render different input elements
 * @param props
 * @returns {*}
 */
const input = function (props) {
    const inputStyleArray = [classes.InputElement];
    let inputElement = null;

    if (!props.valid && props.touched) {
        inputStyleArray.push(classes.Invalid);
    }

    switch (props.elementType) {
        case ('input'):
            inputElement = <input className={inputStyleArray.join(' ')}
                                  {...props.elementConfig}
                                  onChange={props.changed}
                                  value={props.value}/>;
            break;

        case ('textarea'):
            inputElement = <textarea className={inputStyleArray.join(' ')}
                                     {...props.elementConfig}
                                     onChange={props.changed}
                                     value={props.value}/>;
            break;

        case ('select'):
            inputElement = (
                <select className={inputStyleArray.join(' ')}
                        onChange={props.changed}
                        value={props.value}>
                    {props.elementConfig.options.map(option => (
                        <option key={option.value}
                                value={option.value}>
                            {option.displayValue}
                        </option>
                    ))}
                </select>
            );
            break;

        default:
            inputElement = <input className={inputStyleArray.join(' ')}
                                  {...props.elementConfig}
                                  onChange={props.changed}
                                  value={props.value}/>;
    }

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    );
};

export default input;