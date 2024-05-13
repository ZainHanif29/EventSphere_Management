import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useUserData from "../../../hooks/user";

function Navbar() {
  const navigate = useNavigate();
  const { name, email, role, error, res } = useUserData();
  useEffect(() => {
    try {
      // console.log(name, email, role, error, res);
    } catch (e) {
      console.log(e);
    }
  }, [name, email, role, error, res]);
  
  function handleLogout() {
    localStorage.removeItem("token");
    navigate("/")

  }
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
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
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About us
              </Link>
            </li>
       
          </ul>
          {res == "success" ? (
            role == "organizer" && (
              <>
                <Link className="btn btn-outline-primary" to="/viewusers">
                  Dasboard
                </Link>
              </>
            )
          ) : (
            <>
            </>
          )}

          {res == "success" ? (
            <Link className="btn btn-outline-danger" onClick={handleLogout}>
              Logout
            </Link>
          ) : (
        <></>
          )}
        </div>
      </div>
    </nav>
  );

}

export default Navbar;
