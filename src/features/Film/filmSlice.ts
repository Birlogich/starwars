import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice } from "../Entity/entitySlice";
import { FilmType } from "../../types";

export const fetchAllFilms = createFetchAllThunk<FilmType>("films", "films");
export const fetchFilmsById = createFetchByIdThunk<FilmType>("films", "films");

const filmsSlice = createEntitySlice<FilmType>(
  "characters",
  fetchAllFilms,
  fetchFilmsById,
  null
);

export const { setPage } = filmsSlice.actions;
export default filmsSlice.reducer;