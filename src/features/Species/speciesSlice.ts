import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { LocalSpecieType, SpecieType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = 'idle' | 'loading' | 'completed' | 'error';

export const fetchAllSpecies = createAsyncThunk<{ count: number; results: SpecieType[] }, 
  string
>(
   '@@films/fetchAllSpecies',
  async (page: string) => {
         const data = await client<{ count: number; results: SpecieType[] }>(
           page ? `planets/?page=${page}` : `planets/?page=1`
         );
     
         return {
           count: data?.count ?? 0, 
           results: data?.results ?? [],
         };
       }
)

export const fetchSpecie = createAsyncThunk<LocalSpecieType | null, string, { rejectValue: string }>(
  '@@films/fetchSpecie',
  async (id: string, { rejectWithValue }) => {
    try {
      const specie = await client<SpecieType>(`species/${id}`);
      if (!specie) {
        return rejectWithValue("Film not found"); 
      }

      const filmsData = await Promise.all(
        specie.films.map(async (url) => {
          const { title, url: shortUrl } = await fetchResourceName(url);
          return { title, url: shortUrl };
        })
      );

      const residentsData = await Promise.all(
        specie.people.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );


      return {
        ...specie,
        films: filmsData,
        people: residentsData,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch planet data");
    }
  }
);


type PlanetSlice = {
   status: Status;
   list: SpecieType[] | undefined;
   count: number,
   currentPage: number,
   selectedSpecie: LocalSpecieType | null;
   selectedStatus: Status;
   error: string | null
}

const initialState: PlanetSlice = {
   status: "idle",
   list: [],
   count: 0,
   currentPage: 1,
   selectedSpecie: null,
   selectedStatus: "idle",
   error: null
 };

 const specieSlice = createSlice({
   name: "@films",
   initialState,
   reducers: { 
    setPage: (state, action) => {
    state.currentPage = action.payload;
  },
},
   extraReducers: (builder) => {
     builder
       .addCase(fetchAllSpecies.pending, (state) => {
         state.status = "loading";
       })
       .addCase(fetchAllSpecies.rejected, (state) => {
         state.status = "error";
       })
       .addCase(fetchAllSpecies.fulfilled, (state, action) => {
         state.status = "completed";
         state.list = action.payload.results;
         state.count = action.payload.count;
       })

       // One Character 

       .addCase(fetchSpecie.pending, (state) => {
         state.selectedStatus = "loading";
       })
       .addCase(fetchSpecie.rejected, (state, action) => {
        state.selectedStatus = 'error';
        state.error = action.payload as string;
       })
       .addCase(fetchSpecie.fulfilled, (state, action) => {
         state.selectedStatus = "completed";
         state.selectedSpecie = action.payload;
       });
   },
 });

 export const { setPage } = specieSlice.actions;
 export const speciesSliceReducer = specieSlice.reducer;
