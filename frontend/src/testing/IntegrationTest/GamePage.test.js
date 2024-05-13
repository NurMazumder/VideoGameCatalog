import React from "react";
import { render, screen, act } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import GamePage from "../../pages/GamePage/GamePage";
import { useParams } from "react-router-dom";

const mockStore = configureStore([]);
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: jest.fn(),
}));
jest.mock("../../actions/alert", () => () => <div>Alert Message</div>);
jest.mock("../../components/Review/Review", () => () => (
  <div>Review Component</div>
));

describe("Game Page", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders game page with given data", async () => {
    const store = mockStore({});
    const setAlert = jest.fn();
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
        <Provider store={store}>
          <Router>
            <GamePage setAlert={setAlert} />
          </Router>
        </Provider>
      );
    });
    expect(screen.getByText("Mock Game")).toBeInTheDocument();
    expect(screen.getByText("2022-01-01")).toBeInTheDocument();
    expect(screen.getByText(/Genres:/i)).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
    expect(screen.getByText(/Platforms:/i)).toBeInTheDocument();
    expect(screen.getByText("PC")).toBeInTheDocument();
    expect(screen.getByText("PS5")).toBeInTheDocument();
    expect(screen.getByText(/Tags:/i)).toBeInTheDocument();
    expect(screen.getByText("Singleplayer")).toBeInTheDocument();
    expect(screen.getByText("Open World")).toBeInTheDocument();
    expect(screen.getByText("Mock game description.")).toBeInTheDocument();
    expect(screen.getByAltText("Game Background")).toBeInTheDocument();
    expect(screen.getByAltText("Game Background")).toHaveAttribute(
      "src",
      "mock.jpg"
    );
  });
  it("Renders not found page when fetching returns an error", async () => {
    const store = mockStore({});
    const setAlert = jest.fn();
    useParams.mockReturnValue({ id: "1" });
    await act(async () => {
      render(
        <Provider store={store}>
          <Router>
            <GamePage setAlert={setAlert} />
          </Router>
        </Provider>
      );
    });
    expect(
      screen.getByText(
        "Thanks for visiting the site but the page doesn't exist."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Head back to our main page.")).toBeInTheDocument();
  });
  /*it("Renders the reviews section", async () => {});*/
});
