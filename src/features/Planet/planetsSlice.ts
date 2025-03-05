import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice } from "../Entity/entitySlice";
import { PlanetType } from "../../types";


export const fetchAllPlanets = createFetchAllThunk<PlanetType>("planets", "planets");
export const fetchPlanetById = createFetchByIdThunk<PlanetType>("planets", "planets");


const planetsSlice = createEntitySlice<PlanetType>( 
  "planets", 
  fetchAllPlanets,
  fetchPlanetById
);


export const { setPage } = planetsSlice.actions;
export default planetsSlice.reducer;
