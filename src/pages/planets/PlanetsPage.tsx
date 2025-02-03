import { useEffect } from "react";
import { PlanetType } from "../../types/index";
import { useAppDispatch, useAppSelector } from "../../redux-hooks";
import { Circles } from "react-loader-spinner";

import styles from "./styles/planetsPage.module.scss";
import { fetchAllPlanets } from "../../features/Plantet/planetsSlice";
import PlanetCard from "../../components/ui/planet/PlanetCard";

const PlanetsPage = () => {
  const dispatch = useAppDispatch();

  const planets = useAppSelector((state) => state.planets.list);
  const status = useAppSelector((state) => state.planets.status);

  useEffect(() => {
    dispatch(fetchAllPlanets());
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
        planets?.map((planet: PlanetType) => (
          <PlanetCard {...planet} key={planet.name} />
        ))}
    </div>
  );
};

export default PlanetsPage;
