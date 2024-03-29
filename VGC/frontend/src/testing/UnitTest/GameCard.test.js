import React from "react";
import { render, screen } from "@testing-library/react";
import GameCard from "../../components/GameCard/GameCard";

describe("GameCard Component", () => {
  it("Renders gamecard correctly with props", () => {
    const game = {
      image: "vite.svg",
      title: "Test Game",
      description: "This is a test game.",
    };
    render(
      <GameCard
        image={game.image}
        title={game.title}
        description={game.description}
      />
    );
    expect(screen.getByAltText("Game Image")).toHaveAttribute(
      "src",
      game.image
    );
    expect(screen.getByText(game.title)).toBeInTheDocument();
    expect(screen.getByText(game.description)).toBeInTheDocument();
  });
  it("Renders game card correctly when image type is wrong", () => {
    const invalidImagePath = 1;
    render(
      <GameCard
        image={invalidImagePath}
        title="Test Game"
        description="This is a test game"
      />
    );
    expect(screen.queryByAltText("Game Image")).toBeNull();
    expect(screen.getByText("Error Processing Image")).toBeInTheDocument();
    expect(screen.getByText("Test Game")).toBeInTheDocument();
    expect(screen.getByText("This is a test game")).toBeInTheDocument();
  });
});
