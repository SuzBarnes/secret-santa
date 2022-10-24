import React from "react";
import { render, screen } from "@testing-library/react";
import CreateEvent from "../components/CreateEvent";

describe("CreateEvent", () => {
    xit("renders correctly", () => {
        render(<CreateEvent />);

        const createEvent = screen.getByText(/Create Event/i);

        expect(createEvent).toBeInTheDocument();
    });
});
