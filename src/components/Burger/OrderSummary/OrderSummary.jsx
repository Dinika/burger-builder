import React from 'react';
import Aux from '../../../HOC/Aux';

const OrderSummary = (props) => {
    const summaryListItems = Object.keys(props.ingredients).map(ingredient => (
        <li key={ingredient}>
            {ingredient} - {props.ingredients[ingredient]}
        </li>
    ));

    return (
        <Aux>
            <h3>Your order summary</h3>
            <ul>
                {summaryListItems}
            </ul>
            <p>Proceed to Checkout</p>
        </Aux>
    )
}

export default OrderSummary;