import { useEffect } from "react";
import { CharacterType } from "../../types/entities";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import {
  fetchAllCharacters,
  setPage,
} from "../../features/Character/characterSlice";

import styles from "../commonStyles/pageWrapper.module.scss";
import Pagination from "../../components/ui/pagination/Pagination";
import EntityCard from "../../components/ui/entityCard/EntityCard";

const CharactersPage = () => {
  const dispatch = useAppDispatch();
  const currentPage = useAppSelector((state) => state.characters.currentPage);
  const characters = useAppSelector((state) => state.characters.list);
  const status = useAppSelector((state) => state.characters.status);
  const totalPages = useAppSelector((state) =>
    Math.ceil(state.characters.count / 10)
  );

  useEffect(() => {
    dispatch(fetchAllCharacters(String(currentPage)));
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
            <div className={styles.listWrapper}>
              {characters?.map((ch: CharacterType) => (
                <EntityCard entity={ch} basePath="planets" key={ch.name} />
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

export default CharactersPage;
