import _ from "lodash";
import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import createHistory from "history/createBrowserHistory";
import { Route } from "react-router";
import { ConnectedRouter, routerMiddleware } from "react-router-redux";
import domReady from "domready";

import { AppContainer } from "react-hot-loader";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducer";
import { INITIAL_STATE } from "./initial-state";
import { routes } from "./routes";

/**
 * ID of the HTML element to render the application into.
 * @type {string}
 */
const appContainerID = "app";

/**
 * Root element of the application.
 * @type {Element}
 */
const rootElement = document.querySelector(`#${appContainerID}`);

/**
 * Create a history instance.
 */
const history = createHistory();

/**
 * Create a store with the reducers.
 */
const store = createStore(
  rootReducer,
  INITIAL_STATE,
  composeWithDevTools({})(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

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
    "./reducer",
    "./routes"
  ], () => {
    const nextReducers = require("./reducer").rootReducer;
    const nextRoutes = require("./routes").routes;

    store.replaceReducer(nextReducers);
    render(store, nextRoutes);
  });
}

/**
 * Initial render.
 */
domReady(() => rootElement ? render(store, routes) : _.noop());