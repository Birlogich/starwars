import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchVehicleById } from "../../features/Vehicles/vehiclesSlice";
import EntityPage from "../../components/entityPage/EntityPage";

const VehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.vehicles.selectedStatus);
  const vehicle = useAppSelector((state) => state.vehicles.selectedEntity);
  const error = useAppSelector((state) => state.vehicles.error);

  useEffect(() => {
    id && dispatch(fetchVehicleById(id));
  }, [id]);

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
      {status === "error" && <h2>{error}</h2>}
      {status === "completed" && (
        <EntityPage
          entity={vehicle}
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
      )}
    </div>
  );
};

export default VehiclePage;
