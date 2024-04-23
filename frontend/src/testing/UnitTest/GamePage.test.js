import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GamePage from "../../pages/GamePage/GamePage";
import { useParams } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));

describe("Game Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders game page with given data", async () => {
    useParams.mockReturnValue({ id: "1" });
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        game_name: "Mock Game",
        game_released: "2022-01-01",
        game_genres: ["Action", "Adventure"],
        game_platforms: ["PC", "PS5"],
        game_tags: ["Singleplayer", "Open World"],
        game_description: "Mock game description.",
        game_background_image: "mock.jpg",
      }),
    });
    await act(async () => {
      render(
        <Router>
          <GamePage />
        </Router>
      );
    });
    expect(screen.getByText("Mock Game")).toBeInTheDocument();
    expect(screen.getByText("Release Date: 2022-01-01")).toBeInTheDocument();
    expect(screen.getByText("Genres: Action, Adventure")).toBeInTheDocument();
    expect(screen.getByText("Platforms: PC, PS5")).toBeInTheDocument();
    expect(
      screen.getByText("Tags: Singleplayer, Open World")
    ).toBeInTheDocument();
    expect(screen.getByText("Mock game description.")).toBeInTheDocument();
    expect(screen.getByAltText("Game Image")).toBeInTheDocument();
    expect(screen.getByAltText("Game Image")).toHaveAttribute(
      "src",
      "mock.jpg"
    );
  });
  it("Renders not found page when fetching returns an error", async () => {
    useParams.mockReturnValue({ id: "1" });
    console.error = jest.fn();
    global.fetch = jest
      .fn()
      .mockRejectedValueOnce(new Error("Failed fetching game"));
    await act(async () => {
      render(
        <Router>
          <GamePage />
        </Router>
      );
    });
    expect(
      screen.getByText(
        "Thanks for visiting the site but the page doesn't exist."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Head back to our main page.")).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Failed fetching game",
      })
    );
  });
});
