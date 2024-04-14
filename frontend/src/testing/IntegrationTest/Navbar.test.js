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
    expect(screen.getByText("myGames")).toBeInTheDocument();
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
    expect(screen.queryByText("myGames")).toBeNull();
    expect(screen.queryByText("Account")).toBeNull();
    expect(screen.queryByText("Logout")).toBeNull();
  });
  it("Vistors clicking on VGC lead to default page", () => {
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
    const homelink = screen.getByText("VGC");
    fireEvent.click(homelink);
    expect(window.location.pathname).toBe("/");
  });
  it("Users clicking on VGC lead to main page", () => {
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
    const homelink = screen.getByText("VGC");
    fireEvent.click(homelink);
    expect(window.location.pathname).toBe("/main");
  });
  /*it("Users logging out", () => {
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
    const logout = screen.getByText("Logout");
    console.log(logout)
    fireEvent.click(logout);
    expect(store.getState().auth.isAuthenticated).toBe(false);
  });*/
});
