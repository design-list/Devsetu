'use client'

import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { Provider } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const composeEnhancers =
  typeof window !== "undefined" &&
  process.env.NODE_ENV !== "production" &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// store create
const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(...middlewares))
);

sagaMiddleware.run(rootSaga);

store.asyncReducers = {};

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;


