import React from "react";
import HelloWorld from "../hello-world";

describe("The hello world component", () => {

  it("renders", () => {
    const wrapper = mount(
      <HelloWorld/>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

});
