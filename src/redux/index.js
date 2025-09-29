'use client'

import { createStore, applyMiddleware, compose } from "redux";
import reducers from "./reducers";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../sagas";
import { composeWithDevTools } from "redux-devtools-extension";
import { Provider } from "react-redux";

const sagaMiddleware = createSagaMiddleware();

const middlewares = [sagaMiddleware];

const enhancers = [composeWithDevTools(applyMiddleware(...middlewares))];

const store = createStore(reducers, {}, compose(...enhancers));

sagaMiddleware.run(rootSaga);

store.asyncReducers = {};

export function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;
