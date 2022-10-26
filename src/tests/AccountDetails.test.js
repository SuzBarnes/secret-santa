import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import AccountDetails from "../components/AccountDetails";

describe("AccountDetails", () => {
  it("renders correctly", () => {
    const { asFragment } = render(<AccountDetails />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders correctly", () => {
    render(<AccountDetails />);

    const accountDetails = screen.getByText(/Account Details/i);

    expect(accountDetails).toBeInTheDocument();
  });

  it("renders correct labels and icon", () => {
    const { getByTestId } = render(<AccountDetails />);

    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(getByTestId("eye-icon")).toHaveClass("eyeIcon");
  });

  it("removes a like field upon delete button clicked", () => {
    const { getAllByTestId } = render(<AccountDetails />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(getAllByTestId("likes")).toHaveLength(6);
    const deleteButton = screen.getByTestId("like-delete-button-1");
    fireEvent.click(deleteButton);
    expect(getAllByTestId("likes")).toHaveLength(5);
  });

  it("adds a like field upon add button clicked", () => {
    const { getAllByTestId } = render(<AccountDetails />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const addButton = screen.getByTestId("like-add-button");
    fireEvent.click(addButton);
    expect(getAllByTestId("likes")).toHaveLength(7);
  });

  it("removes a dislike field upon delete button clicked", () => {
    const { getAllByTestId } = render(<AccountDetails />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(getAllByTestId("dislikes")).toHaveLength(3);
    const deleteButton = screen.getByTestId("dislike-delete-button-1");
    fireEvent.click(deleteButton);
    expect(getAllByTestId("dislikes")).toHaveLength(2);
  });

  it("adds a dislike field upon add button clicked", () => {
    const { getAllByTestId } = render(<AccountDetails />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    const addButton = screen.getByTestId("dislike-add-button");
    fireEvent.click(addButton);
    expect(getAllByTestId("dislikes")).toHaveLength(4);
  });
});
