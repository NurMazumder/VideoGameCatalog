import React from "react";
import {
  render,
  screen,
  fireEvent,
  act,
  waitFor,
} from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import Review from "../../components/Review/Review";

const mockStore = configureStore([]);
const mockReviews = [
  {
    _id: "1",
    author: { name: "John Doe", _id: "10" },
    body: "Great game!",
    rating: 5,
  },
  {
    _id: "2",
    author: { name: "Jane Smith", _id: "1" },
    body: "Could be better.",
    rating: 3,
  },
];

describe("Review Component", () => {
  let mock;
  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  const originalConsoleError = console.error;
  afterEach(() => {
    console.error = originalConsoleError;
    mock.restore();
  });

  it("Renders review component correctly when logged in", async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          _id: "100",
          username: "tester",
        },
      },
    });
    mock.onGet("/api/games/review/123").reply(200, mockReviews);
    await act(
      (async = () => {
        render(
          <Provider store={store}>
            <Router>
              <Review gameId="123" />
            </Router>
          </Provider>
        );
      })
    );
    expect(await screen.findByText("Leave a Review")).toBeInTheDocument();
    expect(await screen.findByText("Rate It:")).toBeInTheDocument();
    expect(await screen.findByText("Submit Review")).toBeInTheDocument();
    expect(
      screen.queryByText("Please Log In or Sign Up to submit a review.")
    ).not.toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText(/Great game!/)).toBeInTheDocument();
    expect(screen.getByText(/Could be better./)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: "Delete" })
    ).not.toBeInTheDocument();
  });
  it("Renders review component correctly when not signed in", async () => {
    const store = mockStore({
      auth: { isAuthenticated: false },
    });
    mock.onGet("/api/games/review/123").reply(200, mockReviews);
    await act(
      (async = () => {
        render(
          <Provider store={store}>
            <Router>
              <Review gameId="123" />
            </Router>
          </Provider>
        );
      })
    );
    expect(screen.queryByText("Leave a Review")).not.toBeInTheDocument();
    expect(screen.queryByText("Rate It:")).not.toBeInTheDocument();
    expect(screen.queryByText("Submit Review")).not.toBeInTheDocument();
    expect(await screen.findByText("Log In")).toBeInTheDocument();
    expect(await screen.findByText("Sign Up")).toBeInTheDocument();
    expect(screen.getByText("Reviews")).toBeInTheDocument();
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();
    expect(screen.getByText(/Great game!/)).toBeInTheDocument();
    expect(screen.getByText(/Could be better./)).toBeInTheDocument();
  });
  it("Updates review input correctly", async () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });
    mock.onGet("/api/games/review/123").reply(200, mockReviews);
    await act(
      (async = () => {
        render(
          <Provider store={store}>
            <Router>
              <Review gameId="123" />
            </Router>
          </Provider>
        );
      })
    );
    const reviewInput = screen.getByPlaceholderText(
      "Write your review here..."
    );
    const ratingSelect = screen.getByText("Rate It:");
    fireEvent.change(reviewInput, { target: { value: "Test review" } });
    fireEvent.change(ratingSelect.nextSibling, { target: { value: "3" } });
    expect(reviewInput.value).toBe("Test review");
    expect(ratingSelect.nextSibling.value).toBe("3");
  });
  it("Cannot submit an empty review", async () => {
    const store = mockStore({
      auth: { isAuthenticated: true },
    });
    mock.onGet("/api/games/review/123").reply(200, mockReviews);
    await act(
      (async = () => {
        render(
          <Provider store={store}>
            <Router>
              <Review gameId="123" />
            </Router>
          </Provider>
        );
      })
    );
    const reviewInput = screen.getByPlaceholderText(
      "Write your review here..."
    );
    const submitButton = screen.getByRole("button", { name: "Submit Review" });
    fireEvent.change(reviewInput, { target: { value: "    " } });
    expect(reviewInput.value).toBe("    ");
    fireEvent.click(submitButton);
    expect(
      screen.getByText("Review body cannot be empty.")
    ).toBeInTheDocument();
  });
  it("Successfully submits a review", async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          _id: "3",
          username: "tester",
        },
      },
    });
    mock.onGet("/api/games/review/123").reply(200, mockReviews);
    mock.onPost("/api/games/review/123").reply(200, [
      ...mockReviews,
      {
        _id: "3",
        author: { name: "tester", _id: "3" },
        body: "Test review",
        rating: 1,
      },
    ]);
    await act(
      (async = () => {
        render(
          <Provider store={store}>
            <Router>
              <Review gameId="123" />
            </Router>
          </Provider>
        );
      })
    );
    const reviewInput = screen.getByPlaceholderText(
      "Write your review here..."
    );
    const ratingSelect = screen.getByText("Rate It:");
    const submitButton = screen.getByRole("button", { name: "Submit Review" });
    fireEvent.change(reviewInput, { target: { value: "Test review" } });
    fireEvent.change(ratingSelect.nextSibling, { target: { value: "1" } });
    fireEvent.click(submitButton);
    await waitFor(() => {
      expect(reviewInput.value).toBe("");
      expect(ratingSelect.nextSibling).toHaveValue("5");
      expect(screen.getByText(/Test review/)).toBeInTheDocument();
      expect(screen.getByText(/tester/)).toBeInTheDocument();
      expect(screen.getByText(/1\/5/)).toBeInTheDocument();
      expect(
        screen.getByRole("button", { name: "Delete" })
      ).toBeInTheDocument();
    });
  });
  /*
  it("Deletes review when logged in", async () => {
    const store = mockStore({
      auth: {
        isAuthenticated: true,
        user: {
          _id: "10",
          username: "John Doe",
        },
      },
    });
    mock.onGet("/api/games/review/123").reply(200, mockReviews);
    mock.onDelete("/api/games/review/123").reply(200, [
      {
        _id: "2",
        author: { name: "Jane Smith", _id: "1" },
        body: "Could be better.",
        rating: 3,
      },
    ]);
    await act(
      (async = () => {
        render(
          <Provider store={store}>
            <Router>
              <Review gameId="123" />
            </Router>
          </Provider>
        );
      })
    );
    const deleteButton = screen.getByRole("button", { name: "Delete" });
    fireEvent.click(deleteButton);
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument();
      expect(screen.queryByText(/Great game!/)).not.toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(screen.getByText(/Could be better./)).toBeInTheDocument();
    });
  });
  */
});
