import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Logout from "../components/Logout";
import { AuthProvider } from "../contexts/AuthProvider";

beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <Logout />
      </AuthProvider>
    </BrowserRouter>
  );
});

afterEach(cleanup);

describe("Logout", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthProvider>
        <Logout />
      </AuthProvider>
    </BrowserRouter>
  );
  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  it("displays the logout SVG correctly", () => {
    const logoutButton = screen.getByTestId(/logout/i);
    expect(logoutButton).toBeInstanceOf(SVGSVGElement);
  });

  xit("when clicked, takes you to login page", () => {});
});
