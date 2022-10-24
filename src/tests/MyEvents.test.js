import React from "react";
import { render, screen } from "@testing-library/react";
import MyEvents from "../components/MyEvents";

describe("MyEvents", () => {
    xit("renders correctly", () => {
        render(<MyEvents />);

        const myEvents = screen.getByText(/My Events/i);

        expect(myEvents).toBeInTheDocument();
    });
});
