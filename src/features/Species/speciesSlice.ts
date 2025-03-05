import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice } from "../Entity/entitySlice";
import { SpecieType } from "../../types";


export const fetchAllSpecies = createFetchAllThunk<SpecieType>("species", "species");
export const fetchSpecieById = createFetchByIdThunk<SpecieType>("species", "species");


const speciesSlice = createEntitySlice<SpecieType>( 
  "planets", 
  fetchAllSpecies,
  fetchSpecieById
);


export const { setPage } = speciesSlice.actions;
export default speciesSlice.reducer;
