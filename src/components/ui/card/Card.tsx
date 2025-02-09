import { Link } from "react-router";
import { CharacterType } from "../../../types/entities";
import styles from "../sharedStyles/card.module.scss";

interface Character extends Pick<CharacterType, "name" | "url"> {}

//Здесь мы берем URL из объекта, а не из Рarams, поэтому useParams не могу использовать

const CharacterCard: React.FC<Character> = ({ url, name }) => {
  const match = url.match(/\/(\d+)\/$/);
  const id = match ? match[1] : null;

  return (
    <Link to={`/people/${id}`} className={styles.card}>
      <p>{name}</p>
    </Link>
  );
};

export default CharacterCard;
