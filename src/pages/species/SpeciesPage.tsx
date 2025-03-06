import EntitiesPage from "../entity/EntityPage";
import { fetchAllSpecies, setPage } from "../../features/Species/speciesSlice";

const PlanetsPage = () => (
  <EntitiesPage
    selector={(state) => state.species}
    fetchAllAction={fetchAllSpecies}
    setPageAction={setPage}
    basePath="species"
  />
);

export default PlanetsPage;
