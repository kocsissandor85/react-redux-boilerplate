import { Wrapper } from "../module-wrapper";

describe("The module wrapper", () => {

  it("renders correctly", () => {
    const wrapper = shallow(
      <Wrapper>
        <p>Hello World!</p>
      </Wrapper>
    );

    expect(toJson(wrapper)).toMatchSnapshot();
  });

});