const path = require("path");
const webpack = require("webpack");

/* Webpack plugins */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");

const DIST_DIR = "./dist";
const SRC_DIR = "./src";

module.exports = {
  entry: [
    "webpack-dev-server/client?http://localhost:3000",
    "webpack/hot/only-dev-server",
    "react-hot-loader/patch",
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
     * Clean the dist folder.
     */
    new CleanWebpackPlugin([DIST_DIR]),

    /**
     * Generate HTML file for the application.
     */
    new HtmlWebpackPlugin({
      title: "Yet Another React Redux Boilerplate",
      template: path.resolve(__dirname, SRC_DIR, "html", "index.html")
    }),

    /**
     * Display relative path of the module when HMR is enabled.
     */
    new webpack.NamedModulesPlugin(),

    /**
     * Hot module replacement.
     */
    new webpack.HotModuleReplacementPlugin(),

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
    }),

    /**
     * Blazing fast bundling.
     */
    new HardSourceWebpackPlugin()
  ],
  
  devServer: {
    contentBase: "./dist",
    historyApiFallback: true,

    hot: true,
    inline: true,

    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  }
};