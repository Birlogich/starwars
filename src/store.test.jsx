import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import FilmCard from "./components/ui/film/FilmCard";

describe("FilmCard Component", () => {
  const mockFilm = {
    episode_id: 1,
    title: "A New Hope",
    release_date: "1977-05-25",
  };

  it("renders film title and release year", () => {
    render(
      <MemoryRouter>
        <FilmCard {...mockFilm} />
      </MemoryRouter>
    );

    expect(screen.getByText("A New Hope")).toBeInTheDocument();
    expect(screen.getByText("1977")).toBeInTheDocument();
  });

  it("renders a link to the correct film page", () => {
    render(
      <MemoryRouter>
        <FilmCard {...mockFilm} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole("link");
    expect(linkElement).toHaveAttribute("href", "/films/1");
  });
});
