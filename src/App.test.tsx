import { expect, describe, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
import App from "./App";

describe("App", () => {
  it("The app renders", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
  });

  it("Main page has the mail logo", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByText(/discovery/i)).toBeInTheDocument();
  });

  it("Main page has all links with correct addresses", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const expectedLinks = [
      { text: /films/i, href: "/films" },
      { text: /characters/i, href: "/people" },
      { text: /planets/i, href: "/planets" },
      { text: /species/i, href: "/species" },
      { text: /starships/i, href: "/starships" },
      { text: /vehicles/i, href: "/vehicles" },
    ];
    for (const { text, href } of expectedLinks) {
      const link = await screen.findByRole("link", { name: text });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", href);
    }
  });
});
