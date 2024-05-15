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
    localStorage.removeItem("role");
    navigate("/")
  }
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          EventShphere
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
              <Link className="nav-link " aria-current="page" to="/home">
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
                <Link className="btn" style={{backgroundColor:"coral"}} to="/viewusers">
                  Dasboard
                </Link> &emsp;
              </>
            )
          ) : (
            <>
            </>
          )}

          {res == "success" ? (
            <button className="btn " style={{backgroundColor:"crimson" ,color:"white"}} onClick={handleLogout}>
              Logout
            </button>
          ) : (
        <></>
          )}
        </div>
      </div>
    </nav>
  );

}

export default Navbar;
