import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import { AuthProvider } from "../contexts/AuthProvider";

const validProps = {
  onClick: jest.fn(),
  onSubmit: jest.fn(),
};

beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Login onClick={validProps.onClick} onSubmit={validProps.onSubmit} />
      </AuthProvider>
    </BrowserRouter>
  );
});

afterEach(cleanup);

describe("Login", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthProvider>
        <Login />
      </AuthProvider>
    </BrowserRouter>
  );
  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders the button Log In correctly", () => {
    const button = screen.getAllByRole("button");
    expect(button).toHaveLength(2);

    const loginButton = screen.getByText(/Log in/i);
    expect(loginButton).toBeInstanceOf(HTMLButtonElement);
  });
  it("renders the toggle password button correctly", () => {
    const toggleButton = screen.getByTitle(/eyeSlash/i);
    expect(toggleButton).toBeInstanceOf(SVGTitleElement);
  });

  xit("redirects you upon logging in being successful", () => {
    const loginButton = screen.getByText(/Log in/i);
    fireEvent.click(loginButton);
  });
});
xit("displays an error message on username / password  being incorrect", () => {});
it("toggle password works", () => {
  const toggleButton = screen.getByTestId("togglePasswordButton");
  fireEvent.click(toggleButton);
  expect(screen.getByTitle(/eyePassword/i)).toBeInstanceOf(SVGTitleElement);
});
xit("when 'sign up' is clicked, the page is redirected to /register", () => {});
