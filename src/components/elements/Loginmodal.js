import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../Contexts/AuthContext";
import UserContext from "../../Contexts/UserContext";
import UserIdContext from "../../Contexts/UserIdContext";

const Loginmodal = () => {
  const buttonRef = useRef(null);
  const history = useNavigate();
  const [activeTab, setActiveTab] = useState("#login");
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [registerEmail, setRegisterEmail] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPhone, setRegisterPhone] = useState("");
  const [registerName, setRegisterName] = useState("");
  const [registerUserType, setRegisterUserType] = useState("");


  const { isLogin, setIsLogin } = useContext(AuthContext);
  const { userName, setUserName } = useContext(UserContext);
  const {userId,setUserId}= useContext(UserIdContext)

  const handleLoginEmailChange = (e) => {
    setLoginEmail(e.target.value);
  };

  const handleLoginPasswordChange = (e) => {
    setLoginPassword(e.target.value);
  };

  const handleRegisterEmailChange = (e) => {
    setRegisterEmail(e.target.value);
  };

  const handleRegisterPasswordChange = (e) => {
    setRegisterPassword(e.target.value);
  };

  const handleRegisterPhoneChange = (e) => {
    setRegisterPhone(e.target.value);
  };

  const handleRegisterNameChange = (e) => {
    setRegisterName(e.target.value);
  };

  const handleRegisterUserTypeChange = (e) => {
    setRegisterUserType(e.target.value);
  };

  const handleTabClick = (tabId) => {
    setActiveTab(tabId);
  };

  const register = async (e) => {
    e.preventDefault();

    console.log("register is triggered");

    try {
      const response = await axios.post(
        "http://localhost:8000/users/register",
        {
          email: registerEmail,
          password: registerPassword,
          mobilenumber: registerPhone,
          name: registerName,
          usertype: registerUserType,
        },

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
          withCredentials: true,
        }
      );

      if (response.data.success) {
        setUserName(response.data.name);
        setUserId(response.data.id)
        console.log(userId)
        setIsLogin(true);
        buttonRef.current.click();
        history("/");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login",
        {
          email: loginEmail,
          password: loginPassword,
        },

        {
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "http://localhost:3000",
            "Access-Control-Allow-Credentials": "true",
          },
          withCredentials: true,
        }
      );
      console.log(response.data.success);
      if (response.data.success) {
        setIsLogin(true);
        setUserName(response.data.name);
        setUserId(response.data.id)
        console.log(userId)
        buttonRef.current.click();
        history("/");
      } else {
        alert("WRONG PASSWORD");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <div
        className="modal fade"
        id="loginModal"
        tabIndex={-1}
        role="dialog"
        aria-labelledby="loginModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="loginModalLabel">
                Login or Register
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={buttonRef}
              >
                <span aria-hidden="true">×</span>
              </button>
            </div>
            <div className="modal-body">
              <ul
                className="nav nav-tabs"
                id="loginRegisterTabs"
                role="tablist"
              >
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "#login" ? "active" : ""
                    }`}
                    id="login-tab"
                    data-bs-toggle="tab"
                    href="#login"
                    role="tab"
                    aria-controls="login"
                    aria-selected="true"
                    onClick={() => handleTabClick("#login")}
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      activeTab === "#register" ? "active" : ""
                    }`}
                    id="register-tab"
                    data-bs-toggle="tab"
                    href="#register"
                    role="tab"
                    aria-controls="register"
                    aria-selected="false"
                    onClick={() => handleTabClick("#register")}
                  >
                    Register
                  </a>
                </li>
              </ul>
              <div className="tab-content" id="loginRegisterContent">
                <div
                  className={`tab-pane fade ${
                    activeTab === "#login" ? "show active" : ""
                  }`}
                  id="login"
                  role="tabpanel"
                  aria-labelledby="login-tab"
                >
                  <form onSubmit={login}>
                    <div className="form-group">
                      <label htmlFor="loginEmail">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="loginEmail"
                        placeholder="Enter email"
                        value={loginEmail}
                        onChange={handleLoginEmailChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="loginPassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="loginPassword"
                        placeholder="Password"
                        value={loginPassword}
                        onChange={handleLoginPasswordChange}
                      />
                    </div>
                    {activeTab === "#login" && (
                      <>
                        <button type="submit" className="btn btn-primary">
                          Login
                        </button>
                      </>
                    )}
                  </form>
                </div>
                <div
                  className={`tab-pane fade ${
                    activeTab === "#register" ? "show active" : ""
                  }`}
                  id="register"
                  role="tabpanel"
                  aria-labelledby="register-tab"
                >
                  <form onSubmit={register}>
                    <div className="form-group">
                      <label htmlFor="registerEmail">Email address</label>
                      <input
                        type="email"
                        className="form-control"
                        id="registerEmail"
                        placeholder="Enter email"
                        value={registerEmail}
                        onChange={handleRegisterEmailChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerPassword">Password</label>
                      <input
                        type="password"
                        className="form-control"
                        id="registerPassword"
                        placeholder="Password"
                        value={registerPassword}
                        onChange={handleRegisterPasswordChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerPassword">Mobile Number</label>
                      <input
                        type="text"
                        className="form-control"
                        value={registerPhone}
                        onChange={handleRegisterPhoneChange}
                        placeholder=""
                        id="registerPhone"
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerPassword">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="registerName"
                        placeholder="Alex"
                        value={registerName}
                        onChange={handleRegisterNameChange}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="registerPassword">UserType</label>
                      <input
                        type="password"
                        className="form-control"
                        id="registerUserType"
                        placeholder="User"
                        value={registerUserType}
                        onChange={handleRegisterUserTypeChange}
                      />
                    </div>
                    {activeTab === "#register" && (
                      <>
                        <button type="submit" className="btn btn-primary">
                          Register
                        </button>
                      </>
                    )}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loginmodal;
