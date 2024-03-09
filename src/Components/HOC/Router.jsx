import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Students/StudentPage";
import Announcement from "../Announcement/AnnouncementPage";
import Login from "../LoginPage";
import AdminDetails from "../Admin/AdminPage";

const Router = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route element={<Login />} path="/login" />
          <Route element={<PrivateRoute />}>
            <Route element={<Dashboard />} path="/" exact />
            {/* <Route element={<Announcement />} path="/announcement" exact /> */}
            <Route element={<AdminDetails />} path="/admin" exact />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
