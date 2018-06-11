import _ from "lodash";
import { fromJS } from "immutable";
import { applyMiddleware, createStore } from "redux";
import createHistory from "history/createBrowserHistory";
import { composeWithDevTools } from "redux-devtools-extension";
import { routerMiddleware } from "react-router-redux";
import persistState from "redux-localstorage";

import { LOCALSTORAGE_KEY } from "./config";
import { INITIAL_STATE } from "./initial-state";
import { rootReducer } from "./reducer";

/**
 * Create a history instance.
 */
const history = createHistory();

/**
 * Middleware to apply in the store.
 * @type {*[]}
 */
const middleware = [
  routerMiddleware(history)
];

/**
 * Configuration for keeping all the redux state in localstorage.
 * @type {{key: string, serialize: function(*): string, deserialize: function(*=): any, merge: function(*, *=)}}
 */
const persistStateConfig = {
  key: LOCALSTORAGE_KEY,

  /**
   * Serialize immutable data to localstorage.
   * @param data
   * @return {string}
   */
  serialize: data => JSON.stringify(data.toJS()),

  /**
   * Deserialize localstorage string to immutable.
   * @param data
   * @return {any}
   */
  deserialize: data => fromJS(JSON.parse(data)),

  /**
   * Merge localstorage with initial state.
   * @param initial
   * @param persisted
   */
  merge: (initial, persisted) => initial.merge(persisted)
};

/**
 * Create a Redux store.
 * @param {Object} initialState
 * @return {Store<any>}
 */
const configureStore = (initialState = {}) => createStore(
  rootReducer,
  INITIAL_STATE.merge(fromJS(initialState)),
  composeWithDevTools({})(
    applyMiddleware(...middleware),
    persistState(_.noop(), persistStateConfig)
  )
);

/**
 * Create a store with the reducers.
 */
const store = configureStore();

export default store;
export { history, configureStore };