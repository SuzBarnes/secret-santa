import React from "react";
import { BrowserRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import { AuthProvider } from "../contexts/AuthProvider";
import AdminCard from "../components/AdminCard";

describe("AdminCard", () => {
  xit("renders correctly", () => {
    const { asFragment } = render(
      <BrowserRouter>
        <AuthProvider>
          <AdminCard />
        </AuthProvider>
      </BrowserRouter>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
