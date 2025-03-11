import EntitiesPage from "../entity/EntitiesPage";
import {
  fetchAllSpecies,
  fetchSearchSpecie,
  setPage,
} from "../../features/Species/speciesSlice";

const PlanetsPage = () => (
  <EntitiesPage
    selector={(state) => state.species}
    fetchAllAction={fetchAllSpecies}
    setPageAction={setPage}
    basePath="species"
    fetchOnSearch={fetchSearchSpecie}
  />
);

export default PlanetsPage;
