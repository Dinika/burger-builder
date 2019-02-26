import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../HOC/withErrorhandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders();
  }
  render() {
    let loaderOrOrders = <Loader />;
    if (!this.props.loading) {
      loaderOrOrders = this.props.orders.map(order => (
        <Order
          key={order.key}
          ingredients={order.ingredients}
          totalPrice={order.totalPrice}
        />
      ));
    }
    return <div>{loaderOrOrders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
