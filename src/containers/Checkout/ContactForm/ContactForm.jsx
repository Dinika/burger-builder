import React, {Component} from 'react';
import classes from './ContactForm.module.css';
import Button from '../../../components/UI/Button/Button';
import Loader from '../../../components/UI/Loader/Loader';
import axios from '../../../axios-order';

class ContactForm extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        loading: false,
    }
    
    confirmOrder(event) {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            totalPrice: this.props.totalPrice,
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
                this.setState({loading: false})
                return response
            })
            .catch(error => {
                this.setState({loading: false})
                console.log(error)
            });
    }

    render() {
        let spinnerOrForm = (
            <form>
                <input type="text" name="name" placeholder="Your Name" />
                <input type="text" name="email" placeholder="Your E-mail" />
                <input type="text" name="street" placeholder="Your Street" />
                <input type="text" name="postalCode" placeholder="Your Postal Code" />
                <Button type="Success" onButtonClicked={this.confirmOrder.bind(this)}>ORDER</Button>
            </form>                
        )
        if(this.state.loading) {
            spinnerOrForm = <Loader />
        }
        return(
            <div className={classes.ContactForm}>
                <h4>Enter your Contact Data</h4>
                {spinnerOrForm}    
            </div>
        )
    }
}

export default ContactForm;