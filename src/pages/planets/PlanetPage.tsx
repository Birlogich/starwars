import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchPlanet } from "../../features/Plantet/planetsSlice";

const PlanetPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.planets.selectedStatus);
  const planet = useAppSelector((state) => state.planets.selectedPlanet);
  const error = useAppSelector((state) => state.planets.error);

  useEffect(() => {
    id && dispatch(fetchPlanet(id));
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
            <h2>{planet?.name}</h2>
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.block}>
                <h2>Climate:</h2>
                <p>{planet?.climate}</p>
              </div>
              <div className={styles.block}>
                <h2>Diameter:</h2>
                <p>{planet?.diameter}</p>
              </div>
              <div className={styles.block}>
                <h2>Gravity:</h2>
                <p>{planet?.gravity}</p>
              </div>
              <div className={styles.block}>
                <h2>Terrail:</h2>
                <p>{planet?.terrain}</p>
              </div>
              <div className={styles.block}>
                <h2>Population:</h2>
                <p>{planet?.population}</p>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <h2>Films:</h2>
            <div className={styles.blockWrapper}>
              {planet?.films &&
                planet?.films.map((planet, idx) => (
                  <Link to={planet.url} key={idx}>
                    {planet.title}
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles.block}>
            <h2>Residents:</h2>
            <div className={styles.blockWrapper}>
              {planet?.residents.length
                ? planet?.residents.map((planet, idx) => (
                    <Link to={planet.url} key={idx}>
                      {planet.name}
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

export default PlanetPage;
