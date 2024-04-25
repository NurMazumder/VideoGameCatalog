import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import Alert from "../../components/Alert/Alert";

const mockStore = configureStore([]);

describe("Alert Component", () => {
  it("Renders alert correctly", () => {
    const store = mockStore({
      alert: [{ id: 1, msg: "Sample Alert", alertType: "success" }],
    });
    render(
      <Provider store={store}>
        <Alert />
      </Provider>
    );
    const alert = screen.getByText("Sample Alert");
    expect(alert).toBeInTheDocument();
    expect(alert).toHaveClass("alert-success");
  });
});
