import { Link } from "react-router";
import { StarshipType } from "../../../types/index";
import styles from "../sharedStyles/card.module.scss";

interface StarshipCardTypeProps extends Pick<StarshipType, "name" | "url"> {}

const StarshipCard: React.FC<StarshipCardTypeProps> = ({ url, name }) => {
  const match = url.match(/\/(\d+)\/$/);
  const id = match ? match[1] : null;

  return (
    <Link to={`/starships/${id}`} className={styles.card}>
      <p>{name}</p>
    </Link>
  );
};

export default StarshipCard;
