import { useEffect } from "react";
import { StarshipType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "../commonStyles/pageWrapper.module.scss";
import { fetchAllStarships } from "../../features/Starship/starshipsSlice";
import StarshipCard from "../../components/ui/starship/StarshipCard";

const StarshipsPage = () => {
  const dispatch = useAppDispatch();

  const starships = useAppSelector((state) => state.starships.list);
  const status = useAppSelector((state) => state.starships.status);

  useEffect(() => {
    dispatch(fetchAllStarships());
  }, []);

  //Позже добавлю пагинацию

  return (
    <div className={styles.pageWrapper}>
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
      {status === "completed" &&
        starships?.map((starship: StarshipType) => (
          <StarshipCard {...starship} key={starship.name} />
        ))}
    </div>
  );
};

export default StarshipsPage;
