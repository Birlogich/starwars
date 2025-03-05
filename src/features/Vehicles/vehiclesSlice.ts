import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice } from "../Entity/entitySlice";
import { SpecieType, VehicleType } from "../../types";


export const fetchAllVehicles = createFetchAllThunk<VehicleType>("vehicles", "vehicles");
export const fetchVehicleById = createFetchByIdThunk<VehicleType>("vehicles", "vehicles");


const vehiclesSlice = createEntitySlice<VehicleType>( 
  "planets", 
  fetchAllVehicles,
  fetchVehicleById
);


export const { setPage } = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
