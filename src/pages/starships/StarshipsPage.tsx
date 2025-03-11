import EntitiesPage from "../entity/EntitiesPage";
import {
  fetchAllStarships,
  fetchSearchStarship,
  setPage,
} from "../../features/Starship/starshipsSlice";

const StarshipsPage = () => (
  <EntitiesPage
    selector={(state) => state.starships}
    fetchAllAction={fetchAllStarships}
    setPageAction={setPage}
    basePath="starships"
    fetchOnSearch={fetchSearchStarship}
  />
);

export default StarshipsPage;
