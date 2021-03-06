import React from 'react';
import Aux from '../../../HOC/Aux';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.totalPrice.toFixed(2)}</strong></p>
            <p>Proceed to Checkout?</p>
            <Button type="Danger" onButtonClicked={props.onPurchaseCancelled}>Cancel</Button>
            <Button type="Success" onButtonClicked={props.onPurchaseConfirmed}>Continue</Button>
        </Aux>
    )
}

export default OrderSummary;