import { fetchPlanetById } from "../../features/Planet/planetsSlice";
import { PlanetType } from "../../types";
import EntityPage from "../entity/EntityPage";

const PlanetPage = () => {
  return (
    <EntityPage<PlanetType>
      entityName="species"
      fetchByIdAction={fetchPlanetById}
      titleKey="name"
      fields={[
        { label: "Climate", key: "climate" },
        { label: "Diameter", key: "diameter" },
        { label: "Gravity", key: "gravity" },
        { label: "Terrain", key: "terrain" },
        { label: "Population", key: "population" },
        { label: "Films", key: "films", isLink: true },
        { label: "Residents", key: "residents", isLink: true },
      ]}
    />
  );
};

export default PlanetPage;
