import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchSpecie } from "../../features/Species/speciesSlice";

const SpeciePage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.species.selectedStatus);
  const specie = useAppSelector((state) => state.species.selectedSpecie);
  const error = useAppSelector((state) => state.species.error);

  useEffect(() => {
    id && dispatch(fetchSpecie(id));
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
            <h2>{specie?.name}</h2>
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.block}>
                <h2>Average Height:</h2>
                <p>{specie?.average_height}</p>
              </div>
              <div className={styles.block}>
                <h2>Average Life Span:</h2>
                <p>{specie?.average_lifespan}</p>
              </div>
              <div className={styles.block}>
                <h2>Classification:</h2>
                <p>{specie?.classification}</p>
              </div>
              <div className={styles.block}>
                <h2>Language:</h2>
                <p>{specie?.language}</p>
              </div>
              <div className={styles.block}>
                <h2>Skin Colors:</h2>
                <p>{specie?.skin_colors}</p>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <h2>Films:</h2>
            <div className={styles.blockWrapper}>
              {specie?.films &&
                specie?.films.map((specie, idx) => (
                  <Link to={specie.url} key={idx}>
                    {specie.title}
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles.block}>
            <h2>People:</h2>
            <div className={styles.blockWrapper}>
              {specie?.people &&
                specie?.people.map((specie, idx) => (
                  <Link to={specie.url} key={idx}>
                    {specie.name}
                  </Link>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SpeciePage;
