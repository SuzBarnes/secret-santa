import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBar from "../components/NavBar";

describe("NavBar", () => {
  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <NavBar />
      </BrowserRouter>
    );

    const navBar = screen.getByText(/NavBar/i);

    expect(navBar).toBeInTheDocument();
  });
});
