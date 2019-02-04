import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactForm from './ContactForm/ContactForm';
import { Route } from 'react-router-dom';

class Checkout extends Component {
  onCheckoutCancelled() {
    this.props.history.goBack();
  }
  onCheckoutConfirmed() {
    this.props.history.replace('/checkout/contact-form');
  }

  render() {
    return (
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
}

const mapStateToProps = state => {
  return {
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};
export default connect(mapStateToProps)(Checkout);
