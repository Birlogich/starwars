import { fetchVehicleById } from "../../features/Vehicles/vehiclesSlice";
import { VehicleType } from "../../types";
import EntityPage from "../entity/EntityPage";

const VehiclePage = () => {
  return (
    <EntityPage<VehicleType>
      entityName={"vehicles"}
      fetchByIdAction={fetchVehicleById}
      titleKey="name"
      fields={[
        { label: "Model", key: "model" },
        { label: "Manufacturer", key: "manufacturer" },
        { label: "Crew", key: "crew" },
        { label: "Passengers", key: "passengers" },
        { label: "Length Rating", key: "length" },
        { label: "Max atmosphering speed", key: "max_atmosphering_speed" },
        { label: "Films", key: "films", isLink: true },
        { label: "Pilots", key: "pilots", isLink: true },
      ]}
    />
  );
};

export default VehiclePage;
