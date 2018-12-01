import React from 'react';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const CheckoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>Hope you enjoy your burger!</h1>
            <div style={{widtth: '300px', margin: 'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button
                onButtonClicked={props.onCheckoutCancelled}
                type="Danger">
                CANCEL
            </Button>
            <Button
                type="Success"
                onButtonClicked={props.onCheckoutConfirmed}>
                CONTINUE
            </Button>
        </div>
    )
}

export default CheckoutSummary;