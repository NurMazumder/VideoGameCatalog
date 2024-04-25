import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { BrowserRouter as Router } from "react-router-dom";
import Slider from "../../components/Slider/Slider";

Enzyme.configure({ adapter: new Adapter() });
describe("Slider Component", () => {
  it("Renders slider with one game", () => {
    const gameList = [
      {
        image: "Pac.png",
        title: "Pacman",
      },
    ];
    const wrapper = mount(
      <Router>
        <Slider type="Popular" games={gameList} />{" "}
      </Router>
    );
    expect(wrapper.find("#slider-header").text()).toBe("Popular");
    expect(wrapper.find("Link[to='/search/popular']").text()).toBe("Explore");
    expect(wrapper.find("GameCard").exists()).toBe(true);
    wrapper.unmount();
  });
  it("Renders slider with multiple game", () => {
    const gameList = [
      {
        image: "Pac.png",
        title: "PacMan",
      },
      {
        image: "NotFound.png",
        title: "Background",
      },
      {
        image: "Signup.png",
        title: "Pixel",
      },
    ];
    const wrapper = mount(
      <Router>
        <Slider type="New Release" games={gameList} />
      </Router>
    );
    const gameCards = wrapper.find("GameCard");
    expect(gameCards.length).toBe(gameList.length);
    expect(wrapper.find("#slider-header").text()).toBe("New Release");
    wrapper.unmount();
  });
});
