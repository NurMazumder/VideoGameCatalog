import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@cfaester/enzyme-adapter-react-18";
import { Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import PrivateRoute from "../../components/PrivateRoute/PrivateRoute";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe("PrivateRoute Component", () => {
  it("Renders children when user is authenticated", () => {
    const store = mockStore({
      auth: { isAuthenticated: true, loading: false },
    });
    const wrapper = shallow(
      <Provider store={store}>
        <PrivateRoute>
          <div>Children Component</div>
        </PrivateRoute>
      </Provider>
    );
    expect(wrapper.contains(<div>Children Component</div>)).toBe(true);
    expect(wrapper.find(Navigate)).toHaveLength(0);
  });
  it("Redirects to login when user is not authenticated", () => {});
});
