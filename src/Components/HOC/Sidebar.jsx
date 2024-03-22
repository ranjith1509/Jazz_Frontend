import React from "react";
import { useNavigate } from "react-router-dom";
import Home from "@mui/icons-material/Home";
import CampaignIcon from "@mui/icons-material/Campaign";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import LogoutIcon from "@mui/icons-material/Logout";
import { notification } from "antd";
import axiosInstance from "./Interceptor";

const Sidebar = () => {
  const navigate = useNavigate();
  const menuItems = [
    {
      text: "Home",
      route: "/",
      icon: <Home />,
    },

    // {
    //   text: "Announcement",
    //   route: "/announcement",
    //   icon: <CampaignIcon />,
    // },
    {
      text: "Admin",
      route: "/admin",
      icon: <AdminPanelSettingsIcon />,
    },
  ];

  const handleLogout = async () => {
    localStorage.clear()
      navigate("/login");
    // try {
    //   await axiosInstance.post(
    //     `${process.env.REACT_APP_BASE_URL}/admin/logout/${localStorage.getItem(
    //       "userId"
    //     )}`
    //   );
    //   notification.success({ message: "Logout successfully" });
    //   localStorage.clear();
    //   navigate("/login");
    // } catch (e) {
    //   console.log(e);
    // }
  };

  return (
    <React.Fragment>
      <div>
        <div className="sidebar">
          {menuItems.map((item, i) => (
            <div
              onClick={() => navigate(item.route)}
              key={i}
              className="sidebar_container"
            >
              <div>{item.icon}</div>
              <div style={{ marginLeft: "30px" }}>{item.text}</div>
            </div>
          ))}
          <div onClick={handleLogout} className="sidebar_container">
            <div>
              <LogoutIcon />
            </div>
            <div style={{ marginLeft: "30px" }}>Logout</div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Sidebar;
