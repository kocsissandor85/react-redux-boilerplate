import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import domReady from "domready";
import { AppContainer } from "react-hot-loader";

import { routes } from "./routes";
import store, { history } from "data/store";

/**
 * Root element of the application.
 * @type {Element}
 */
const rootElement = document.querySelector("#app");

/**
 * Render the application to the DOM.
 * @param store
 * @param routes
 */
const render = (store, routes) => ReactDOM.render(
  <AppContainer>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        {routes}
      </ConnectedRouter>
    </Provider>
  </AppContainer>, rootElement
);

/**
 * Hook up hot module replacement.
 * Update on store and component changes.
 */
if (module.hot) {
  module.hot.accept([
    "../data/reducer",
    "./routes"
  ], () => {
    const nextReducer = require("../data/reducer").rootReducer;
    const nextRoutes = require("./routes").routes;

    store.replaceReducer(nextReducer);

    render(store, nextRoutes);
  });
}

/**
 * Initial render.
 */
domReady(() => rootElement ? render(store, routes) : _.noop());