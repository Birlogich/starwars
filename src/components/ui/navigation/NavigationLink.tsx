import { NavLink } from "react-router-dom";
import styles from "./styles/navlink.module.scss";
import { NavLinkProps } from "../../../types";

const NavigationLink: React.FC<NavLinkProps> = ({
  to,
  LogoComponent,
  title,
  style,
}) => {
  return (
    <NavLink
      to={to}
      className={`animate__animated animate__fadeInDown ${styles.navlink}`}
      style={style}
    >
      <LogoComponent className={styles.logo} />
      <p>{title}</p>
    </NavLink>
  );
};

export default NavigationLink;
