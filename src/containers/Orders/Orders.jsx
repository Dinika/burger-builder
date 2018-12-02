import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';

class Orders extends Component {
    state = {
        orders: [],
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
                console.log(fetchedOrders);
            })
            .catch(error => {
                this.setState({loading: false});
            })
    }
    render(){
        return (
            <div>
                {this.state.orders.map(order => (
                    <Order
                        key={order.key}
                        ingredients={order.ingredients}
                        totalPrice={order.totalPrice} />
                ))}
            </div>
        )
    }
}

export default Orders;