/* eslint-disable no-underscore-dangle */
// lib
import React from 'react';
import ReactDOM from 'react-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import promiseMiddleware from 'redux-promise';
import reduxThunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';

// css
import './index.css';

// js
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import reducer from './_reducers/index';

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  reduxThunk,
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      reducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__(),
    )}
  >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
