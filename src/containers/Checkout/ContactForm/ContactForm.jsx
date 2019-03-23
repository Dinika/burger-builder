import React, { Component } from 'react';
import { connect } from 'react-redux';
import checkValidity from '../../../utils/checkValidity';
import classes from './ContactForm.module.css';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import axios from '../../../axios-order';
import InputElement from '../../../components/UI/InputElement/InputElement';
import withErrorHandler from '../../../HOC/withErrorhandler/withErrorHandler';
import * as orderActions from '../../../store/actions/index';

class ContactForm extends Component {
  state = {
    isFormValid: false,
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your name'
        },
        value: '',
        rules: {
          required: true
        },
        isValid: false,
        touched: false
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your e-mail'
        },
        value: '',
        rules: {
          required: true
        },
        isValid: false,
        touched: false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Street Name'
        },
        value: '',
        rules: {
          required: true
        },
        isValid: false,
        touched: false
      },
      postalCode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'ZIP code'
        },
        value: '',
        rules: {
          required: true,
          minLength: 5,
          maxLength: 8
        },
        isValid: false,
        touched: false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        value: 'fastest',
        isValid: true,
        rules: {}
      }
    }
  };

  confirmOrder(event) {
    event.preventDefault();
    let orderData = {};
    for (let key in this.state.orderForm) {
      orderData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: orderData,
      userId: this.props.userId
    };
    this.props.onPurchaseBurgerStart(this.props.tokenId, order);
  }

  onInputChanged(event, inputIdentifier) {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedInputElement = { ...this.state.orderForm[inputIdentifier] };
    let isFormValid = true;
    updatedInputElement.value = event.target.value;
    const isValid = checkValidity(
      event.target.value,
      updatedInputElement.rules
    );
    updatedInputElement.isValid = isValid;
    updatedInputElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedInputElement;
    for (let key in updatedOrderForm) {
      isFormValid = updatedOrderForm[key].isValid && isFormValid;
    }
    this.setState({ orderForm: updatedOrderForm, isFormValid });
  }

  render() {
    let formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      });
    }
    let spinnerOrForm = (
      <form>
        {formElementsArray.map(formElement => (
          <InputElement
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            onInputChanged={event => this.onInputChanged(event, formElement.id)}
            isValid={!formElement.config.isValid}
            shouldValidate={formElement.config.rules}
            touched={formElement.config.touched}
          />
        ))}
        <Button
          type="Success"
          onButtonClicked={this.confirmOrder.bind(this)}
          disabled={!this.state.isFormValid}
        >
          ORDER
        </Button>
      </form>
    );
    if (this.props.loading) {
      spinnerOrForm = <Loader />;
    }
    return (
      <div className={classes.ContactForm}>
        <h4>Enter your Contact Data</h4>
        {spinnerOrForm}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ingredients: state.burger.ingredients,
    totalPrice: state.burger.totalPrice,
    loading: state.orders.loading,
    tokenId: state.auth.tokenId,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onPurchaseBurgerStart: (tokenId, order) =>
      dispatch(orderActions.purchaseBurger(tokenId, order))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactForm, axios));
