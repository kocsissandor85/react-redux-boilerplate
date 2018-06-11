import types from "./types";

/**
 * @type {Action}
 * @memberOf module:Actions
 * @returns {{type: string}}
 */
const quack = () => ({
  type: types.QUACK
});

/**
 * @type {Action}
 * @memberOf module:Actions
 * @param distance
 * @returns {{type: string, payload: {distance: *}}}
 */
const swim = distance => ({
  type: types.SWIM,
  payload: {
    distance
  }
});

export default {
  swim,
  quack
};