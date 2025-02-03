import { useEffect } from "react";
import { VehicleType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "./styles/vehiclesPage.module.scss";
import VehicleCard from "../../components/ui/vehicle/VehicleCard";
import { fetchAllVehicles } from "../../features/Vehicles/vehiclesSlice";

const VehiclesPage = () => {
  const dispatch = useAppDispatch();

  const vehicles = useAppSelector((state) => state.vehicles.list);
  const status = useAppSelector((state) => state.vehicles.status);

  useEffect(() => {
    dispatch(fetchAllVehicles());
  }, []);

  //Позже добавлю пагинацию

  return (
    <div className={styles.wrapper}>
      {status === "loading" && (
        <Circles
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="circles-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      )}
      {status === "completed" &&
        vehicles?.map((vehicle: VehicleType) => (
          <VehicleCard {...vehicle} key={vehicle.name} />
        ))}
    </div>
  );
};

export default VehiclesPage;
