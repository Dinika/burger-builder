import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './ContactForm.module.css';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import axios from '../../../axios-order';
import InputElement from '../../../components/UI/InputElement/InputElement';

class ContactForm extends Component {
  state = {
    loading: false,
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
    this.setState({ loading: true });
    let orderData = {};
    for (let key in this.state.orderForm) {
      orderData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ingredients,
      totalPrice: this.props.totalPrice,
      orderData: orderData
    };
    axios
      .post('/orders.json', order)
      .then(response => {
        this.setState({ loading: false });
        return response;
      })
      .catch(error => {
        this.setState({ loading: false });
        console.log(error);
      });
  }

  checkValidity(value, rules) {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }
    if (rules.minLength) {
      isValid = value.trim().length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
      isValid = value.trim().length <= rules.maxLength && isValid;
    }
    return isValid;
  }

  onInputChanged(event, inputIdentifier) {
    const updatedOrderForm = { ...this.state.orderForm };
    const updatedInputElement = { ...this.state.orderForm[inputIdentifier] };
    let isFormValid = true;
    updatedInputElement.value = event.target.value;
    const isValid = this.checkValidity(
      event.target.value,
      updatedInputElement.rules
    );
    updatedInputElement.isValid = isValid;
    updatedInputElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedInputElement;
    console.log(updatedOrderForm);
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
    if (this.state.loading) {
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
  };
};

export default connect(mapStateToProps)(ContactForm);
