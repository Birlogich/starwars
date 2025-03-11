import EntitiesPage from "../entity/EntitiesPage";
import {
  fetchAllVehicles,
  fetchSearchVehicle,
  setPage,
} from "../../features/Vehicles/vehiclesSlice";

const VehiclesPage = () => (
  <EntitiesPage
    selector={(state) => state.vehicles}
    fetchAllAction={fetchAllVehicles}
    setPageAction={setPage}
    basePath="vehicles"
    fetchOnSearch={fetchSearchVehicle}
  />
);

export default VehiclesPage;
