import React, { useState } from "react";
import "./CSS/login.css";
import { Button, Input, Form, notification, Spin } from "antd";
import Logo from "../Assets/SBAJ.png"
import { useNavigate } from "react-router-dom";
import axiosInstance from "./HOC/Interceptor";

const LoginForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (values) => {
    debugger;
    try {
      setLoading(true);
      if (values?.email && values?.password) {
        const response = await axiosInstance.post(
          `${process.env.REACT_APP_BASE_URL}/admin/login`,
          values
        );
        localStorage.setItem("auth", response?.data?.token);
        localStorage.setItem("userId", response?.data?.data?._id);
        notification.success({
          message: "Login Successful",
          description: "You have successfully logged in.",
        });
        navigate(`/`);
      }
    } catch (error) {
      console.log(error);
      notification.error({
        message: error?.response?.data ?? error?.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const onFinishFailed = () => {
    notification.error({
      message: "Validation Error",
      description: "Please fill in all required fields.",
    });
  };

  return (
    <Spin spinning={loading}>
      <div className="login">
        <div className="card">
          <div>
            <img
              style={{ width: "10rem", }}
              src={Logo}
              alt="logo"
            />
            <h2 style={{marginLeft:"17px"}}>LOGIN</h2>
          </div>          <Form
            onFinish={handleLogin}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <div className="form-group">
              <label className="label">Email</label>
              <Form.Item
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please enter your email!",
                  },
                ]}
              >
                <Input
                  className=".login .ant-input"
                  type="email"
                  placeholder="Enter your email"
                />
              </Form.Item>
            </div>
            <div className="form-group">
              <label className="label">Password</label>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please enter your password!",
                  },
                ]}
              >
                <Input
                  className=".login .ant-input"
                  type="password"
                  placeholder="Enter your password"
                />
              </Form.Item>
            </div>
            <Button
              style={{
                color: "white",
                marginLeft: "0px",
                paddingBottom: "2rem",
                marginBottom: "2rem",
              }}
              type="primary"
              htmlType="submit"
            >
              Login
            </Button>
          </Form>
        </div>
      </div>
    </Spin>
  );
};

export default LoginForm;
