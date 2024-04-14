import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";

describe("GameCard Component", () => {
  it("Renders gamecard correctly with props", () => {
    const game = {
      id: "5",
      image: "vite.svg",
      title: "Test Game",
    };
    render(
      <Router>
        <GameCard id={game.id} image={game.image} title={game.title} />
      </Router>
    );
    expect(screen.getByAltText("Game Image")).toHaveAttribute(
      "src",
      game.image
    );
    expect(screen.getByText(game.title)).toBeInTheDocument();
  });
  it("Renders game card correctly when image type is wrong", () => {
    const invalidImagePath = 1;
    render(
      <Router>
        <GameCard image={invalidImagePath} title="Test Game" />
      </Router>
    );
    expect(screen.queryByAltText("Game Image")).toBeNull();
    expect(screen.getByText("Error Processing Image")).toBeInTheDocument();
    expect(screen.getByText("Test Game")).toBeInTheDocument();
  });
  it("Game card has link to the correct path", () => {
    render(
      <Router>
        <GameCard id="123" />
      </Router>
    );
    const linkElement = screen.getByTestId("game-card").querySelector("a");
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute("href")).toBe("/game/123");
  });
});
