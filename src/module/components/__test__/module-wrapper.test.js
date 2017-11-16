import { Wrapper } from "../module-wrapper";

describe("The module wrapper", () => {

  it("renders correctly", () => {
    const wrapper = mount(
      <Wrapper>
        <p>Hello World!</p>
      </Wrapper>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

});