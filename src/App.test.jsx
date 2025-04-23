import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";

describe("App component", () => {
  it("renders hello world", () => {
    render(<App />);
    expect(screen.getByRole("paragraph").textContent).toMatch("\"Hello, World!\"");
  });
});
