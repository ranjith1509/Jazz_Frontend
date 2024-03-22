import React, { useEffect, useState } from "react";
import { Avatar, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";
import axiosInstance from "./Interceptor";

const Header = () => {
  const [userInfo, setUserInfo] = useState();

  const fetchUserInfo = async (id) => {
    try {
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BASE_URL}/admin/${id}`
      );
      setUserInfo(response?.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchUserInfo(localStorage.getItem("userId"));
  }, [localStorage.getItem("userId")]); // eslint-disable-line

  return (
    <>
      <div style={{ width: "100%" }} className="font-bold text-red-600 z-0">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            margin: "0px 20px",
          }}
        >
          <span className="project-title">
            JAZZ pharmaceuticals LTD
          </span>
          <div
            style={{
              marginInlineStart: 50,
              clear: "both",
              whiteSpace: "nowrap",
            }}
          >
            <Space wrap size={5}>
              <Avatar size="large" icon={<UserOutlined />} />{" "}
              <div
                style={{ fontSize: "18px", fontWeight: "bold" }}
              >{`${userInfo?.firstName ?? "Jazz"} ${userInfo?.lastName ?? "sangam"}`}</div>
            </Space>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
