import { navagationData } from "./data/navigationData";
import NavigationLink from "./NavigationLink";
import styles from "./styles/navigation.module.scss";

const Navigation: React.FC = () => {
  return (
    <nav className={styles.navigation}>
      {navagationData.map((link, idx: number) => (
        <NavigationLink {...link} key={idx} style={{ "--i": idx * 0.1 }} />
      ))}
    </nav>
  );
};

export default Navigation;
