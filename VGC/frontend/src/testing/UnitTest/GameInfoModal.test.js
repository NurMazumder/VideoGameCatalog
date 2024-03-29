import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import GameInfoModal from "../../components/GameInfoModal/GameInfoModal";

describe("GameInfoModal Component", () => {
  it("Renders game modal correctly with props", () => {
    const game = {
      image: "vite.svg",
      title: "Test Game",
      description: "This is a test game.",
      releaseDate: "April 20, 2020",
      price: "Free to use",
    };
    render(
      <GameInfoModal
        image={game.image}
        title={game.title}
        description={game.description}
        releaseDate={game.releaseDate}
        price={game.price}
      />
    );
    expect(screen.getByAltText("Game Image")).toHaveAttribute(
      "src",
      game.image
    );
    expect(screen.getByText(game.title)).toBeInTheDocument();
    expect(screen.getByText(game.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Release Date: ${game.releaseDate}`)
    ).toBeInTheDocument();
    expect(screen.getByText(`Price: ${game.price}`)).toBeInTheDocument();
  });
  it("Renders game modal correctly without any props", () => {
    render(<GameInfoModal />);
    expect(screen.getByAltText("Game Image")).toBeInTheDocument();
    expect(screen.getByText("Release Date:")).toBeInTheDocument();
    expect(screen.getByText("Price:")).toBeInTheDocument();
  });
  it("Close button is clickable", () => {
    const mockOnClick = jest.fn();
    render(<GameInfoModal onClick={mockOnClick} />);
    const closeButton = screen.getByRole("button");
    expect(closeButton).toBeInTheDocument();
    expect(closeButton).toHaveTextContent("x");
    fireEvent.click(closeButton);
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
});
