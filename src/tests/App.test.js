import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "../contexts/AuthProvider";
import App from "../components/App";

describe("App", () => {
  xit("renders correctly", () => {
    render(
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    );

    const app = screen.getByText(/Secret Santa/i);

    expect(app).toBeInTheDocument();
  });
});
