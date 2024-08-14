import React from "react";
import "./Sidebar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaughWink,
  faSignOut,
  faTachometerAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { apiRequest } from "@/common";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Sidebar: React.FC = () => {
  const router = useRouter();

  async function handleLogout(): Promise<void> {
    console.log("Logging out");
    await apiRequest("/auth/logout", "POST");
    router.push("/login"); // Client-side redirect
  }
  return (
    <nav className="navbar d-flex flex-column align-items-start sidebar sidebar-dark accordion bg-gradient-primary p-0 navbar-dark h-100">
      <div
        className="container d-flex flex-column justify-content-start p-0"
        style={{ height: "100%" }}
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

        <div
          className="d-flex flex-column justify-content-between"
          style={{ height: "90%" }}
        >
          <div className="row d-flex align-items-start justify-content-start">
            <ul className="navbar-nav text-light d-flex justify-content-start align-items-start">
              <li className="nav-item d-flex justify-content-start align-items-start">
                <Link
                  className="nav-link active sidebarItemBlock"
                  href="/dashboard"
                >
                  <FontAwesomeIcon
                    className="sidebarItem "
                    icon={faTachometerAlt}
                  />
                  <span>Chat</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link sidebarItemBlock " href="/guides">
                  <FontAwesomeIcon
                    className="styles.sidebarItem me-1"
                    icon={faUser}
                  />
                  <span>Guides</span>
                </Link>
              </li>
            </ul>
          </div>

          <div className="row d-flex align-items-center justify-content-center">
            <button
              className="btn text-light bg-logout col-6"
              type="button"
              onClick={handleLogout}
            >
              <div className="row d-flex  ">
                <div className="col-7 d-flex ">Logout</div>
                <div className="col-5 d-flex ">
                  <FontAwesomeIcon
                    className="text-light pt-1 "
                    icon={faSignOut}
                  />
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
