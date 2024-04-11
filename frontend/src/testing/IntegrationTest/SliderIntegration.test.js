import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Enzyme, { mount } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
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
    render(
      <Router>
        <Slider type="Popular" games={gameList} />{" "}
      </Router>
    );
    expect(screen.getByAltText("Game Image")).toHaveAttribute(
      "src",
      gameList.image
    );
    expect(screen.getByText("View More")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText(gameList[0].title)).toBeInTheDocument();
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
    render(
      <Router>
        <Slider type="New Release" games={gameList} />
      </Router>
    );
    gameList.forEach((game) => {
      expect(screen.getByText(game.title)).toBeInTheDocument();
    });
    const gameImages = screen.queryAllByAltText("Game Image");
    gameImages.forEach((gameImage, index) => {
      expect(gameImage).toHaveAttribute("src", gameList[index].image);
    });
    expect(screen.getByText("View More")).toBeInTheDocument();
    expect(screen.getByText("New Release")).toBeInTheDocument();
  });
  it("Renders slider correctly with games that have invalid image types", () => {
    const gameList = [
      {
        image: 123,
        title: "Minecraft",
      },
      {
        image: true,
        title: "Vite",
      },
      {
        image: ["React.png"],
        title: "React",
      },
      {
        image: "Pac.png",
        title: "PacMan",
      },
    ];
    render(
      <Router>
        <Slider type="Popular" games={gameList} />
      </Router>
    );
    const gameImages = screen.queryAllByAltText("Game Image");
    const validGames = gameList.filter(
      (game) => typeof game.image === "string"
    );
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("View More")).toBeInTheDocument();
    expect(gameImages.length).toBe(validGames.length);
  });
  it("Simulate view more click to searchpage", () => {
    const gameList = [
      {
        id: "1",
        image: "Pac.png",
        title: "PacMan",
      },
      {
        id: "2",
        image: "vite.png",
        title: "Vite",
      },
    ];
    const wrapper = mount(
      <Router>
        <Slider type="Popular" games={gameList} />
      </Router>
    );
    wrapper.find("Slider").first().find("#view-link Link").simulate("click");
    expect(window.location.pathname).toBe("/search");
    wrapper.unmount();
  });
});
