import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from "./features/Film/filmSlice";
import FilmsPage from "./pages/films/FilmsPage";
import { MemoryRouter } from "react-router-dom";
import { configureStore } from "redux";

// Создаём тестовый Redux store
const renderWithStore = (preloadedState) => {
  const store = configureStore({
    reducer: { films: filmsReducer },
    preloadedState,
  });

  return render(
    <Provider store={store}>
      <MemoryRouter>
        <FilmsPage />
      </MemoryRouter>
    </Provider>
  );
};

describe("FilmsPage", () => {
  test("Show preloader when loading status", () => {
    renderWithStore({
      films: {
        status: "loading",
        list: [],
        count: 6,
        currentPage: 1,
        selectedEntity: null,
        selectedStatus: "idle",
        error: null,
        search: "",
      },
    });

    expect(screen.getByLabelText("circles-loading")).toBeInTheDocument();
  });

  test("Render movies after loading", async () => {
    const mockFilms = [
      { episode_id: 1, title: "A New Hope", release_date: "1977-05-25" },
      {
        episode_id: 2,
        title: "The Empire Strikes Back",
        release_date: "1980-05-21",
      },
    ];

    const store = configureStore((state = mockFilms) => state);
    renderWithStore(store);
    expect(await screen.findByText("A New Hope")).toBeInTheDocument();
  });
});
