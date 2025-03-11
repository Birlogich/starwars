import "../../App.css";
import styles from "./main.module.scss";
import Logo from "../../assets/images/logo.svg?react";
import { NavLink } from "react-router";
import { PageWrapperProps } from "../../types";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";

const PageWrapper: React.FC<PageWrapperProps> = ({ children, style }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const pathname: string = location.pathname.split("/")[1];

  return (
    <div className="wrapper" style={style}>
      <div className="container">
        {pathname === "" ? ( //Boolean условие не срабатывает. Поэтому сделал на равество с ""
          ""
        ) : (
          <IoArrowBackSharp
            className={styles.back}
            onClick={() =>
              location.key !== "default" ? navigate(-1) : navigate("/")
            }
          />
        )}
        <div className={styles.top}>
          <hr />
          <NavLink to="/">
            <Logo />
          </NavLink>
          <p>{pathname === "" ? "DISCOVERY" : pathname.toLocaleUpperCase()}</p>
          <hr />
        </div>
        {children}
      </div>
    </div>
  );
};

export default PageWrapper;
