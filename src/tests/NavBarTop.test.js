import React from "react";
import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NavBarTop from "../components/NavBarTop";
import { AuthProvider } from "../contexts/AuthProvider";

describe("NavBarTop", () => {
  it("renders correctly", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <NavBarTop />
        </AuthProvider>
      </BrowserRouter>
    );
  });
});
