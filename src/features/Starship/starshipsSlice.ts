import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { LocalStarshipType, StarshipType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

type Status = 'idle' | 'loading' | 'completed' | 'error';

export const fetchAllStarships = createAsyncThunk<{ count: number; results: StarshipType[] }, 
  string
>(
   '@@films/fetchAllStarships',
    async (page: string) => {
            const data = await client<{ count: number; results: StarshipType[] }>(
              page ? `planets/?page=${page}` : `planets/?page=1`
            );
        
            return {
              count: data?.count ?? 0, 
              results: data?.results ?? [],
            };
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
   count: number,
   currentPage: number,
   selectedStarship: LocalStarshipType | null;
   selectedStatus: Status;
   error: string | null
}

const initialState: PlanetSlice = {
   status: "idle",
   list: [],
   count: 0,
   currentPage: 1,
   selectedStarship: null,
   selectedStatus: "idle",
   error: null
 };

 const starshipSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
   },
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
         state.list = action.payload.results;
         state.count = action.payload.count;
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


export const { setPage } = starshipSlice.actions;
 export const starshipsSliceReducer = starshipSlice.reducer;
