import React from "react";
import "../styles/NotLogin.css";
const NotLogin = () => {
  return (
    <div>
      <div
        className="toast align-items-center text-bg-primary border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">You need to login first</div>
          <button
            type="button"
            className="btn-close btn-close-white me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          />
        </div>
      </div>
    </div>
  );
};
export default NotLogin;
