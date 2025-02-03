import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchVehicle } from "../../features/Vehicles/vehiclesSlice";

const VehiclePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.vehicles.selectedStatus);
  const vehicle = useAppSelector((state) => state.vehicles.selectedVehicle);
  const error = useAppSelector((state) => state.vehicles.error);

  useEffect(() => {
    id && dispatch(fetchVehicle(id));
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
        <div className={styles.mainBlock}>
          <div className={styles.title}>
            <h2>{vehicle?.name}</h2>
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.block}>
                <h2>Manufacturer:</h2>
                <p>{vehicle?.manufacturer}</p>
              </div>
              <div className={styles.block}>
                <h2>Crew:</h2>
                <p>{vehicle?.crew} people</p>
              </div>
              <div className={styles.block}>
                <h2>Passengers:</h2>
                <p>{vehicle?.passengers} people</p>
              </div>
              <div className={styles.block}>
                <h2>Length:</h2>
                <p>{vehicle?.length}</p>
              </div>
              <div className={styles.block}>
                <h2>Max atmosphering speed:</h2>
                <p>{vehicle?.max_atmosphering_speed}</p>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <h2>Films:</h2>
            <div className={styles.blockWrapper}>
              {vehicle?.films &&
                vehicle?.films.map((vehicle, idx) => (
                  <Link to={vehicle.url} key={idx}>
                    {vehicle.title}
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles.block}>
            <h2>Pilots:</h2>
            <div className={styles.blockWrapper}>
              {vehicle?.pilots.length
                ? vehicle?.pilots.map((vehicle, idx) => (
                    <Link to={vehicle.url} key={idx}>
                      {vehicle.name}
                    </Link>
                  ))
                : "N/A"}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VehiclePage;
