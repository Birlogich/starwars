import EntitiesPage from "../entity/EntityPage";
import {
  fetchAllStarships,
  setPage,
} from "../../features/Starship/starshipsSlice";

const StarshipsPage = () => (
  <EntitiesPage
    selector={(state) => state.starships}
    fetchAllAction={fetchAllStarships}
    setPageAction={setPage}
    basePath="starships"
  />
);

export default StarshipsPage;
