import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import Loginmodal from "./Loginmodal";
import AuthContext from "../../Contexts/AuthContext";
import UserContext from "../../Contexts/UserContext";
import UserIdContext from "../../Contexts/UserIdContext";
import NotLogin from "./NotLogin";
import "../styles/Modal.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyNavbar = () => {
  const history = useNavigate();
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [islunchBoxOpen, setIsLunchBoxOpen] = useState(false);
  const { isLogin, setIsLogin } = useContext(AuthContext);
  const { userName, setUserName } = useContext(UserContext);
  const {userid,setUserId}=useContext(UserIdContext)

  const toggleNavbar = () => {
    setIsNavbarOpen(!isNavbarOpen);
  };

  const closeNavbar = () => {
    setIsNavbarOpen(false);
  };

  const handleLogout = async () => {
    console.log("handle Logout CAlled");
    const response = await axios.get("http://localhost:8000/users/logout", {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:3000",
        "Access-Control-Allow-Credentials": "true",
      },
      withCredentials: true,
    });
    closeNavbar();
    if (response.data) {
      setIsLogin(false) 
      setUserId("")
    }

    history("/");
  };

  

  return (
    <>
      <nav className="navbar sticky-top navbar-expand-lg bg-dark-tertiary py-5 py-lg-4 bg-dark navbar-dark">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            PIZZA BY ENGINEER...
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleNavbar}
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`collapse navbar-collapse${isNavbarOpen ? " show" : ""}`}
            style={{ transition: "height 0.001s ease" }}
          >
            <ul className="navbar-nav">
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  aria-current="page"
                  to="/pizza"
                  onClick={closeNavbar}
                >
                  Pizza
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/refreshment"
                  onClick={closeNavbar}
                >
                  Refreshment
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  className="nav-link "
                  to="/dessert"
                  onClick={closeNavbar}
                >
                  Dessert
                </NavLink>
              </li>
              {!isLogin && (
                <li className="nav-item">
                  <a
                    href="#"
                    className="nav-link"
                    data-bs-toggle="modal"
                    data-bs-target="#loginModal"
                    onClick={closeNavbar}
                  >
                    Login
                  </a>
                </li>
              )}
              {isLogin && (
                <li className="nav-item">
                  <a href="#" className="nav-link" onClick={closeNavbar}>
                    {userName}
                  </a>
                </li>
              )}
              <li className="nav-item">
             <NavLink className="nav-link " to="/lunchbox" onClick={closeNavbar}>
                  Your LunchBox
                </NavLink> 
              </li>
              {isLogin && (
                <li className="nav-item">
                  <a className="nav-link " href="#" onClick={handleLogout}>
                    LogOut
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
      <>
        <Loginmodal />
      </>
      {islunchBoxOpen ? <NotLogin /> : null}
    </>
  );
};

export default MyNavbar;
