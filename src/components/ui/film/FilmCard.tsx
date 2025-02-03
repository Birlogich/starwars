import { Link } from "react-router";
import { FilmType } from "../../../types/entities";
import styles from "./styles/filmCard.module.scss";

interface FilmTypeProps
  extends Pick<FilmType, "episode_id" | "title" | "release_date"> {}

const FilmCard: React.FC<FilmTypeProps> = ({
  episode_id,
  title,
  release_date,
}) => {
  return (
    <Link to={`/films/${episode_id}`} className={styles.card}>
      <div className={styles.imageWrapper}>
        <img alt="movie logo" src="src/assets/images/icons/swlogo.svg" />
      </div>
      <div className={styles.infoWrapper}>
        <p>{title}</p>
        <p>{new Date(release_date).getFullYear()}</p>
      </div>
    </Link>
  );
};

export default FilmCard;
