import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { client } from "../../api/client";
import { CharacterType, LocalCharacterType } from "../../types/index";
import { fetchResourceName } from "../../lib/helpers/fetchResourseName";


type Status = 'idle' | 'loading' | 'completed' | 'error';


export const fetchAllCharacters = createAsyncThunk(
   '@@films/fetchAllCharacters',
   async () => {
      const data = await client<{ results: CharacterType[] }>("people"); 
      return data?.results ?? [];
     }
)

export const fetchCharacter = createAsyncThunk<LocalCharacterType | null, string, { rejectValue: string }>(
  '@@films/fetchCharacter',
  async (id: string, { rejectWithValue }) => {
    try {
      const character = await client<CharacterType>(`people/${id}`);
      if (!character) {
        return rejectWithValue("Character not found");
      }

      const speciesData = await Promise.all(
        character.species.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      const filmsData = await Promise.all(
        character.films.map(async (url) => {
          const { title, url: shortUrl } = await fetchResourceName(url);
          return { title, url: shortUrl };
        })
      );

      const starshipsData = await Promise.all(
        character.starships.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      const vehiclesData = await Promise.all(
        character.vehicles.map(async (url) => {
          const { name, url: shortUrl } = await fetchResourceName(url);
          return { name, url: shortUrl };
        })
      );

      const homeworldData = character.homeworld
        ? await fetchResourceName(character.homeworld).then(({ name, url }) => ({
            name,
            url: `/planets/${url}`,
          }))
        : { name: "Unknown", url: "#" };


      return {
        ...character,
        species: speciesData,
        starships: starshipsData,
        vehicles: vehiclesData,
        films: filmsData,
        homeworld: homeworldData,
      };
    } catch (error) {
      return rejectWithValue("Failed to fetch character data");
    }
  }
);


type characterSlice = {
   status: Status;
   list: CharacterType[] | undefined;
   selectedCharacter: LocalCharacterType | null;
   selectedStatus: Status;
   error: string | null
}

const initialState: characterSlice = {
   status: "idle",
   list: [],
   selectedCharacter: null,
   selectedStatus: "idle",
   error: null
 };

 const characterSlice = createSlice({
   name: "@films",
   initialState,
   reducers: {},
   extraReducers: (builder) => {
     builder
       .addCase(fetchAllCharacters.pending, (state) => {
         state.status = "loading";
       })
       .addCase(fetchAllCharacters.rejected, (state) => {
         state.status = "error";
       })
       .addCase(fetchAllCharacters.fulfilled, (state, action) => {
         state.status = "completed";
         state.list = action.payload;
       })

       // One Charecter 

       .addCase(fetchCharacter.pending, (state) => {
         state.selectedStatus = "loading";
       })
       .addCase(fetchCharacter.rejected, (state, action) => {
        state.selectedStatus = 'error';
         state.error = action.payload as string;
       })
       .addCase(fetchCharacter.fulfilled, (state, action) => {
         state.selectedStatus = "completed";
         state.selectedCharacter = action.payload;
       });
   },
 });
 
 export const charactersSliceReducer = characterSlice.reducer;
