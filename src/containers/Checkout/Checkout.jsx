import React from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import { Route, Redirect } from 'react-router-dom';

const Checkout = props => {
  function onCheckoutCancelled() {
    props.history.goBack();
  }
  function onCheckoutConfirmed() {
    props.history.replace('/checkout/contact-form');
  }

  let redirectOrShowSummary = <Redirect to="/" />;
  if (props.ingredients) {
    const redirectToHomePage = props.purchased ? <Redirect to="/" /> : null;
    redirectOrShowSummary = (
      <div>
        {redirectToHomePage}
        <CheckoutSummary
          ingredients={props.ingredients}
          onCheckoutCancelled={onCheckoutCancelled.bind(this)}
          onCheckoutConfirmed={onCheckoutConfirmed.bind(this)}
        />
        <Route
          path={props.match.path + '/contact-form'}
          component={ContactForm}
        />
      </div>
    );
  }
  return redirectOrShowSummary;
};

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    purchased: state.orders.purchased
  };
};
export default connect(mapStateToProps)(Checkout);
