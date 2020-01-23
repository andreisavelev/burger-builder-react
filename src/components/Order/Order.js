import React from 'react';

import classes from './order.css';

const order = function (props) {
    return (
        <table className={classes.Order}>
            <tbody>
                <tr>
                    <th>Ingredients:</th>
                    <td>Salad(1), Meat(2)</td>
                </tr>
                <tr>
                    <th>
                        Total price:
                    </th>
                    <td>
                        <strong>
                            USD 5.45
                        </strong>
                    </td>
                </tr>
            </tbody>
        </table>
    );
};

export default order;