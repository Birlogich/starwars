import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchSpecie } from "../../features/Species/speciesSlice";
import EntityPage from "../../components/entityPage/EntityPage";

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
        <EntityPage
          entity={specie}
          titleKey="name"
          fields={[
            { label: "Average Height", key: "average_height" },
            { label: "Average Life Span", key: "average_lifespan" },
            { label: "Classification", key: "classification" },
            { label: "Language", key: "language" },
            { label: "Skin Colors", key: "skin_colors" },
            { label: "Films", key: "films", isLink: true },
            { label: "People", key: "people", isLink: true },
          ]}
        />
      )}
    </div>
  );
};

export default SpeciePage;
