import React, { Component } from 'react';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios-order';
import withErrorHandler from '../../HOC/withErrorhandler/withErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.4,
    bacon: 0.5,
    cheese: 0.3,
    meat: 0.7
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 2,
        isPurchaseable: false,
        orderButtonClicked: false,
        loading: false,
        error: null,
    }

    componentDidMount() {
        axios.get('https://burger-builder-19d47.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(error => {this.setState({error: error})});
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

    onPurchaseCancelled() {
        this.setState({
            orderButtonClicked: false,
        })
    }

    onPurchaseConfirmed() {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice,
            deliveryMethod: 'fast',
            customer: {
                name: 'David',
                email: 'dcaro@test.com',
                address: {
                    street: '21 Amour Street',
                    pinCode: '696969',
                    country: 'Spain',
                }
            }
        }
        axios.post('/orders.json', order)
            .then(response => {
                this.setState({loading: false, orderButtonClicked: false})
                return response
            })
            .catch(error => {
                this.setState({loading: false, orderButtonClicked: false})
                console.log(error)
            });
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] === 0;
        }
        let orderSummaryOrLoader = null;
        let burgerAndBuildControls = this.state.error ? <p>The ingredients could not be loaded due to a network error</p> : <Loader />;
        if(this.state.ingredients) {
            burgerAndBuildControls = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        totalPrice={this.state.totalPrice}
                        disabledInfo={disabledInfo}
                        onAddIngredientClick={this.onAddIngredientClick} 
                        onRemoveIngredientClick={this.onRemoveIngredientClick} 
                        isPurchaseable={this.state.isPurchaseable}
                        onOrderButtonClick={this.onOrderButtonClick.bind(this)} />
                </Aux>
            );
            orderSummaryOrLoader = (
                <OrderSummary 
                    ingredients={this.state.ingredients} 
                    onPurchaseCancelled={this.onPurchaseCancelled.bind(this)}
                    onPurchaseConfirmed={this.onPurchaseConfirmed.bind(this)}
                    totalPrice={this.state.totalPrice}
                />);
        }
        if(this.state.loading) {
            orderSummaryOrLoader = <Loader />
        } 
        return (
            <Aux>
                <Modal showModal={this.state.orderButtonClicked} onPurchaseCancelled={this.onPurchaseCancelled.bind(this)}>
                    {orderSummaryOrLoader}     
                </Modal>
                {burgerAndBuildControls}
            </Aux>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);