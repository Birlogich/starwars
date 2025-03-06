import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { fetchFilmsById } from "../../features/Film/filmSlice";
import { Circles } from "react-loader-spinner";
import EntityPage from "../../components/entityPageComponent/EntityPageComponent";

const FilmPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const film = useAppSelector((state) => state.films.selectedEntity);
  const status = useAppSelector((state) => state.films.selectedStatus);
  const error = useAppSelector((state) => state.films.error);

  useEffect(() => {
    id && dispatch(fetchFilmsById(id));
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
        <EntityPage
          entity={film}
          titleKey="title"
          fields={[
            { label: "Opening Crawl", key: "opening_crawl" },
            { label: "Characters", key: "characters", isLink: true },
            { label: "Planets", key: "planets", isLink: true },
            { label: "Vehicles", key: "vehicles", isLink: true },
            { label: "Species", key: "species", isLink: true },
            { label: "Starships", key: "starships", isLink: true },
            { label: "Director", key: "director" },
            { label: "Producer", key: "producer" },
            { label: "Year", key: "release_date" },
          ]}
        />
      )}
    </div>
  );
};

export default FilmPage;
