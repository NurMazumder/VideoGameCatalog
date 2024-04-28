import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Review from "../../components/Review/Review";

const store = mockStore({
  auth: { isAuthenticated: true, loading: false },
});
describe("Review Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("Renders review componenet correctly when loggined", () => {});
  it("Renders review componenet correctly when not signed in", () => {});
  it("Update review input correctly", () => {});
  it("Submitting review when logged in", () => {});
  it("Submitting review when logged in", () => {});
});
