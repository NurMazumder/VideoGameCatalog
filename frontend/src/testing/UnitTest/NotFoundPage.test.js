import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import GameCard from "../../components/GameCard/GameCard";
import NotFoundPage from "../../pages/NotFoundPage/NotFoundPage";

describe("NotFound Page", () => {
  it("Renders not found page correctly", () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );
    expect(
      screen.getByText(
        "Thanks for visiting the site but the page doesn't exist."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Head back to our main page.")).toBeInTheDocument();
  });
  it("Clicking on link leads to home page", () => {
    render(
      <Router>
        <NotFoundPage />
      </Router>
    );
    const homeLink = screen.getByRole("link", {
      name: "Head back to our main page.",
    });
    fireEvent.click(homeLink);
    expect(window.location.pathname).toBe("/main");
  });
});
