import React from "react";
import { render, screen } from "@testing-library/react";
import AdminCard from "../components/AdminCard";

describe("AdminCard", () => {
  xit("renders correctly", () => {
    const { asFragment } = render(<AdminCard />);
    expect(asFragment()).toMatchSnapshot();
  });
});
