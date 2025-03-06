import { useParams } from "react-router-dom";
import { useEffect } from "react";
import styles from "../commonStyles/pageCard.module.scss";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchStarshipById } from "../../features/Starship/starshipsSlice";
import EntityPage from "../../components/entityPageComponent/EntityPageComponent";

const StarShipPage = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const status = useAppSelector((state) => state.starships.selectedStatus);
  const starship = useAppSelector((state) => state.starships.selectedEntity);
  const error = useAppSelector((state) => state.starships.error);

  useEffect(() => {
    id && dispatch(fetchStarshipById(id));
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
          entity={starship}
          titleKey="name"
          fields={[
            { label: "Model", key: "model" },
            { label: "Manufacturer", key: "manufacturer" },
            { label: "Passengers", key: "passengers" },
            { label: "Length", key: "length" },
            { label: "Hyperdrive Rating", key: "hyperdrive_rating" },
            { label: "Films", key: "films", isLink: true },
            { label: "Pilots", key: "pilots", isLink: true },
          ]}
        />
      )}
    </div>
  );
};

export default StarShipPage;
