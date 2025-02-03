import { Link } from "react-router";
import { PlanetType } from "../../../types/index";
import styles from "../sharedStyles/card.module.scss";

interface PlanetTypeProps extends Pick<PlanetType, "name" | "url"> {}

const PlanetCard: React.FC<PlanetTypeProps> = ({ url, name }) => {
  const match = url.match(/\/(\d+)\/$/);
  const id = match ? match[1] : null;

  return (
    <Link to={`/planets/${id}`} className={styles.card}>
      <p>{name}</p>
    </Link>
  );
};

export default PlanetCard;
