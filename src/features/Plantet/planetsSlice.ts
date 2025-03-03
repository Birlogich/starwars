import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { LocalPlanetType, PlanetType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = 'idle' | 'loading' | 'completed' | 'error' | string;

export const fetchAllPlanets = createAsyncThunk<{ count: number; results: PlanetType[] }, 
  string
>(
   '@@films/fetchAllPlanets',
   async (page: string) => {
       const data = await client<{ count: number; results: PlanetType[] }>(
         page ? `planets/?page=${page}` : `planets/?page=1`
       );
   
       return {
         count: data?.count ?? 0, 
         results: data?.results ?? [],
       };
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
   count: number,
   currentPage: number,
   selectedPlanet: LocalPlanetType | null;
   selectedStatus: Status;
   error: string | null,
}

const initialState: PlanetSlice = {
   status: "idle",
   list: [],
   count: 0,
   currentPage: 1,
   selectedPlanet: null,
   selectedStatus: "idle",
   error: null
 };

 const planetSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
   },
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
         state.list = action.payload.results;
         state.count = action.payload.count;
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
 
  export const { setPage } = planetSlice.actions;
 export const planetsSliceReducer = planetSlice.reducer;
