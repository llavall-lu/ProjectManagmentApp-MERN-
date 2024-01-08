// Mocking axios
jest.mock("axios", () => ({
  post: jest.fn(),
}));

// Mocking toast
jest.mock("react-hot-toast", () => ({
  toast: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

// Mocking the Global State Context
const mockGlobalState = {
  theme: {
    colorBg2: "#fff",
    borderColor2: "#000",
    purple: "#800080",
    colorGrey5: "#d3d3d3",
    colorGrey2: "#808080",
  },
  allTasks: jest.fn(),
  closeModal: jest.fn(),
};

jest.mock("../app/context/GlobalContextProvider.js", () => ({
  useGlobalState: () => mockGlobalState,
}));

import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import React from "react";
import CreateTask from "@/app/Components/modal/CreateTask";
import axios from "axios";
import { toast } from "react-hot-toast";

describe("CreateTask Component Validation Tests", () => {
  it("displays error if title is less than 3 characters", () => {
    render(<CreateTask />); // Renders the CreateTask component
    const titleInput = screen.getByLabelText("Title"); // Gets the title input
    fireEvent.change(titleInput, { target: { value: "ab" } }); // Sets the title to "ab"
    const submitButton = screen.getByRole("button", { name: /Create Task/i }); // Gets the submit button
    fireEvent.click(submitButton); // Clicks the submit button
    expect(
      screen.getByText("Title must be at least 3 characters long") // Checks if the error message is displayed
    ).toBeInTheDocument();
  });

  it("displays error if description is empty", () => {
    render(<CreateTask />); // Renders the CreateTask component
    const titleInput = screen.getByLabelText("Title"); // Gets the title input
    fireEvent.change(titleInput, { target: { value: "Valid Title" } }); // Provides a valid title
    const descriptionInput = screen.getByLabelText("Description"); // Gets the description input
    fireEvent.change(descriptionInput, { target: { value: "" } }); // Sets the description to empty
    const submitButton = screen.getByRole("button", { name: /Create Task/i }); // Gets the submit button
    fireEvent.click(submitButton); // Clicks the submit button
    expect(screen.getByText("Description is required")).toBeInTheDocument(); // Checks if the error message is displayed
  });

  it("displays error if title exceeds 32 characters", () => {
    render(<CreateTask />); // Renders the CreateTask component
    const titleInput = screen.getByLabelText("Title"); // Gets the title input
    fireEvent.change(titleInput, { target: { value: "a".repeat(33) } }); // Sets the title to 33 characters

    const descriptionInput = screen.getByLabelText("Description"); // Gets the description input
    fireEvent.change(descriptionInput, {
      target: { value: "Valid Description" }, // Provides a valid description
    });

    const submitButton = screen.getByRole("button", { name: /Create Task/i }); // Gets the submit button
    fireEvent.click(submitButton); // Clicks the submit button
    expect(
      screen.getByText("Title must not exceed 32 characters") // Checks if the error message is displayed
    ).toBeInTheDocument();
  });

  it("displays error if description exceeds 200 characters", () => {
    render(<CreateTask />); // Renders the CreateTask component
    const titleInput = screen.getByLabelText("Title"); // Gets the title input

    fireEvent.change(titleInput, { target: { value: "Valid Title" } }); // Provides a valid title
    const descriptionInput = screen.getByLabelText("Description"); // Gets the description input

    fireEvent.change(descriptionInput, { target: { value: "a".repeat(201) } }); // Sets the description to 201 characters
    const submitButton = screen.getByRole("button", { name: /Create Task/i }); // Gets the submit button
    fireEvent.click(submitButton); // Clicks the submit button
    expect(
      screen.getByText("Description must not exceed 200 characters") // Checks if the error message is displayed
    ).toBeInTheDocument();
  });

  it("displays error if title exceeds 32 characters", () => {
    render(<CreateTask />); // Renders the CreateTask component
    const titleInput = screen.getByLabelText("Title"); // Gets the title input
    fireEvent.change(titleInput, { target: { value: "Valid Title" } }); // Provides a valid title

    const descriptionInput = screen.getByLabelText("Description"); // Gets the description input
    fireEvent.change(descriptionInput, {
      target: { value: "Valid Description" }, // Provides a valid description
    });

    const dateInput = screen.getByLabelText("Date"); // Gets the date input
    fireEvent.change(dateInput, { target: { value: "2020-01-07" } }); // Sets the date to 2020-01-07

    const submitButton = screen.getByRole("button", { name: /Create Task/i }); // Gets the submit button
    fireEvent.click(submitButton); // Clicks the submit button
    expect(
      screen.getByText("Task must be at least 1 minute in the future") // Checks if the error message is displayed
    ).toBeInTheDocument();
  });
});
