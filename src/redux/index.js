
// src/redux/index.js

"use client";

import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

// Safe check for SSR
const isServer = typeof window === "undefined";

// Default store (non-persist for server)
let store;
let persistor;

if (!isServer) {
  // persist config (client only)
  const persistConfig = {
    key: "root",
    storage,
    whitelist: ["cart"],
  };

  const persistedReducer = persistReducer(persistConfig, reducers);

  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

  store = createStore(
    persistedReducer,
    composeEnhancers(applyMiddleware(...middlewares))
  );

  persistor = persistStore(store);
} else {
  // Server build mode: no localStorage
  store = createStore(reducers, applyMiddleware(...middlewares));
}

sagaMiddleware.run(rootSaga);
store.asyncReducers = {};

// Redux Provider (SSR Safe)
export function ReduxProvider({ children }) {
  return (
    <Provider store={store}>
      {persistor ? (
        <PersistGate loading={null} persistor={persistor}>
          {children}
        </PersistGate>
      ) : (
        children
      )}
    </Provider>
  );
}

export default ReduxProvider;







// // src/redux/index.js


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
