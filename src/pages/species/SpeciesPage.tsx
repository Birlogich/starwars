import { useEffect } from "react";
import { SpecieType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "../commonStyles/pageWrapper.module.scss";
import { fetchAllSpecies } from "../../features/Species/speciesSlice";
import SpecieCard from "../../components/ui/specie/SpecieCard";

const SpeciesPage = () => {
  const dispatch = useAppDispatch();

  const species = useAppSelector((state) => state.species.list);
  const status = useAppSelector((state) => state.species.status);

  useEffect(() => {
    dispatch(fetchAllSpecies());
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
        species?.map((specie: SpecieType) => (
          <SpecieCard {...specie} key={specie.name} />
        ))}
    </div>
  );
};

export default SpeciesPage;
