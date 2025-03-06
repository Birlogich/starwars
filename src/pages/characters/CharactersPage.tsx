import EntitiesPage from "../entity/EntityPage";
import {
  fetchAllCharacters,
  setPage,
} from "../../features/Character/characterSlice";

const CharactersPage = () => (
  <EntitiesPage
    selector={(state) => state.characters}
    fetchAllAction={fetchAllCharacters}
    setPageAction={setPage}
    basePath="people"
  />
);

export default CharactersPage;
