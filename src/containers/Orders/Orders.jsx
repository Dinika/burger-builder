import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../HOC/withErrorhandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import Loader from '../../components/UI/Loader/Loader';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.tokenId, this.props.userId);
  }
  render() {
    let loaderOrOrders = <Loader />;
    if (!this.props.loading) {
      loaderOrOrders = this.props.orders.map(order => {
        return (
          <Order
            key={order.key}
            ingredients={order.ingredients}
            totalPrice={order.totalPrice}
          />
        );
      });
    }
    return <div>{loaderOrOrders}</div>;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orders.orders,
    loading: state.orders.loading,
    tokenId: state.auth.tokenId,
    userId: state.auth.userId
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onFetchOrders: (tokenId, userId) =>
      dispatch(actions.fetchOrders(tokenId, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
