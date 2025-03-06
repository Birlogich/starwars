import EntitiesPage from "../entity/EntityPage";
import { fetchAllPlanets, setPage } from "../../features/Planet/planetsSlice";

const PlanetsPage = () => (
  <EntitiesPage
    selector={(state) => state.planets}
    fetchAllAction={fetchAllPlanets}
    setPageAction={setPage}
    basePath="planets"
  />
);

export default PlanetsPage;
