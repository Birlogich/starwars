import { useEffect } from "react";
import { Entities, FilmType, LocalFilmType } from "../../types/entities";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "./entityPage.module.scss";
import Pagination from "../../components/ui/pagination/Pagination";
import EntityCard from "../../components/ui/entityCard/EntityCard";

type EntitiesWithoutFilms = Exclude<Entities, FilmType | LocalFilmType>;

interface EntityListPageProps<T extends EntitiesWithoutFilms> {
  fetchAllAction: (page: string) => any;
  setPageAction: (page: number) => any;
  selector: (state: any) => {
    list: T[];
    status: string;
    currentPage: number;
    count: number;
  };
  basePath: string;
}

const EntityPage = <T extends EntitiesWithoutFilms>({
  fetchAllAction,
  setPageAction,
  selector,
  basePath,
}: EntityListPageProps<T>) => {
  const dispatch = useAppDispatch();
  const { list, status, currentPage, count } = useAppSelector(selector);
  const totalPages = Math.ceil(count / 10);

  useEffect(() => {
    dispatch(fetchAllAction(String(currentPage)));
  }, [currentPage, dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(setPageAction(page));
  };

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.list}>
        {status === "loading" && (
          <Circles height="80" width="80" color="#4fa94d" ariaLabel="loading" />
        )}
        {status === "completed" && (
          <>
            <div className={styles.listWrapper}>
              {list.map((entity, index) => (
                <EntityCard entity={entity} basePath={basePath} key={index} />
              ))}
            </div>
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

export default EntityPage;
