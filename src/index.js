import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga/';
import { createStore, compose, applyMiddleware, combineReducers } from 'redux';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom';
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import ordersReducer from './store/reducers/orders';
import authReducer from './store/reducers/auth';
import { watchAuth, watchBurgerBuilder, watchOrders } from './store/sagas';
import thunk from 'redux-thunk';

// const logger = store => next => action => {
//   console.log('[Middlewware]: ', action);
//   const result = next(action);
//   console.log('[Middleware]: ', store.getState());
//   return result;
// };

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  burger: burgerBuilderReducer,
  orders: ordersReducer,
  auth: authReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk, sagaMiddleware))
);

sagaMiddleware.run(watchAuth);
sagaMiddleware.run(watchBurgerBuilder);
sagaMiddleware.run(watchOrders);

const app = (
  <Provider store={store}>
    <BrowserRouter store={store}>
      <App />
    </BrowserRouter>
  </Provider>
);
ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
