import { useEffect } from "react";
import { VehicleType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "../commonStyles/pageWrapper.module.scss";
import {
  fetchAllVehicles,
  setPage,
} from "../../features/Vehicles/vehiclesSlice";
import Pagination from "../../components/ui/pagination/Pagination";
import EntityCard from "../../components/ui/entityCard/EntityCard";

const VehiclesPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.vehicles.currentPage);
  const vehicles = useAppSelector((state) => state.vehicles.list);
  const status = useAppSelector((state) => state.vehicles.status);
  const totalPages = useAppSelector((state) =>
    Math.ceil(state.vehicles.count / 10)
  );

  useEffect(() => {
    dispatch(fetchAllVehicles(String(currentPage)));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className={styles.pageWrapper}>
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
      {status === "completed" && (
        <>
          {vehicles?.map((vehicle: VehicleType) => (
            <EntityCard
              entity={vehicle}
              basePath="planets"
              key={vehicle.name}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default VehiclesPage;
