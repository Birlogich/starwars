import EntitiesPage from "../entity/EntitiesPage";
import {
  fetchAllPlanets,
  fetchSearchPlanet,
  setPage,
} from "../../features/Planet/planetsSlice";

const PlanetsPage = () => (
  <EntitiesPage
    selector={(state) => state.planets}
    fetchAllAction={fetchAllPlanets}
    setPageAction={setPage}
    basePath="planets"
    fetchOnSearch={fetchSearchPlanet}
  />
);

export default PlanetsPage;
