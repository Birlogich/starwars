import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice } from "../Entity/entitySlice";
import { StarshipType } from "../../types";


export const fetchAllStarships = createFetchAllThunk<StarshipType>("starships", "starships");
export const fetchStarshipById = createFetchByIdThunk<StarshipType>("starships", "starships");


const starshipsSlice = createEntitySlice<StarshipType>( 
  "planets", 
  fetchAllStarships,
  fetchStarshipById
);


export const { setPage } = starshipsSlice.actions;
export default starshipsSlice.reducer;
