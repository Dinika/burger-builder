import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import { Route, Redirect } from 'react-router-dom';

class Checkout extends Component {
  onCheckoutCancelled() {
    this.props.history.goBack();
  }
  onCheckoutConfirmed() {
    this.props.history.replace('/checkout/contact-form');
  }

  render() {
    let redirectOrShowSummary = <Redirect to="/" />;
    if (this.props.ingredients) {
      redirectOrShowSummary = (
        <div>
          <CheckoutSummary
            ingredients={this.props.ingredients}
            onCheckoutCancelled={this.onCheckoutCancelled.bind(this)}
            onCheckoutConfirmed={this.onCheckoutConfirmed.bind(this)}
          />
          <Route
            path={this.props.match.path + '/contact-form'}
            component={ContactForm}
          />
        </div>
      );
    }
    return redirectOrShowSummary;
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice
  };
};
export default connect(mapStateToProps)(Checkout);
