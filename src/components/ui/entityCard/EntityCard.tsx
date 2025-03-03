import { Link } from "react-router";
import styles from "./entityCard.module.scss";

interface EntityProps<T extends { name: string; url: string }> {
  entity: T;
  basePath: string;
}

const EntityCard = <T extends { name: string; url: string }>({
  entity,
  basePath,
}: EntityProps<T>) => {
  const match = entity.url.match(/\/(\d+)\/$/);
  const id = match ? match[1] : null;

  return (
    <Link to={`/${basePath}/${id}`} className={styles.card}>
      <p>{entity.name}</p>
    </Link>
  );
};

export default EntityCard;
