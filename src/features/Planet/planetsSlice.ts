import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice, createSearchFetchThunk } from "../Entity/entitySlice";
import { PlanetType } from "../../types";


export const fetchAllPlanets = createFetchAllThunk<PlanetType>("planets", "planets");
export const fetchPlanetById = createFetchByIdThunk<PlanetType>("planets", "planets");
export const fetchSearchPlanet = createSearchFetchThunk<PlanetType>("planets", "planets");

const planetsSlice = createEntitySlice<PlanetType>( 
  "planets", 
  fetchAllPlanets,
  fetchPlanetById,
  fetchSearchPlanet
);


export const { setPage } = planetsSlice.actions;
export default planetsSlice.reducer;
