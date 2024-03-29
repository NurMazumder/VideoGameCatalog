import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Slider from "../../components/Slider/Slider";

describe("Slider Component", () => {
  it("Renders slider with one game", () => {
    const gameList = [
      {
        image: "Minecraft.png",
        title: "Minecraft",
        description:
          "Minecraft is a 2011 sandbox game developed by Mojang Studios and originally released in 2009.",
      },
    ];
    render(<Slider type="Popular" games={gameList} />);
    expect(screen.getByAltText("Game Image")).toHaveAttribute(
      "src",
      gameList.image
    );
    expect(screen.getByText("View More")).toBeInTheDocument();
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText(gameList[0].title)).toBeInTheDocument();
    expect(screen.getByText(gameList[0].description)).toBeInTheDocument();
  });
  it("Renders slider with multiple game", () => {
    const gameList = [
      {
        image: "Minecraft.png",
        title: "Minecraft",
        description: "Minecraft is a sandboxm game.",
      },
      {
        image: "Vite.png",
        title: "Vite",
        description: "Vite is a testing game.",
      },
      {
        image: "Fornite.png",
        title: "Fornite",
        description: "Fornite is a battle royale game.",
      },
    ];
    render(<Slider type="New Release" games={gameList} />);
    gameList.forEach((game) => {
      expect(screen.getByText(game.title)).toBeInTheDocument();
      expect(screen.getByText(game.description)).toBeInTheDocument();
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
        description: "Minecraft is a sandboxm game.",
      },
      {
        image: true,
        title: "Vite",
        description: "Vite is a testing game.",
      },
      {
        image: ["React.png"],
        title: "React",
        description: "React is not a game but is a javascript library.",
      },
      {
        image: "Fornite.png",
        title: "Fornite",
        description: "Fornite is a battle royale game.",
      },
    ];
    render(<Slider type="Popular" games={gameList} />);
    const gameImages = screen.queryAllByAltText("Game Image");
    const validGames = gameList.filter(
      (game) => typeof game.image === "string"
    );
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("View More")).toBeInTheDocument();
    expect(gameImages.length).toBe(validGames.length);
  });
  it("Calls onClick handler when a game card is clicked", () => {
    const onClickMock = jest.fn();
    const gameList = [
      {
        image: "Minecraft.png",
        title: "Minecraft",
        description: "Minecraft is a sandbox game.",
      },
      {
        image: "Fornite.png",
        title: "Fornite",
        description: "Fornite is a battle royale game.",
      },
    ];
    render(<Slider type="Popular" games={gameList} onClick={onClickMock} />);
    const gameCard1 = screen.getAllByTestId("game-card")[0];
    fireEvent.click(gameCard1);
    expect(onClickMock).toHaveBeenCalledWith(gameList[0]);
    const gameCard2 = screen.getAllByTestId("game-card")[1];
    fireEvent.click(gameCard2);
    expect(onClickMock).toHaveBeenCalledWith(gameList[1]);
  });
});
