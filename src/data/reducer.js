import { fromJS } from "immutable";
import { combineReducers } from "redux-immutable";
import { LOCATION_CHANGE } from "react-router-redux";

import { INITIAL_STATE } from "./initial-state";

/**
 * React-router-redux does not work with Immutable. In order to enable it, a custom reducer is needed.
 * @see https://github.com/reactjs/react-router-redux
 */

/**
 * Initial router state.
 * @type {any}
 */
const initialRouterState = fromJS({
  locationBeforeTransitions: null
});

/**
 * Custom router reducer.
 * @param state
 * @param action
 * @return {any}
 */
const routerReducer = (state = initialRouterState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.set("locationBeforeTransitions", action.payload);
  }

  return state;
};

/**
 * Wipe the "dirty butt", aka. clean up after logging out.
 * @type {Reducer}
 * @memberOf module:Reducers
 * @param dirtyButtReducer
 * @return {function(*=, *=, ...[*])}
 */
const toiletPaperReducer = dirtyButtReducer => {
  return (state = INITIAL_STATE, action, ...rest) => {
    return dirtyButtReducer(state, action, ...rest);
  }
};

/**
 * Combines all the imported reducers into application state.
 * @type {Reducer}
 * @memberOf module:Reducers
 */
export const rootReducer = toiletPaperReducer(combineReducers({
  dummy: (state, action) => "dummy state",

  /* Router reducer */
  routing: routerReducer
}));