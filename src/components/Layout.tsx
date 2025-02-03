import { Outlet } from "react-router";
import "../App.css";

const Layout = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default Layout;
