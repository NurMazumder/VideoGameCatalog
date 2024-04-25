import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Navbar from "../../components/Navbar/Navbar";

const mockStore = configureStore([]);

jest.mock("../../actions/auth", () => ({
  logout: jest.fn(),
}));

describe("Navbar Component", () => {
  it("Renders authenticated navigation links", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, loading: false },
    });
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    expect(screen.getByText("My Games")).toBeInTheDocument();
    expect(screen.getByText("Account")).toBeInTheDocument();
    expect(screen.getByText("Logout")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByText("VGC")).toBeInTheDocument();
    expect(screen.queryByText("Register")).toBeNull();
    expect(screen.queryByText("Login")).toBeNull();
  });
  it("Renders vistors navigation links", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, loading: false },
    });
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByText("VGC")).toBeInTheDocument();
    expect(screen.queryByText("My Games")).toBeNull();
    expect(screen.queryByText("Account")).toBeNull();
    expect(screen.queryByText("Logout")).toBeNull();
  });
  it("Navigation for users", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, loading: false },
    });
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    const homeButton = screen.getByText("VGC");
    fireEvent.click(homeButton);
    expect(window.location.pathname).toBe("/main");
    const accountButton = screen.getByText("Account");
    fireEvent.click(accountButton);
    expect(window.location.pathname).toBe("/Account");
    const myGamesButton = screen.getByText("My Games");
    fireEvent.click(myGamesButton);
    expect(window.location.pathname).toBe("/MyGames");
  });
  it("Navigation for visitors", () => {
    const store = mockStore({
      auth: { isAuthenticated: false, loading: false },
    });
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    const homeButton = screen.getByText("VGC");
    fireEvent.click(homeButton);
    expect(window.location.pathname).toBe("/");
    const registerButton = screen.getByText("Register");
    fireEvent.click(registerButton);
    expect(window.location.pathname).toBe("/Register");
    const loginButton = screen.getByText("Login");
    fireEvent.click(loginButton);
    expect(window.location.pathname).toBe("/Login");
  });

  /*
  it("Users logging out", () => {
    let store = mockStore({
      auth: { isAuthenticated: true, loading: false },
    });
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>
    );
    const logoutButton = screen.getByText("Logout");
    fireEvent.click(logoutButton);
    expect(window.location.pathname).toBe("/");
    expect(screen.getByText("Register")).toBeInTheDocument();
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });*/
});
