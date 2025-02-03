import { Link, useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { fetchCharacter } from "../../features/Character/characterSlice";
import { Circles } from "react-loader-spinner";

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.characters.selectedStatus);
  const character = useAppSelector(
    (state) => state.characters.selectedCharacter
  );
  const error = useAppSelector((state) => state.characters.error);

  useEffect(() => {
    id && dispatch(fetchCharacter(id));
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
            <h2>{character?.name}</h2>
          </div>
          <div className={styles.info}>
            <div>
              <div className={styles.block}>
                <h2>Birth Year:</h2>
                <p>{character?.birth_year}</p>
              </div>
              <div className={styles.block}>
                <h2>Eye Color:</h2>
                <p>{character?.eye_color}</p>
              </div>
              <div className={styles.block}>
                <h2>Home World:</h2>
                <Link to={character?.homeworld.url || "/404"}>
                  {character?.homeworld.name}
                </Link>
              </div>
            </div>
          </div>
          <div className={styles.block}>
            <h2>Starships:</h2>
            <div className={styles.blockWrapper}>
              {character?.starships.length ? (
                character?.starships.map((starship, idx) => (
                  <Link to={starship.url} key={idx}>
                    {starship.name}
                  </Link>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
          <div className={styles.block}>
            <h2>Species:</h2>
            <div className={styles.blockWrapper}>
              {character?.vehicles.length ? (
                character.vehicles.map((vehicle, idx) => (
                  <Link to={vehicle.url} key={idx}>
                    {vehicle.name}
                  </Link>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
          <div className={styles.block}>
            <h2>Vehicles:</h2>
            <div className={styles.blockWrapper}>
              {character?.species.length ? (
                character.species.map((specie, idx) => (
                  <Link to={specie.url} key={idx}>
                    {specie.name}
                  </Link>
                ))
              ) : (
                <p>N/A</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CharacterPage;
