import React from "react";
import { BrowserRouter } from "react-router-dom";
import {
  fireEvent,
  render,
  screen,
  cleanup,
  getAllByTestId,
} from "@testing-library/react";
import AccountDetails from "../components/AccountDetails";
import { AuthProvider } from "../contexts/AuthProvider";

const validProps = {
  onClick: jest.fn(),
};
beforeEach(() => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <AccountDetails onClick={validProps.onClick()} />
      </AuthProvider>
    </BrowserRouter>
  );
});
afterEach(cleanup);

describe("AccountDetails", () => {
  it("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <AuthProvider>
          <AccountDetails />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    const accountDetails = screen.getByText(/My Details/i);

    expect(accountDetails).toBeInTheDocument();
  });

  it("renders correct labels and icon", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(validProps.onClick).toHaveBeenCalledTimes(1);
  });

  xit("removes a like field upon delete button clicked", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getAllByTestId("likes")).toHaveLength(6);
    const deleteButton = screen.getByTestId("like-delete-button-1");
    fireEvent.click(deleteButton);
    expect(screen.getAllByTestId("likes")).toHaveLength(5);
  });

  xit("adds a like field upon add button clicked", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const addButton = screen.getByTestId("like-add-button");
    fireEvent.click(addButton);
    expect(screen.getAllByTestId("likes")).toHaveLength(7);
  });

  xit("removes a dislike field upon delete button clicked", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(screen.getAllByTestId("dislikes")).toHaveLength(3);
    const deleteButton = screen.getByTestId("dislike-delete-button-1");
    fireEvent.click(deleteButton);
    expect(screen.getAllByTestId("dislikes")).toHaveLength(2);
  });

  xit("adds a dislike field upon add button clicked", () => {
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const addButton = screen.getByTestId("dislike-add-button");
    fireEvent.click(addButton);
    expect(screen.getAllByTestId("dislikes")).toHaveLength(4);
  });
});
