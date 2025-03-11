import { fetchStarshipById } from "../../features/Starship/starshipsSlice";
import EntityPage from "../entity/EntityPage";
import { StarshipType } from "../../types";

const StarShipPage = () => {
  return (
    <EntityPage<StarshipType>
      entityName={"starships"}
      fetchByIdAction={fetchStarshipById}
      titleKey="name"
      fields={[
        { label: "Model", key: "model" },
        { label: "Manufacturer", key: "manufacturer" },
        { label: "Passengers", key: "passengers" },
        { label: "Length", key: "length" },
        { label: "Hyperdrive Rating", key: "hyperdrive_rating" },
        { label: "Films", key: "films", isLink: true },
        { label: "Pilots", key: "pilots", isLink: true },
      ]}
    />
  );
};

export default StarShipPage;
