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
            {availableIngredients.map( availableIngredient => 
                <BuildControl 
                    key={availableIngredient.type}
                    ingredientName={availableIngredient.label} 
                    disabledInfo={props.disabledInfo[availableIngredient.type]}
                    onAddIngredientClick={() => props.onAddIngredientClick(availableIngredient.type)} 
                    onRemoveIngredientClick={() => props.onRemoveIngredientClick(availableIngredient.type)} />
            )}
        </div>
    )
}

export default BuildControls;