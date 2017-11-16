const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const buildTools = require("./tools/build-tools");

const DIST_DIR = "./dist";
const SRC_DIR = "./src";

/**
 * Generic config object for both dev and build.
 */
const generic = {
  devtool: "eval-source-map",

  entry: [
    "babel-polyfill",
    "./src/index.js"
  ],

  output: {
    path: path.resolve(__dirname, DIST_DIR),
    publicPath: "/",
    filename: "bundle.js"
  },

  module: {
    rules: [{
      test: /\.js$/,
      exclude: /(node_modules)/,
      use: {
        loader: "babel-loader"
      }
    }]
  },

  plugins: [
    /**
     * Generate HTML file for the application.
     */
    new HtmlWebpackPlugin({
      title: "Yet Another React Redux Boilerplate",
      template: path.resolve(__dirname, SRC_DIR, "html", "index.html")
    }),

    /**
     * Blazing fast bundling.
     */
    new HardSourceWebpackPlugin()
  ]
};

/**
 * Partial config for hot module replacement.
 */
const hmr = {
  plugins: [
    /**
     * Display relative path of the module when HMR is enabled.
     */
    new webpack.NamedModulesPlugin(),

    /**
     * Hot module replacement.
     */
    new webpack.HotModuleReplacementPlugin()
  ]
};

/**
 * Entries to be added to the config to enable HMR.
 */
const hmrEntries = [
  "webpack-dev-server/client?http://localhost:8081",
  "webpack/hot/only-dev-server",
  "react-hot-loader/patch"
];

/**
 * Dev server settings.
 */
const devServer = {
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,

    hot: true,
    inline: true,

    headers: {
      "Access-Control-Allow-Origin": "*"
    },

    stats: {
      colors: true
    }
  }
};

/**
 * Build related config.
 */
const build = {
  bail: true,

  /**
   * Use the better source maps on production.
   */
  devtool: "source-map",

  plugins: [
    /**
     * Clean the dist folder.
     */
    new CleanWebpackPlugin([DIST_DIR]),

    /**
     * Uglify source.
     */
    new UglifyJSPlugin({
      cache: true,
      sourceMap: true,
      test: /\.js($|\?)/i,

      uglifyOptions: {
        ecma: 8
      }
    })
  ]
};

/**
 * Merge the different parts together.
 */
let wkConfig = buildTools.merge(
  {},

  generic,

  /**
   * Add hot module replacement, only in dev mode.
   */
  buildTools.useIfNot(hmr, buildTools.isBuilding()),

  /**
   * Set process.env.NODE_ENV variable to production if we build production.
   */
  buildTools.useIf(buildTools.setFreeVariable("process.env.NODE_ENV", "production"), buildTools.isBuilding()),

  /**
   * Clean the dist folder and minify files when making a new build.
   */
  buildTools.useIf(build, buildTools.isBuilding()),

  /**
   * Start the dev server in dev mode.
   */
  buildTools.useIfNot(devServer, buildTools.isBuilding())
);

/**
 * For hot module replacement, we need to push some boilerplate to the beginning of the entry array.
 */
if (!buildTools.isBuilding()) {
  Array.prototype.unshift.apply(wkConfig.entry, hmrEntries);
}

module.exports = wkConfig;