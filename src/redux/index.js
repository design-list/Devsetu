// 'use client'

// import { createStore, applyMiddleware, compose } from "redux";
// import { persistStore, persistReducer } from "redux-persist";
// import storage from "redux-persist/lib/storage"; // localStorage के लिए
// import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import createSagaMiddleware from "redux-saga";

// import reducers from "./reducers";
// import rootSaga from "../sagas";

// const sagaMiddleware = createSagaMiddleware();

// // ✅ persist config
// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["cart"], 
//   // blacklist: [] 
// };

// // ✅ persisted reducer बनाएं
// const persistedReducer = persistReducer(persistConfig, reducers);

// const middlewares = [sagaMiddleware];

// const composeEnhancers =
//   typeof window !== "undefined" &&
//   process.env.NODE_ENV !== "production" &&
//   window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : compose;

// // ✅ store create करें persistedReducer के साथ
// const store = createStore(
//   persistedReducer,
//   composeEnhancers(applyMiddleware(...middlewares))
// );

// const persistor = persistStore(store);

// sagaMiddleware.run(rootSaga);

// store.asyncReducers = {};

// // ✅ ReduxProvider with PersistGate
// export function ReduxProvider({ children }) {
//   return (
//     <Provider store={store}>
//       <PersistGate loading={null} persistor={persistor}>
//         {children}
//       </PersistGate>
//     </Provider>
//   );
// }

// export default ReduxProvider;




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


