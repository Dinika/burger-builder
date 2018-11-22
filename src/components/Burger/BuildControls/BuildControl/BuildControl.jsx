import React from 'react';
import classes from './BuildControl.module.css';

const BuildControl = (props) => (
    <div className={classes.BuildControl}>
        <div className={classes.IngredientName}>{props.ingredientName}</div>
        <button 
            className={classes.Less}
            disabled={props.disabledInfo}
            onClick={props.onRemoveIngredientClick}>Less</button>
        <button className={classes.More} onClick={props.onAddIngredientClick}>More</button>
    </div>
)

export default BuildControl;