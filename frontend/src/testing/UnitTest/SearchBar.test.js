import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { BrowserRouter as Router } from "react-router-dom";
import SearchBar from "../../components/SearchBar/SearchBar";

Enzyme.configure({ adapter: new Adapter() });
describe("SearchBar Component", () => {
  it("Updates text box based on input", () => {
    const wrapper = mount(
      <Router>
        <SearchBar />
      </Router>
    );
    const input = wrapper.find(".search-input");
    input.simulate("change", { target: { value: "Testing" } });
    expect(wrapper.find(".search-input").prop("value")).toEqual("Testing");
    wrapper.unmount();
  });
  it("Searching with empty input does nothing", () => {
    const wrapper = mount(
      <Router>
        <SearchBar />
      </Router>
    );
    const input = wrapper.find(".search-input");
    const searchButton = wrapper.find("#search-button");
    input.simulate("change", { target: { value: "" } });
    searchButton.simulate("click");
    expect(input.prop("value")).toEqual("");
    expect(window.location.pathname).toBe("/");
    wrapper.unmount();
  });
  it("Searching navigates to correct page", () => {
    const wrapper = mount(
      <Router>
        <SearchBar />
      </Router>
    );
    const input = wrapper.find(".search-input");
    const searchButton = wrapper.find("#search-button");
    input.simulate("change", { target: { value: "Test" } });
    searchButton.simulate("click");
    expect(input.prop("value")).toEqual("");
    expect(window.location.pathname).toBe("/search/Test");
    wrapper.unmount();
  });
});
