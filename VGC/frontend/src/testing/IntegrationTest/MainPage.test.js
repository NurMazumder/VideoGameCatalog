/*import React from "react";
import Enzyme, { mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { BrowserRouter } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";

Enzyme.configure({ adapter: new Adapter() });
describe("MainPage Component", () => {
  const gameList = [
    {
      image: "Minecraft.png",
      title: "Minecraft",
      description:
        "Minecraft is a 2011 sandbox game developed by Mojang Studios and originally released in 2009.",
      releaseDate: "November 18, 2011",
      price: "$26.95",
    },
    {
      image: "GTA5.png",
      title: "GTA5",
      description:
        "Grand Theft Auto V is a 2013 action-adventure game developed by Rockstar North and published by Rockstar Games.",
      releaseDate: "September 17, 2013",
      price: "$29.99",
    },
  ];
  it("Renders page correctly", () => {
    const wrapper = mount(
      <BrowserRouter>
        <MainPage gameList={gameList} />
      </BrowserRouter>
    );
    expect(wrapper.find("Slider").exists()).toBe(true);
    expect(wrapper.find("GameInfoModal").exists()).toBe(false);
    wrapper.unmount();
  });
  it("Renders game modal when no game data is provided", () => {
    const wrapper = mount(
      <BrowserRouter>
        <MainPage />
      </BrowserRouter>
    );
    wrapper.find('Slider[type="Popular"]').prop("onClick")();
    expect(wrapper.find("GameInfoModal").exists()).toBe(false);
    wrapper.unmount();
  });
  it("Open and close modal when game card is clicked", () => {
    const wrapper = mount(
      <BrowserRouter>
        <MainPage gameList={gameList} />
      </BrowserRouter>
    );
    const Slider = wrapper.find("Slider").first();
    const firstCard = Slider.find("GameCard").first();
    const secondCard = Slider.find("GameCard").at(1);
    firstCard.simulate("click");
    expect(wrapper.find("GameInfoModal").exists()).toBe(true);
    expect(wrapper.find("GameInfoModal").prop("title")).toBe(gameList[0].title);
    expect(wrapper.find("GameInfoModal").prop("description")).toBe(
      gameList[0].description
    );
    expect(wrapper.find("GameInfoModal").prop("releaseDate")).toBe(
      gameList[0].releaseDate
    );
    expect(wrapper.find("GameInfoModal").prop("price")).toBe(gameList[0].price);
    wrapper.find("GameInfoModal").find("#modal-close-button").simulate("click");
    expect(wrapper.find("GameInfoModal").exists()).toBe(false);
    secondCard.simulate("click");
    expect(wrapper.find("GameInfoModal").exists()).toBe(true);
    expect(wrapper.find("GameInfoModal").prop("title")).toBe(gameList[1].title);
    expect(wrapper.find("GameInfoModal").prop("description")).toBe(
      gameList[1].description
    );
    expect(wrapper.find("GameInfoModal").prop("releaseDate")).toBe(
      gameList[1].releaseDate
    );
    expect(wrapper.find("GameInfoModal").prop("price")).toBe(gameList[1].price);
    wrapper.find("GameInfoModal").find("#modal-close-button").simulate("click");
    expect(wrapper.find("GameInfoModal").exists()).toBe(false);
    wrapper.unmount();
  });
  it("Navigates to search path when View More is clicked", () => {
    const wrapper = mount(
      <BrowserRouter>
        <MainPage gameList={gameList} />
      </BrowserRouter>
    );
    wrapper.find("Slider").first().find("#view-link").simulate("click");
    expect(window.location.pathname).toBe("/search");
    wrapper.unmount();
  });
});
*/
