import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { fetchFilm } from "../../features/Film/filmSlice";
import { Circles } from "react-loader-spinner";

const FilmPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.films.selectedFilm);
  const status = useAppSelector((state) => state.films.selectedStatus);
  const error = useAppSelector((state) => state.films.error);

  useEffect(() => {
    id && dispatch(fetchFilm(id));
  }, []);

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
            <h2>{film?.title}</h2>
            <p>{film?.opening_crawl}</p>
          </div>
          <div className={styles.info}>
            <div className={styles.block}>
              <h2>Characters:</h2>
              <div className={styles.blockWrapper}>
                {film?.characters &&
                  film?.characters.map((film, idx) => (
                    <Link to={film.url} key={idx}>
                      {film.name}
                    </Link>
                  ))}
              </div>
            </div>
            <div className={styles.block}>
              <h2>Species:</h2>
              <div className={styles.blockWrapper}>
                {film?.species &&
                  film?.species.map((film, idx) => (
                    <Link to={film.url} key={idx}>
                      {film.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <div>
              <div className={styles.block}>
                <h2>Director:</h2>
                <p>{film?.director}</p>
              </div>
              <div className={styles.block}>
                <h2>Producer:</h2>
                <p>{film?.producer}</p>
              </div>
              <div className={styles.block}>
                <h2>Year:</h2>
                {film?.release_date && (
                  <p>{new Date(film?.release_date).getFullYear()}</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <h2>Planets:</h2>
            <div className={styles.blockWrapper}>
              {film?.planets &&
                film?.planets.map((film, idx) => (
                  <Link to={film.url} key={idx}>
                    {film.name}
                  </Link>
                ))}
            </div>
          </div>
          <div className={styles.block}>
            <h2>Starships:</h2>
            <div className={styles.blockWrapper}>
              {film?.starships.length
                ? film?.starships.map((film, idx) => (
                    <Link to={film.url} key={idx}>
                      {film.name}
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

export default FilmPage;
