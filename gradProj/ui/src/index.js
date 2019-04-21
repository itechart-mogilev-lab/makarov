import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ConnectedRouter as Router } from "connected-react-router";
import axios from "axios";
import combinedReducers from "./reducers";
import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import createSagaMiddleware from "redux-saga";
import saga from "./sagas";
import { initializePreviousToken } from "./auth";
import { createBrowserHistory } from "history";
import { routerMiddleware } from "connected-react-router";
import 'typeface-roboto'

axios.defaults.baseURL = "http://localhost:3001/api";

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const history = createBrowserHistory();

const store = createStore(
  combinedReducers(history),
  composeEnhancers(applyMiddleware(sagaMiddleware, routerMiddleware(history)))
);
sagaMiddleware.run(saga);

initializePreviousToken(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
