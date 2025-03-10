import { createFetchAllThunk, createFetchByIdThunk, createEntitySlice, createSearchFetchThunk } from "../Entity/entitySlice";
import { CharacterType } from "../../types";

export const fetchAllCharacters = createFetchAllThunk<CharacterType>("people", "people");
export const fetchCharacterById = createFetchByIdThunk<CharacterType>("people", "people");
export const fetchSearchCharacter = createSearchFetchThunk<CharacterType>("people", "people");

const charactersSlice = createEntitySlice<CharacterType>(
  "characters",
  fetchAllCharacters,
  fetchCharacterById,
  fetchSearchCharacter
);

export const { setPage } = charactersSlice.actions;
export default charactersSlice.reducer;