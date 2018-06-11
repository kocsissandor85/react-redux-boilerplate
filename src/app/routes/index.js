import React from "react";
import { Switch, Route } from "react-router";

import HelloWorld from "modules/_example";

/**
 * Top-level application routes. The rest should be found under the listed components.
 * @type {ReactComponent}
 */
export const routes = (
  <Switch>
    <Route path={"/"} exact render={HelloWorld}/>
  </Switch>
);