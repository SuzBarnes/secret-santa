import React from "react";
import { cleanup, render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import JoinEvent from "../components/JoinEvent";
import { AuthProvider } from "../contexts/AuthProvider";

const validProps = {
  onClick: jest.fn(),
};
beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <JoinEvent onClick={validProps.onClick()} />
      </AuthProvider>
    </BrowserRouter>
  );
});

afterEach(cleanup);

describe("JoinEvent", () => {
  const { asFragment } = render(
    <BrowserRouter>
      <AuthProvider>
        <JoinEvent />
      </AuthProvider>
    </BrowserRouter>
  );
  it("renders correctly", () => {
    expect(asFragment()).toMatchSnapshot();
  });
  it("renders the button Join! correctly", () => {
    const button = screen.getAllByRole("button");
    expect(button).toHaveLength(1);

    const joinButton = screen.getByText(/Join!/i);
    expect(joinButton).toBeInstanceOf(HTMLButtonElement);
  });
  it("join event button works", () => {
    const joinButton = screen.getByTestId("join");
    fireEvent.click(joinButton);
    expect(validProps.onClick).toHaveBeenCalledTimes(1);
  });
  xit("displays message when event code is a match", () => {});
  xit("displays an error message when event code is invalid/not found", () => {});
  xit("displays an invite code once joined", () => {});
});
