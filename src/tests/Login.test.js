import React from "react";
import { render, screen } from "@testing-library/react";
import Login from "../components/Login";

describe("Login", () => {
    xit("renders correctly", () => {
        render(<Login />);

        const login = screen.getByText(/Login/i);

        expect(login).toBeInTheDocument();
    });
});
