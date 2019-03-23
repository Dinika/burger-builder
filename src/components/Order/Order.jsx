import React from 'react';
import classes from './Order.module.css';

const Order = props => {
  let transformedIngredients = [];
  for (let igName in props.ingredients) {
    transformedIngredients.push({
      name: igName,
      amount: props.ingredients[igName]
    });
  }
  const igredientsOutput = transformedIngredients.map(ig => (
    <span className={classes.IngredientSpan} key={ig.name}>
      {ig.name} ({ig.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {igredientsOutput}</p>
      <p>
        Price: <strong>${Number(props.totalPrice).toFixed(2)}</strong>
      </p>
    </div>
  );
};

export default Order;
