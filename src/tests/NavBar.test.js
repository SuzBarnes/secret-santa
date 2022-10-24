import React from "react";
import { render, screen } from "@testing-library/react";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  xit("renders correctly", () => {
    render(<NavBar />);

    const navBar = screen.getByText(/NavBar/i);

    expect(navBar).toBeInTheDocument();
  });
});
