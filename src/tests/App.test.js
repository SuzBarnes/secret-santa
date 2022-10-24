import React from "react";
import { render, screen } from "@testing-library/react";
import App from "../components/App";

describe("App", () => {
  xit("renders correctly", () => {
    render(<App />);

    const app = screen.getByText(/Secret Santa/i);

    expect(app).toBeInTheDocument();
  });
});
