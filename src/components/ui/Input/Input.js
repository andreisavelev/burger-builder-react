import React, { memo } from "react";
import { isBoolean } from 'lodash/fp';
import classes from "./Input.css";

/**
 * Generic function to render different input elements
 * @param props
 * @returns {*}
 */
const Input = memo(({ valid, touched, elementType, elementConfig, value, changed, label }) => {
  const inputStyleArray = [classes.InputElement];
  let inputElement = null;

  if (isBoolean(valid) && !valid && touched) {
    inputStyleArray.push(classes.Invalid);
  }

  switch (elementType) {
    case "input":
      inputElement = (
        <input
          className={inputStyleArray.join(" ")}
          {...elementConfig}
          onChange={changed}
          value={value}
        />
      );
      break;

    case "textarea":
      inputElement = (
        <textarea
          className={inputStyleArray.join(" ")}
          {...elementConfig}
          onChange={changed}
          value={value}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={inputStyleArray.join(" ")}
          onChange={changed}
          value={value}
        >
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={inputStyleArray.join(" ")}
          {...elementConfig}
          onChange={changed}
          value={value}
        />
      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{label}</label>
      {inputElement}
    </div>
  );
});

export default Input;
