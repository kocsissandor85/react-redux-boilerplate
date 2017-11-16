import "raf/polyfill";
import React from "react";
import Enzyme, { shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import toJson from "enzyme-to-json";
import "jest-styled-components";

/**
 * Configure Enzyme to use the React v16 adapter.
 */
Enzyme.configure({
  adapter: new Adapter()
});

/**
 * Set globals so there is no need to import them every time.
 */
global.shallow = shallow;
global.render = render;
global.mount = mount;
global.React = React;
global.toJson = toJson;

/**
 * Mock console error to throw.
 * @param message
 */
console.error = message => {
  throw new Error(message);
};