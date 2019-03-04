import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
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
    orderButtonClicked: false
  };

  componentDidMount() {
    this.props.initializeIngredients();
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
    if (this.props.isAuthenticated) {
      this.setState({
        orderButtonClicked: true
      });
    } else {
      this.props.setAuthRedirectPath('/checkout');
      this.props.history.push('/login');
    }
  }

  onPurchaseCancelled() {
    this.setState({
      orderButtonClicked: false
    });
  }

  onPurchaseConfirmed() {
    this.props.onPurchaseInit();
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
    let burgerAndBuildControls = this.props.error ? (
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
            isAuthenticated={this.props.isAuthenticated}
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
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    error: state.burger.error,
    purchased: state.orders.purchased,
    isAuthenticated: state.auth.tokenId !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: ingredient =>
      dispatch(actions.addIngredient(ingredient)),
    onIngredientRemoved: ingredient =>
      dispatch(actions.removeIngredient(ingredient)),
    initializeIngredients: () => dispatch(actions.initIngredient()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    setAuthRedirectPath: path => dispatch(actions.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
