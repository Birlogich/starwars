import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { LocalStarshipType, StarshipType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = 'idle' | 'loading' | 'completed' | 'error';

export const fetchAllStarships = createAsyncThunk(
   '@@films/fetchAllStarships',
   async () => {
      const data = await client<{ results: StarshipType[] }>("starships"); 
      return data?.results ?? [];
     }
)

export const fetchStarship = createAsyncThunk<LocalStarshipType | null, string, { rejectValue: string }>(
  '@@films/fetchStarship',
  async (id: string, { rejectWithValue }) => {
    try {
      const starship = await client<StarshipType>(`starships/${id}`);
      if (!starship) {
        return rejectWithValue("Film not found"); 
      }

      const filmsData = await Promise.all(
        starship.films.map(async (url) => {
          const { title, url: shortUrl } = await fetchResourceName(url);
          return { title, url: shortUrl };
        })
      );

      const pilotsData = await Promise.all(
        starship.pilots.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );


      return {
        ...starship,
        films: filmsData,
        pilots: pilotsData,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch planet data");
    }
  }
);

type PlanetSlice = {
   status: Status;
   list: StarshipType[] | undefined;
   selectedStarship: LocalStarshipType | null;
   selectedStatus: Status;
   error: string | null
}

const initialState: PlanetSlice = {
   status: "idle",
   list: [],
   selectedStarship: null,
   selectedStatus: "idle",
   error: null
 };

 const starshipSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       .addCase(fetchAllStarships.pending, (state) => {
         state.status = "loading";
       })
       .addCase(fetchAllStarships.rejected, (state) => {
         state.status = "error";
       })
       .addCase(fetchAllStarships.fulfilled, (state, action) => {
         state.status = "completed";
         state.list = action.payload;
       })

       // One Charecter 

       .addCase(fetchStarship.pending, (state) => {
         state.selectedStatus = "loading";
       })
       .addCase(fetchStarship.rejected, (state, action) => {
         state.selectedStatus = "error";
         state.error = action.payload as string;
       })
       .addCase(fetchStarship.fulfilled, (state, action) => {
         state.selectedStatus = "completed";
         state.selectedStarship = action.payload;
       });
   },
 });
 
 export const starshipsSliceReducer = starshipSlice.reducer;
