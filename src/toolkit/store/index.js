import { combineReducers, compose } from "redux";
import auth from "../slice/auth";
import teachers from "../slice/teachers";
import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose;

const rootReducer = combineReducers({
  auth: auth,
  teachers: teachers,
});

const composedEnhancer = composeEnhancers(applyMiddleware(thunkMiddleware));

export const store = createStore(rootReducer, composedEnhancer);
