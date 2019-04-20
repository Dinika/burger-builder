import React, { useEffect, useState } from 'react';
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

export const BurgerBuilder = props => {
  const [orderButtonClicked, setOrderButtonClicked] = useState(false);

  useEffect(() => {
    props.initializeIngredients();
  }, []);

  function checkIfPurchaseable() {
    const totalNumberOfOrderedIngredients = Object.keys(
      props.ingredients
    ).reduce((sum, ingredient) => {
      return (sum = sum + props.ingredients[ingredient]);
    }, 0);
    return totalNumberOfOrderedIngredients > 0;
  }

  function onOrderButtonClick() {
    if (props.isAuthenticated) {
      setOrderButtonClicked(true);
    } else {
      props.setAuthRedirectPath('/checkout');
      props.history.push('/login');
    }
  }

  function onPurchaseCancelled() {
    setOrderButtonClicked(false);
  }

  function onPurchaseConfirmed() {
    props.onPurchaseInit();
    props.history.push('/checkout');
  }

  const disabledInfo = {
    ...props.ingredients
  };
  for (let key in disabledInfo) {
    disabledInfo[key] = disabledInfo[key] === 0;
  }
  let orderSummaryOrLoader = null;
  let burgerAndBuildControls = props.error ? (
    <p>The ingredients could not be loaded due to a network error</p>
  ) : (
    <Loader />
  );
  if (props.ingredients) {
    burgerAndBuildControls = (
      <Aux>
        <Burger ingredients={props.ingredients} />
        <BuildControls
          totalPrice={props.totalPrice}
          disabledInfo={disabledInfo}
          onAddIngredientClick={props.onIngredientAdded}
          onRemoveIngredientClick={props.onIngredientRemoved}
          isPurchaseable={checkIfPurchaseable()}
          onOrderButtonClick={onOrderButtonClick}
          isAuthenticated={props.isAuthenticated}
        />
      </Aux>
    );
    orderSummaryOrLoader = (
      <OrderSummary
        ingredients={props.ingredients}
        onPurchaseCancelled={onPurchaseCancelled}
        onPurchaseConfirmed={onPurchaseConfirmed}
        totalPrice={props.totalPrice}
      />
    );
  }
  return (
    <Aux>
      <Modal
        showModal={orderButtonClicked}
        onPurchaseCancelled={onPurchaseCancelled.bind(this)}
      >
        {orderSummaryOrLoader}
      </Modal>
      {burgerAndBuildControls}
    </Aux>
  );
};

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
