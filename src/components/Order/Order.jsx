import React from 'react';
import classes from './Order.module.css';

const Order = () => {
    return(
        <div className={classes.Order}>
            <p>Ingredients: Bacon(1)</p>
            <p>Price: <strong>$5.5</strong></p>
        </div>
    )
}

export default Order;