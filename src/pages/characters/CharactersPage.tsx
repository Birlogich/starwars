import { useEffect } from "react";
import { CharacterType } from "../../types/entities";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import {
  fetchAllCharacters,
  setPage,
} from "../../features/Character/characterSlice";

import styles from "../commonStyles/pageWrapper.module.scss";
import CharacterCard from "../../components/ui/character/CharacterCard";

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
        {status === "completed" &&
          characters?.map((ch: CharacterType) => (
            <CharacterCard {...ch} key={ch.name} />
          ))}
      </div>
      <div className={styles.pagination}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            className={`${styles.paginationButton} ${currentPage === index + 1 ? "active" : ""}`}
            key={index}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CharactersPage;
