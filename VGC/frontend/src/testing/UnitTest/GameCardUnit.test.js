import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";

describe("GameCard Component", () => {
  it("Renders gamecard correctly with props", () => {
    const game = {
      image: "vite.svg",
      title: "Test Game",
      description: "This is a test game.",
    };
    render(
      <Router>
        <GameCard image={game.image} title={game.title} />
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
});
