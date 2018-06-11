const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const buildTools = require("./tools/build-tools");

const DIST_DIR = "./dist";
const SRC_DIR = "./src";

const IMAGES_DIR = "assets/images";
const FONTS_DIR = "assets/fonts";
const CSS_DIR = "style/";
const JS_DIR = "js/";

const RX = {
  js: /\.js$/,
  css: /\.css$/,
  images: /\.(png|jpe?g|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
  fonts: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/
};

/**
 * Generic config object for both dev and build.
 */
const generic = {
  mode: "none",
  devtool: "cheap-module-source-map",

  entry: [
    "@babel/polyfill",
    "./src/app/index.js"
  ],

  output: {
    path: path.resolve(__dirname, DIST_DIR),
    publicPath: "/",
    filename: JS_DIR + "[name].bundle.js"
  },

  module: {
    rules: [{
      test: RX.js,
      exclude: /(node_modules)/,
      use: [{
        loader: "babel-loader"
      }]
    }, {
      test: RX.css,
      use: [{
        loader: buildTools.isBuilding() ? MiniCssExtractPlugin.loader : "style-loader"
      }, {
        loader: "css-loader"
      }]
    }, {
      test: RX.fonts,
      use: [{
        loader: "url-loader",
        options: {
          name: FONTS_DIR + "/[name].[ext]"
        }
      }]
    }, {
      test: RX.images,
      use: [{
        loader: "file-loader",
        options: {
          name: IMAGES_DIR + "/[name].[ext]"
        }
      }]
    }]
  },

  resolve: {
    alias: {
      app: path.resolve(__dirname, SRC_DIR, "app"),
      data: path.resolve(__dirname, SRC_DIR, "data"),
      modules: path.resolve(__dirname, SRC_DIR, "modules"),
      ui: path.resolve(__dirname, SRC_DIR, "ui")
    }
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
    new HardSourceWebpackPlugin(),

    /**
     * CSS extractor.
     */
    new MiniCssExtractPlugin({
      filename: CSS_DIR + (buildTools.isBuilding() ? "[name].[hash].css" : "[name].css"),
      chunkFilename: CSS_DIR + (buildTools.isBuilding() ? "[id].[hash].css" : "[id].css")
    })
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
  "webpack-dev-server/client?http://0.0.0.0:8080",
  "webpack/hot/only-dev-server",
  "react-hot-loader/patch"
];

/**
 * Dev server settings.
 */
const devServer = {
  devServer: {
    contentBase: DIST_DIR,
    historyApiFallback: true,

    host: "0.0.0.0",
    port: 8080,

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