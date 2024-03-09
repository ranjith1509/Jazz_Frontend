import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

const PrivateRoute = () => {
  let auth = localStorage.getItem("auth");

  return (
    <React.Fragment>
      {auth ? (
        <div className="app-container">
          <Sidebar />
          <div className="header">
            <Header />
          </div>
          <div className="content-container">
            <Outlet />
          </div>
        </div>
      ) : (
        <div className="app-container">
          <Navigate to="/login" />
        </div>
      )}
    </React.Fragment>
  );
};

export default PrivateRoute;
