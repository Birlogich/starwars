import { useEffect } from "react";
import { StarshipType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "../commonStyles/pageWrapper.module.scss";
import {
  fetchAllStarships,
  setPage,
} from "../../features/Starship/starshipsSlice";
import Pagination from "../../components/ui/pagination/Pagination";
import EntityCard from "../../components/ui/entityCard/EntityCard";

const StarshipsPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.starships.currentPage);
  const starships = useAppSelector((state) => state.starships.list);
  const status = useAppSelector((state) => state.starships.status);
  const totalPages = useAppSelector((state) =>
    Math.ceil(state.starships.count / 10)
  );

  useEffect(() => {
    dispatch(fetchAllStarships(String(currentPage)));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

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
      {status === "completed" && (
        <>
          {starships?.map((starship: StarshipType) => (
            <EntityCard
              entity={starship}
              basePath="planets"
              key={starship.name}
            />
          ))}
          <Pagination
            currentPage={currentPage}
            handlePageChange={handlePageChange}
            totalPages={totalPages}
          />
        </>
      )}
    </div>
  );
};

export default StarshipsPage;
