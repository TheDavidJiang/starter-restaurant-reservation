import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import { useHistory } from "react-router";
import "./Layout.css";
/**
 * Defines the main layout of the application.
 *
 * You will not need to make changes to this file.
 *
 * @returns {JSX.Element}
 */
function Layout() {
  const history = useHistory();
  return (
    <div>
      <div className="row-md-2 no-padding" style={{ backgroundColor: "#1f424b" }}>
        <Menu />
      </div>
      <div className="containerMax">
        <div className="row-12">
          <div className="center-text header" onClick={() => history.push("/")}>
            <h1 className="header-logo">Dashboard</h1>
          </div>
          {/* <div className="row justify-content-center align-items-start p-4"> */}
          <div className = "row">
            <Routes />
          </div>
        </div>
      </div>
      <h6 className="invisible">Periodic Tables</h6>
    </div>
  );
}

export default Layout;
