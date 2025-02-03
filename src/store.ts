import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { filmsSliceReducer } from "./features/Film/filmSlice";
import { charactersSliceReducer } from "./features/Character/characterSlice";
import { planetsSliceReducer } from "./features/Plantet/planetsSlice";
import { speciesSliceReducer } from "./features/Species/speciesSlice";
import { starshipsSliceReducer } from "./features/Starship/starshipsSlice";
import { vehiclesSliceReducer } from "./features/Vehicles/vehiclesSlice";

const rootReducer = combineReducers({
   films: filmsSliceReducer,
   characters: charactersSliceReducer,
   planets: planetsSliceReducer,
   species: speciesSliceReducer,
   starships: starshipsSliceReducer,
   vehicles: vehiclesSliceReducer
})

export const store = configureStore({
   reducer: rootReducer,
   devTools: true
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
