const _ = require("lodash");
const webpack = require("webpack");

/**
 * Return the passed argument if the condition is met.
 * @param what - the desired return value
 * @param when - the condition
 * @returns {{}}
 */
function useIf (what, when) {
  return when ? what : {};
}

/**
 * Return the passed argument if the condition is not met.
 * @param what
 * @param when
 * @returns {{}}
 */
function useIfNot (what, when) {
  return useIf(what, !when);
}

/**
 * Customizer function for lodash mergeWith.
 * @param objValue
 * @param srcValue
 * @returns {string|*|Array.<T>|Array|Buffer|Iterable<K, V>}
 * @private
 */
function _customizer (objValue, srcValue) {
  if (_.isArray(objValue)) {
    return objValue.concat(srcValue);
  }
}

/**
 * Merge objects with a customizer.
 * @returns {*}
 */
function merge () {
  const args = [].slice.apply(arguments);

  args.push(_customizer);

  return _.mergeWith.apply(null, args);
}

/**
 * Tell whether npm_lifecycle_event is "build" or not.
 * @returns {boolean}
 */
function isBuilding () {
  return process.env.npm_lifecycle_event === "build";
}

/**
 * Set a variable with Webpack.
 * @param key
 * @param value
 * @returns {{plugins: [*]}}
 */
function setFreeVariable (key, value) {
  const env = {};

  env[key] = JSON.stringify(value);

  return {
    plugins: [
      new webpack.DefinePlugin(env)
    ]
  };
}

module.exports = {
  useIf: useIf,
  useIfNot: useIfNot,
  merge: merge,
  isBuilding: isBuilding,
  setFreeVariable: setFreeVariable
};