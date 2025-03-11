import { configureStore, combineReducers } from "@reduxjs/toolkit";
import filmsReducer from "./features/Film/filmSlice";
import charactersReducer from "./features/Character/characterSlice";
import planetsReducer from "./features/Planet/planetsSlice";
import speciesReducer from "./features/Species/speciesSlice";
import starshipsReducer from "./features/Starship/starshipsSlice";
import vehiclesReducer  from "./features/Vehicles/vehiclesSlice";

const rootReducer = combineReducers({
   films: filmsReducer,
   characters: charactersReducer,
   planets: planetsReducer,
   species: speciesReducer,
   starships: starshipsReducer,
   vehicles: vehiclesReducer
})

export const store = configureStore({
   reducer: rootReducer,
   devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type RootStateKeys = keyof RootState;