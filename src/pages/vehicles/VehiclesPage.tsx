import EntitiesPage from "../entity/EntityPage";
import {
  fetchAllVehicles,
  setPage,
} from "../../features/Vehicles/vehiclesSlice";

const VehiclesPage = () => (
  <EntitiesPage
    selector={(state) => state.vehicles}
    fetchAllAction={fetchAllVehicles}
    setPageAction={setPage}
    basePath="vehicles"
  />
);

export default VehiclesPage;
