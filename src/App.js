import React, { useEffect, Suspense } from 'react';
import './App.module.css';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Logout from './containers/Auth/Logout/Logout';
import * as actions from './store/actions/index';

const Auth = React.lazy(() => {
  return import('./containers/Auth/Auth');
});

const Checkout = React.lazy(() => {
  return import('./containers/Checkout/Checkout');
});

const Orders = React.lazy(() => {
  return import('./containers/Orders/Orders');
});

const App = props => {
  useEffect(() => {
    props.tryAutoSignIn();
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact component={BurgerBuilder} />
      <Route path="/login" render={props => <Auth {...props} />} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" render={props => <Checkout {...props} />} />
        <Route path="/orders" render={props => <Orders {...props} />} />
        <Route path="/login5x" render={props => <Auth {...props} />} />
        <Route path="/logout" component={Logout} />
        <Redirect to="/" />
      </Switch>
    );
  }

  return (
    <div>
      <Layout>
        <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
      </Layout>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.tokenId !== null
  };
};
const mapDispatchToProps = dispatch => {
  return {
    tryAutoSignIn: () => dispatch(actions.tryAutoSignIn())
  };
};

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
