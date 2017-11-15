import { combineReducers } from "redux-immutable";
import { routerReducer } from "react-router-redux";

/**
 * Combines all the imported reducers into application state.
 * @type {Reducer}
 * @memberOf module:Reducers
 */
export const rootReducer = combineReducers({
  dummy: (state, action) => "dummy state",

  /* Reducers from external packages. */
  router: routerReducer
});