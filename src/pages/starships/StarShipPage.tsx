import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchStarship } from "../../features/Starship/starshipsSlice";

const StarShipPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.starships.selectedStatus);
  const starship = useAppSelector((state) => state.starships.selectedStarship);
  const error = useAppSelector((state) => state.starships.error);

  useEffect(() => {
    id && dispatch(fetchStarship(id));
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
            <h2>{starship?.name}</h2>
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.block}>
                <h2>Model:</h2>
                <p>{starship?.model}</p>
              </div>
              <div className={styles.block}>
                <h2>Manufacturer:</h2>
                <p>{starship?.manufacturer}</p>
              </div>
              <div className={styles.block}>
                <h2>Passengers:</h2>
                <p>{starship?.passengers}</p>
              </div>
              <div className={styles.block}>
                <h2>Length:</h2>
                <p>{starship?.length}</p>
              </div>
              <div className={styles.block}>
                <h2>Hyperdrive Rating:</h2>
                <p>{starship?.hyperdrive_rating}</p>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <h2>Films:</h2>
            <div className={styles.blockWrapper}>
              {starship?.films &&
                starship?.films.map((starship, idx) => (
                  <Link to={starship.url} key={idx}>
                    {starship.title}
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles.block}>
            <h2>Pilots:</h2>
            <div className={styles.blockWrapper}>
              {starship?.pilots.length
                ? starship?.pilots.map((starship, idx) => (
                    <Link to={starship.url} key={idx}>
                      {starship.name}
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

export default StarShipPage;
