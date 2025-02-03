import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { FilmType, LocalFilmType } from "../../types/entities";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";

//Не смог решить проблему двойного рендера. Хотя мб это потому что в режиме разработки. 

type Status = 'idle' | 'loading' | 'completed' | 'error';

export const fetchAllFilms = createAsyncThunk(
   '@@films/fetchAllFilms',
   async () => {
      const data = await client<{ results: FilmType[] }>("films"); 
      return data?.results ?? [];
     }
)

export const fetchFilm = createAsyncThunk<LocalFilmType | null, string, { rejectValue: string }>(
  '@@films/fetchFilm',
  async (id: string, { rejectWithValue }) => {
    try {
      const film = await client<FilmType>(`films/${id}`);
      if (!film) {
        return rejectWithValue("Film not found"); 
      }

      const speciesData = await Promise.all(
        film.species.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      const charactersData = await Promise.all(
        film.characters.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      const starshipsData = await Promise.all(
        film.starships.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      const planetsData = await Promise.all(
        film.planets.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      const vehiclesData = await Promise.all(
        film.vehicles.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      return {
        ...film,
        species: speciesData,
        starships: starshipsData,
        vehicles: vehiclesData,
        characters: charactersData,
        planets: planetsData,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch film data");
    }
  }
);

type FilmsSlice = {
   status: 'idle' | 'loading' | 'completed' | 'error';
   list: FilmType[] | undefined,
   selectedFilm: LocalFilmType | null;
   selectedStatus: Status;
   error: string | null
}

const initialState: FilmsSlice = {
   status: "idle",
   list: [],
   selectedFilm: null,
   selectedStatus: "idle",
   error: null
 };

 const filmsSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       .addCase(fetchAllFilms.pending, (state) => {
         state.status = "loading";
       })
       .addCase(fetchAllFilms.rejected, (state) => {
         state.status = "error";
       })
       .addCase(fetchAllFilms.fulfilled, (state, action) => {
         state.status = "completed";
         state.list = action.payload;
       })

       //selectedFilm
       .addCase(fetchFilm.pending, (state) => {
        state.selectedStatus = "loading";
      })
      .addCase(fetchFilm.rejected, (state, action) => {
        state.selectedStatus = 'error';
         state.error = action.payload as string;
      })
      .addCase(fetchFilm.fulfilled, (state, action) => {
        state.selectedStatus = "completed";
        state.selectedFilm = action.payload;
      })
   },
 });
 
 export const filmsSliceReducer = filmsSlice.reducer;
