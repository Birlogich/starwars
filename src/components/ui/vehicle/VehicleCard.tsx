import { Link } from "react-router";
import { VehicleType } from "../../../types/index";
import styles from "../sharedStyles/card.module.scss";

interface VehicleCardTypeProps extends Pick<VehicleType, "name" | "url"> {}

const VehicleCard: React.FC<VehicleCardTypeProps> = ({ url, name }) => {
  const match = url.match(/\/(\d+)\/$/);
  const id = match ? match[1] : null;

  return (
    <Link to={`/vehicles/${id}`} className={styles.card}>
      <p>{name}</p>
    </Link>
  );
};

export default VehicleCard;
