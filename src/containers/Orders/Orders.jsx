import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';

class Orders extends Component {
    state = {
        orders: null,
        loading: true,
    }
    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                let fetchedOrders = [];
                for(let key in response.data) {
                    fetchedOrders.push({
                        ...response.data[key],
                        key: key,
                    })
                }
                this.setState({
                    orders: fetchedOrders,
                    loading: false,
                })
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }
    render(){
        return(
            <div>
                <Order />
            </div>
        )
    }
}

export default Orders;