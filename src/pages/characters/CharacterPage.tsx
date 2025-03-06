import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { fetchCharacterById } from "../../features/Character/characterSlice";
import { Circles } from "react-loader-spinner";
import EntityPage from "../../components/entityPageComponent/EntityPageComponent";

const CharacterPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.characters.selectedStatus);
  const character = useAppSelector((state) => state.characters.selectedEntity);
  const error = useAppSelector((state) => state.characters.error);

  useEffect(() => {
    id && dispatch(fetchCharacterById(id));
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
          entity={character}
          titleKey="name"
          fields={[
            { label: "Birth Year", key: "birth_year" },
            { label: "Eye Color", key: "eye_color" },
            { label: "Home World", key: "homeworld", isLink: true },
            { label: "Starships", key: "starships", isLink: true },
            { label: "Vehicles", key: "vehicles", isLink: true },
            { label: "Species", key: "species", isLink: true },
          ]}
        />
      )}
    </div>
  );
};

export default CharacterPage;
