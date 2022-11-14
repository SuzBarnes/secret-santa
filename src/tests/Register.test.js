import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Register from "../components/Register";
import { AuthProvider } from "../contexts/AuthProvider";

const validProps = {
  onClick: jest.fn(),
  onSubmit: jest.fn(),
};
beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Register
          onClick={validProps.onClick()}
          onSubmit={validProps.onSubmit()}
        />
      </AuthProvider>
    </BrowserRouter>
  );
});

afterEach(cleanup);

describe("Register", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthProvider>
        <Register />
      </AuthProvider>
    </BrowserRouter>
  );
  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders the button Register correctly", () => {
    const button = screen.getAllByRole("button");
    expect(button).toHaveLength(2);

    const registerButton = screen.getByTestId("register");
    expect(registerButton).toBeInstanceOf(HTMLButtonElement);
  });
  it("renders the toggle password button correctly", () => {
    const toggleButton = screen.getByTitle(/eyeSlash/i);
    expect(toggleButton).toBeInstanceOf(SVGTitleElement);
  });

  xit("redirects you upon logging in being successful", () => {
    const registerButton = screen.getByText(/Register/i);
    fireEvent.click(registerButton);
  });
});
xit("displays an error message on email already existing", () => {});
it("toggle password works", () => {
  const toggleButton = screen.getByTestId("togglePasswordButton");
  fireEvent.click(toggleButton);
  expect(screen.getByTitle(/eye/i)).toBeInstanceOf(SVGTitleElement);
});
xit("when 'Sign In' is clicked, the page is redirected to /login", () => {});
