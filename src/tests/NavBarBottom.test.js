import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthProvider";
import NavBarBottom from "../components/NavBarBottom";

describe("NavBarBottom", () => {
  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <NavBarBottom />
        </AuthProvider>
      </BrowserRouter>
    );

    const navBarEvents = screen.getByText(/My Events/i);
    const navBarJoin = screen.getByText(/Join/i);
    const navBarCreate = screen.getByText(/Create/i);
    expect(navBarEvents).toBeInTheDocument();
    expect(navBarJoin).toBeInTheDocument();
    expect(navBarCreate).toBeInTheDocument();
  });
});
