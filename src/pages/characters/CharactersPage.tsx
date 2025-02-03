import { useEffect } from "react";
import { CharacterType } from "../../types/entities";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";
import { fetchAllCharacters } from "../../features/Character/characterSlice";

import styles from "./styles/charactersPage.module.scss";
import CharacterCard from "../../components/ui/character/CharacterCard";

const CharactersPage = () => {
  const dispatch = useAppDispatch();

  const characters = useAppSelector((state) => state.characters.list);
  const status = useAppSelector((state) => state.characters.status);

  useEffect(() => {
    dispatch(fetchAllCharacters());
  }, []);

  //Позже добавлю пагинацию

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
      {status === "completed" &&
        characters?.map((ch: CharacterType) => (
          <CharacterCard {...ch} key={ch.name} />
        ))}
    </div>
  );
};

export default CharactersPage;
