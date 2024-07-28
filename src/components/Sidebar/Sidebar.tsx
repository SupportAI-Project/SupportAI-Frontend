import React from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaughWink,
  faTachometerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const Sidebar: React.FC = () => {
  return (
    <nav className="navbar align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark">
      <div
        className="container-fluid d-flex flex-column p-0"
        style={{ flexWrap: "wrap" }}
      >
        <a
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0`"
          href="#"
        >
          <div className="sidebar-brand-icon">
            <FontAwesomeIcon icon={faLaughWink} />
          </div>
          <div className="sidebar-brand-text mx-1">
            <span>SupportAI</span>
          </div>
        </a>
        <hr className="sidebar-divider my-0" />
        <ul className="navbar-nav text-light" id="accordionSidebar">
          <li className="nav-item">
            <a className="nav-link active sidebarItemBlock" href="#">
              <FontAwesomeIcon className="sidebarItem" icon={faTachometerAlt} />
              <span>Chat</span>
            </a>
          </li>
          <li className="nav-item">
            <a className="nav-link sidebarItemBlock" href="#">
              <FontAwesomeIcon className="styles.sidebarItem" icon={faUser} />
              <span>Guides</span>
            </a>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn pulse animated rounded-circle border-0"
            type="button"
          ></button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
