import React from 'react';
import classes from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

const availableIngredients = [
    { 
        label: 'Meat',
        type: 'meat'
    },
    {
        label: 'Cheese',
        type: 'cheese'
    },
    {
        label: 'Bacon',
        type: 'bacon'
    },
    {
        label: 'Salad',
        type: 'salad'
    },
];

const BuildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
            <p>Total Price: <strong>${props.totalPrice.toFixed(2)}</strong></p>
            {availableIngredients.map( availableIngredient => 
                <BuildControl 
                    key={availableIngredient.type}
                    ingredientName={availableIngredient.label} 
                    disabledInfo={props.disabledInfo[availableIngredient.type]}
                    onAddIngredientClick={() => props.onAddIngredientClick(availableIngredient.type)} 
                    onRemoveIngredientClick={() => props.onRemoveIngredientClick(availableIngredient.type)} />
            )}
            <button 
                className={classes.OrderButton}
                disabled={!props.isPurchaseable}
                onClick={props.onOrderButtonClick}>Order Now</button>
        </div>
    )
}

export default BuildControls;