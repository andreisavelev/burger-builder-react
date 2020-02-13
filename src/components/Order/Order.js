import React from 'react';

import classes from './order.css';

const order = function (props) {
    let ingredients = Object.entries(props.ingredients ? props.ingredients : {});
    let ingredientsLength = ingredients.length;

    return (
        <table className={classes.Order}>
            <tbody>
            <tr>
                <th>Ingredients:</th>
                <td>
                    {
                        ingredients.map((item, index) => {
                            let capitalizedKey = item[0].replace(/^\w/, l => l.toUpperCase());
                            let row = `${capitalizedKey} (${item[1]})`;

                            return index +1 !== ingredientsLength ? `${row}, ` : `${row}`;
                        })
                    }
                </td>
            </tr>
            <tr>
                <th>
                    Total price:
                </th>
                <td>
                    <strong>
                        {parseFloat(props.price).toFixed(2)}
                    </strong>
                </td>
            </tr>
            </tbody>
        </table>
    );
};

export default order;