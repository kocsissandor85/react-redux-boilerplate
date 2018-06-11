import { combineReducers } from "redux-immutable";
import types from "./types";

/*
 * Assume that the state look like below:
 * { quacking: bool, distance: number }
 */

/**
 * @type {Reducer}
 * @memberOf module:Reducers
 * @param state
 * @param action
 * @returns {boolean}
 */
const quacking = (state = false, action) => {
  switch (action.type) {
    case types.QUACK:
      return true;
    default:
      return state;
  }
};

/**
 * @type {Reducer}
 * @memberOf module:Reducers
 * @param state
 * @param action
 * @returns {number}
 */
const distance = (state = 0, action) => {
  switch (action.type) {
    case types.SWIM:
      // Assume we use immutable as action payload.
      return state + action.payload.get("distance");
    default:
      return state;
  }
};

/**
 * @type {Reducer}
 * @memberOf module:Reducers
 */
const reducer = combineReducers({
  quacking,
  distance
});

export default reducer;