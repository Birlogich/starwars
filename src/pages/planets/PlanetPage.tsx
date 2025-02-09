import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchPlanet } from "../../features/Plantet/planetsSlice";
import EntityPage from "../../components/entityPage/EntityPage";

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
        <EntityPage
          entity={planet}
          titleKey="name"
          fields={[
            { label: "Climate", key: "climate" },
            { label: "Diameter", key: "diameter" },
            { label: "Gravity", key: "gravity" },
            { label: "Terrain", key: "terrain" },
            { label: "Population", key: "population" },
            { label: "Films", key: "films", isLink: true },
            { label: "Residents", key: "residents", isLink: true },
          ]}
        />
      )}
    </div>
  );
};

export default PlanetPage;
