import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "../NavigationItems";
import NavigationItem from "../NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("<NavigationItems />", () => {
  let wrapper = null;
  beforeEach(() => {
    wrapper = shallow(<NavigationItems />);
  });
  afterEach(() => {
    wrapper = null;
  });

  it("should renders two <NavigationItem /> elements if not authenticated", () => {
    expect(wrapper.find(NavigationItem).length).toEqual(2);
  });

  it("should renders three <NavigationItem /> elements if authenticated", () => {
    wrapper.setProps({ isAuth: true });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });
});
