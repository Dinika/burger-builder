import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    function getBurgerIngredients() {
        const ingredientNames = Object.keys(props.ingredients);
        const transformedIngredients = ingredientNames.reduce( (c, ingredientName) => {
            const arr = Array(props.ingredients[ingredientName]).fill()
                            .map( (_, i) => (<BurgerIngredient type={ingredientName} key={ingredientName+i}/> ));
            return [...c, ...arr];
        }, []);
        
        if(transformedIngredients.length === 0) {
            return <p>Please start adding ingredients to your burger</p>
        }
        
        return transformedIngredients;
    }

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {getBurgerIngredients()}
            <BurgerIngredient type="bread-bottom" />
        </div>
    )
}

export default Burger;