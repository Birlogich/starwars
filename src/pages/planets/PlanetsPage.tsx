import { useEffect } from "react";
import { PlanetType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "../commonStyles/pageWrapper.module.scss";
import { fetchAllPlanets, setPage } from "../../features/Planet/planetsSlice";
import Pagination from "../../components/ui/pagination/Pagination";
import EntityCard from "../../components/ui/entityCard/EntityCard";

const PlanetsPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.planets.currentPage);
  const planets = useAppSelector((state) => state.planets.list);
  const status = useAppSelector((state) => state.planets.status);
  const totalPages = useAppSelector((state) =>
    Math.ceil(state.planets.count / 10)
  );

  useEffect(() => {
    dispatch(fetchAllPlanets(String(currentPage)));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPage(page));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.list}>
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
            {planets?.map((planet: PlanetType) => (
              <EntityCard
                entity={planet}
                basePath="planets"
                key={planet.name}
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
    </div>
  );
};

export default PlanetsPage;
