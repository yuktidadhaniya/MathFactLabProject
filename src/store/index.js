import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducer";
import * as Sentry from "@sentry/react";
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
      // Specify extension's options like name, actionsBlacklist, actionsCreators, serialize...
    })
  : compose;

const sentryReduxEnhancer = Sentry.createReduxEnhancer({
  // Optionally pass options listed below
});

const enhancer = composeEnhancers(applyMiddleware(thunk), sentryReduxEnhancer);

const store = createStore(rootReducer, enhancer);

export default store;
