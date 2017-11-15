import React from "react";
import { Route } from "react-router";

import { Wrapper as ModuleWrapper } from "./module";

/**
 * Application routes.
 * @type {ReactComponent}
 */
export const routes = (
  <section>
    <Route path="/" exact component={ModuleWrapper}/>
  </section>
);