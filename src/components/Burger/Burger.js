import React from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const Burger = (props) => {
    function getBurgerIngredients() {
        const ingredientNames = Object.keys(props.ingredients);
        const transformedIngredients = ingredientNames.map( (ingredientName) => {
            let burgerIngredientElements = [];
            for(let i=0; i<props.ingredients[ingredientName]; i++) {
                burgerIngredientElements.push(
                    <BurgerIngredient type={ingredientName} key={ingredientName+i}/>
                )
            }
            return [...burgerIngredientElements]
        })
        .reduce( (arr, el) => {
            return arr.concat(el);
        }, []);   
        console.log(transformedIngredients);
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