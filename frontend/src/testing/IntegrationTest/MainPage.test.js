import React from "react";
import { render, screen, act, waitFor } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import MainPage from "../../pages/MainPage/MainPage";

describe("Main Page", () => {
  const originalConsoleError = console.error;
  afterEach(() => {
    console.error = originalConsoleError;
  });
  const mockedPopularGames = [
    {
      game_id: 1,
      game_name: "Popular Game 1",
      game_releaseDate: "2023-01-01",
      game_backgroundimage: "popular_game_1.jpg",
    },
    {
      game_id: 2,
      game_name: "Popular Game 2",
      game_releaseDate: "2023-02-01",
      game_backgroundimage: "popular_game_2.jpg",
    },
    {
      game_id: 3,
      game_name: "Popular Game 3",
      game_releaseDate: "2023-03-01",
      game_backgroundimage: "popular_game_3.jpg",
    },
  ];
  const mockedNewGames = [];
  const mockedActionGames = [
    {
      game_id: 7,
      game_name: "Action Game 1",
      game_releaseDate: "2023-07-01",
      game_backgroundimage: "action_game_1.jpg",
    },
    {
      game_id: 8,
      game_name: "Action Game 2",
      game_releaseDate: "2023-08-01",
      game_backgroundimage: "action_game_2.jpg",
    },
  ];
  const mockedRPGGames = [
    {
      game_id: 9,
      game_name: "RPG Game 1",
      game_releaseDate: "2023-10-01",
      game_backgroundimage: "rpg_game_1.jpg",
    },
  ];
  const mockedShooterGames = [];

  it("Renders main page correctly with mocked data", async () => {
    global.fetch = jest.fn((url) => {
      if (url.endsWith("/api/games/popular?count=10")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockedPopularGames),
        });
      } else if (url.endsWith("/api/games/newest?count=10")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockedNewGames),
        });
      } else if (url.endsWith("/api/games/action?count=10")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockedActionGames),
        });
      } else if (url.endsWith("/api/games/rpg?count=10")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockedRPGGames),
        });
      } else if (url.endsWith("/api/games/shooter?count=10")) {
        return Promise.resolve({
          json: () => Promise.resolve(mockedShooterGames),
        });
      } else {
        return Promise.resolve({
          json: () => Promise.resolve({}),
        });
      }
    });
    await act(async () => {
      render(
        <Router>
          <MainPage />
        </Router>
      );
    });
    expect(screen.getByText("Popular")).toBeInTheDocument();
    expect(screen.getByText("Newest")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("RPG")).toBeInTheDocument();
    expect(screen.getByText("Shooter")).toBeInTheDocument();
    const popularSlider = screen.getByTestId("Popular-slider");
    const newestSlider = screen.getByTestId("Newest-slider");
    const actionSlider = screen.getByTestId("Action-slider");
    const rpgSlider = screen.getByTestId("RPG-slider");
    const shooterSlider = screen.getByTestId("Shooter-slider");
    expect(
      popularSlider.querySelectorAll("[data-testid='game-card']")
    ).toHaveLength(mockedPopularGames.length);
    expect(
      newestSlider.querySelectorAll("[data-testid='game-card']")
    ).toHaveLength(mockedNewGames.length);
    expect(
      actionSlider.querySelectorAll("[data-testid='game-card']")
    ).toHaveLength(mockedActionGames.length);
    expect(
      rpgSlider.querySelectorAll("[data-testid='game-card']")
    ).toHaveLength(mockedRPGGames.length);
    expect(
      shooterSlider.querySelectorAll("[data-testid='game-card']")
    ).toHaveLength(mockedShooterGames.length);
  });
  it("Renders main page correctly with errors", async () => {
    console.error = jest.fn();
    global.fetch = jest.fn(() =>
      Promise.reject(new Error("Failed to fetch games"))
    );
    render(
      <Router>
        <MainPage />
      </Router>
    );
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledTimes(5);
    });
    expect(screen.queryByText("Popular")).toBeInTheDocument();
    expect(screen.queryByText("Newest")).toBeInTheDocument();
    expect(screen.queryByText("Action")).toBeInTheDocument();
    expect(screen.queryByText("RPG")).toBeInTheDocument();
    expect(screen.queryByText("Shooter")).toBeInTheDocument();
    expect(console.error).toHaveBeenCalledWith(
      expect.objectContaining({
        message: "Failed to fetch games",
      })
    );
  });
});
