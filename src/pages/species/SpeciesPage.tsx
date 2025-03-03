import { useEffect } from "react";
import { SpecieType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "../commonStyles/pageWrapper.module.scss";
import { fetchAllSpecies, setPage } from "../../features/Species/speciesSlice";
import EntityCard from "../../components/ui/entityCard/EntityCard";
import Pagination from "../../components/ui/pagination/Pagination";

const SpeciesPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.species.currentPage);
  const species = useAppSelector((state) => state.species.list);
  const status = useAppSelector((state) => state.species.status);
  const totalPages = useAppSelector((state) =>
    Math.ceil(state.species.count / 10)
  );

  useEffect(() => {
    dispatch(fetchAllSpecies(String(currentPage)));
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
          {species?.map((specie: SpecieType) => (
            <EntityCard entity={specie} basePath="planets" key={specie.name} />
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

export default SpeciesPage;
