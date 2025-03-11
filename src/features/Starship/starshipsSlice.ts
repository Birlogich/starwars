import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice, createSearchFetchThunk } from "../Entity/entitySlice";
import { StarshipType } from "../../types";


export const fetchAllStarships = createFetchAllThunk<StarshipType>("starships", "starships");
export const fetchStarshipById = createFetchByIdThunk<StarshipType>("starships", "starships");
export const fetchSearchStarship = createSearchFetchThunk<StarshipType>("people", "people");

const starshipsSlice = createEntitySlice<StarshipType>( 
  "planets", 
  fetchAllStarships,
  fetchStarshipById,
  fetchSearchStarship
);


export const { setPage } = starshipsSlice.actions;
export default starshipsSlice.reducer;
