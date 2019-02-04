import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actionTypes from '../../store/actions';
import Aux from '../../HOC/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Loader from '../../components/UI/Loader/Loader';
import axios from '../../axios-order';
import withErrorHandler from '../../HOC/withErrorhandler/withErrorHandler';

class BurgerBuilder extends Component {
  state = {
    orderButtonClicked: false,
    loading: false,
    error: null
  };

  componentDidMount() {
    axios
      .get('https://burger-builder-19d47.firebaseio.com/ingredients.json')
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: error });
      });
  }

  checkIfPurchaseable() {
    const totalNumberOfOrderedIngredients = Object.keys(
      this.props.ingredients
    ).reduce((sum, ingredient) => {
      return (sum = sum + this.props.ingredients[ingredient]);
    }, 0);
    return totalNumberOfOrderedIngredients > 0;
  }

  onOrderButtonClick() {
    this.setState({
      orderButtonClicked: true
    });
  }

  onPurchaseCancelled() {
    this.setState({
      orderButtonClicked: false
    });
  }

  onPurchaseConfirmed() {
    this.props.history.push('/checkout');
  }

  render() {
    const disabledInfo = {
      ...this.props.ingredients
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }
    let orderSummaryOrLoader = null;
    let burgerAndBuildControls = this.state.error ? (
      <p>The ingredients could not be loaded due to a network error</p>
    ) : (
      <Loader />
    );
    if (this.props.ingredients) {
      burgerAndBuildControls = (
        <Aux>
          <Burger ingredients={this.props.ingredients} />
          <BuildControls
            totalPrice={this.props.totalPrice}
            disabledInfo={disabledInfo}
            onAddIngredientClick={this.props.onIngredientAdded}
            onRemoveIngredientClick={this.props.onIngredientRemoved}
            isPurchaseable={this.checkIfPurchaseable()}
            onOrderButtonClick={this.onOrderButtonClick.bind(this)}
          />
        </Aux>
      );
      orderSummaryOrLoader = (
        <OrderSummary
          ingredients={this.props.ingredients}
          onPurchaseCancelled={this.onPurchaseCancelled.bind(this)}
          onPurchaseConfirmed={this.onPurchaseConfirmed.bind(this)}
          totalPrice={this.props.totalPrice}
        />
      );
    }
    if (this.state.loading) {
      orderSummaryOrLoader = <Loader />;
    }
    return (
      <Aux>
        <Modal
          showModal={this.state.orderButtonClicked}
          onPurchaseCancelled={this.onPurchaseCancelled.bind(this)}
        >
          {orderSummaryOrLoader}
        </Modal>
        {burgerAndBuildControls}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient =>
      dispatch({ type: actionTypes.ADD_INGREDIENT, payload: { ingredient } }),
    onIngredientRemoved: ingredient =>
      dispatch({ type: actionTypes.REMOVE_INGREDIENT, payload: { ingredient } })
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
