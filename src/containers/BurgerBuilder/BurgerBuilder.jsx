import React, { Component } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.5,
    cheese: 0.3,
    meat: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0,
        },
        totalPrice: 2,
        isPurchaseable: false,
        orderButtonClicked: false,
    }

    onAddIngredientClick = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        const newIngredientCount = oldIngredientCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newIngredientCount;
        const updatedPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.checkIfPurchaseable(updatedIngredients);
    }
    
    onRemoveIngredientClick = (type) => {
        const oldIngredientCount = this.state.ingredients[type];
        if (oldIngredientCount === 0) {
            return
        } 
        const newIngredientCount = oldIngredientCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = newIngredientCount;
        const updatedPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: updatedPrice
        });
        this.checkIfPurchaseable(updatedIngredients);
    }

    checkIfPurchaseable(ingredients) {
        const totalNumberOfOrderedIngredients = Object.keys(ingredients).reduce((sum, ingredient) => {
            return sum = sum + ingredients[ingredient];
        }, 0);
        this.setState({
            isPurchaseable: totalNumberOfOrderedIngredients > 0
        });
    }

    onOrderButtonClick() {
        this.setState({
            orderButtonClicked: true,
        })
    }

    onBackdropClicked() {
        this.setState({
            orderButtonClicked: false,
        })
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }

        return (
            <Aux>
                <Modal showModal={this.state.orderButtonClicked} onBackdropClicked={this.onBackdropClicked.bind(this)}>
                    <OrderSummary ingredients = {this.state.ingredients} />
                </Modal>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    totalPrice={this.state.totalPrice}
                    disabledInfo={disabledInfo}
                    onAddIngredientClick={this.onAddIngredientClick} 
                    onRemoveIngredientClick={this.onRemoveIngredientClick} 
                    isPurchaseable={this.state.isPurchaseable}
                    onOrderButtonClick={this.onOrderButtonClick.bind(this)} />
            </Aux>
        )
    }
}

export default BurgerBuilder;