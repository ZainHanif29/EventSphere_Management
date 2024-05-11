import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          EventSphere_Management
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {/* <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/link">
                Link
              </Link>
            </li>
          </ul> */}
          <Link className="btn btn-outline-danger" onClick={handleLogout}>
            Logout
          </Link>
          <Link className="btn btn-outline-info" to="/viewusers">
            Dasboard
          </Link>
        </div>
      </div>
    </nav>
  );

  function handleLogout() {
    localStorage.removeItem("token");
  }
}

export default Navbar;
