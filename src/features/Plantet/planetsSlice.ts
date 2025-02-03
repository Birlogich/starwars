import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { LocalPlanetType, PlanetType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = 'idle' | 'loading' | 'completed' | 'error' | string;

export const fetchAllPlanets = createAsyncThunk(
   '@@films/fetchAllPlanets',
   async () => {
      const data = await client<{ results: PlanetType[] }>("planets"); 
      return data?.results ?? [];
     }
)


export const fetchPlanet = createAsyncThunk<LocalPlanetType | null, string, { rejectValue: string }>(
  '@@films/fetchPlanet',
  async (id: string, { rejectWithValue }) => {
    try {
      const planet = await client<PlanetType>(`planets/${id}`);
      if (!planet) {
        return rejectWithValue("Film not found"); 
      }

      const filmsData = await Promise.all(
        planet.films.map(async (url) => {
          const { title, url: shortUrl } = await fetchResourceName(url);
          return { title, url: shortUrl };
        })
      );

      const residentsData = await Promise.all(
        planet.residents.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );


      return {
        ...planet,
        films: filmsData,
        residents: residentsData,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch planet data");
    }
  }
);

type PlanetSlice = {
   status: Status;
   list: PlanetType[] | undefined;
   selectedPlanet: LocalPlanetType | null;
   selectedStatus: Status;
   error: string | null,
}

const initialState: PlanetSlice = {
   status: "idle",
   list: [],
   selectedPlanet: null,
   selectedStatus: "idle",
   error: null
 };

 const planetSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       .addCase(fetchAllPlanets.pending, (state) => {
         state.status = "loading";
       })
       .addCase(fetchAllPlanets.rejected, (state) => {
         state.status = "error";
       })
       .addCase(fetchAllPlanets.fulfilled, (state, action) => {
         state.status = "completed";
         state.list = action.payload;
       })

       // One Charecter 

       .addCase(fetchPlanet.pending, (state) => {
         state.selectedStatus = "loading";
       })
       .addCase(fetchPlanet.rejected, (state, action) => {
        state.selectedStatus = 'error';
        state.error = action.payload as string;
       })
       .addCase(fetchPlanet.fulfilled, (state, action) => {
         state.selectedStatus = "completed";
         state.selectedPlanet = action.payload;
       });
   },
 });
 
 export const planetsSliceReducer = planetSlice.reducer;
