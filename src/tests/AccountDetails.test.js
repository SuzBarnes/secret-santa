import React from "react";
import { render, screen } from "@testing-library/react";
import AccountDetails from "../components/AccountDetails";

describe("AccountDetails", () => {
  xit("renders correctly", () => {
    render(<AccountDetails />);

    const accountDetails = screen.getByText(/Account Details/i);

    expect(accountDetails).toBeInTheDocument();
  });
});
