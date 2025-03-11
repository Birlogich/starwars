import EntityPage from "../entity/EntitiesPage";
import {
  fetchAllCharacters,
  fetchSearchCharacter,
  setPage,
} from "../../features/Character/characterSlice";

const CharactersPage = () => {
  return (
    <EntityPage
      selector={(state) => state.characters}
      fetchAllAction={fetchAllCharacters}
      setPageAction={setPage}
      basePath="people"
      fetchOnSearch={fetchSearchCharacter}
    />
  );
};

export default CharactersPage;
