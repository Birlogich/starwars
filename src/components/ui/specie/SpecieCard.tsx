import { Link } from "react-router";
import styles from "../sharedStyles/card.module.scss";
import { SpecieType } from "../../../types";

interface SpecieTypeProps extends Pick<SpecieType, "name" | "url"> {}

const SpecieCard: React.FC<SpecieTypeProps> = ({ url, name }) => {
  const match = url.match(/\/(\d+)\/$/);
  const id = match ? match[1] : null;

  return (
    <Link to={`/species/${id}`} className={styles.card}>
      <p>{name}</p>
    </Link>
  );
};

export default SpecieCard;
