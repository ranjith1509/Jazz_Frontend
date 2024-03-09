import React, { useState } from "react";
import { Button, Form, Input } from "antd";
import { Grid } from "@material-ui/core";

const AdminRegistrationForm = ({ onOk, onCancel }) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const cancelHandler = () => {
    onCancel(false);
    setState({
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
    });
  };

  const saveHandler = () => {
    onOk(state);
    cancelHandler();
  };

  const onChangeHandler = (type, value) => {
    switch (type) {
      case "firstName":
        setState({ ...state, firstName: value });
        break;
      case "lastName":
        setState({ ...state, lastName: value });
        break;

      case "email":
        setState({ ...state, email: value });
        break;

      case "phoneNumber":
        setState({ ...state, phoneNumber: value });
        break;
      case "password":
        setState({ ...state, password: value });
        break;

      default:
        break;
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto" }}>
      <h2
        style={{
          padding: "10px 0px 0px 0px",
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        Admin Registration Form
      </h2>
      <Form autoComplete="off">
        <Form.Item>
          <Grid container spacing={2}>
            <Grid item xs={6} className="label">
              First Name {<span style={{ color: "red" }}>*</span>}
              <Input
                onChange={(e) => onChangeHandler("firstName", e.target.value)}
                value={state?.firstName}
              />
            </Grid>
            <Grid item xs={6} className="label">
              {" "}
              Last Name {<span style={{ color: "red" }}>*</span>}
              <Input
                onChange={(e) => onChangeHandler("lastName", e.target.value)}
                value={state?.lastName}
              />
            </Grid>
          </Grid>
        </Form.Item>

        <Form.Item>
          <Grid container spacing={2}>
            <Grid item xs={6} className="label">
              Email {<span style={{ color: "red" }}>*</span>}
              <Input
                type="email"
                onChange={(e) => onChangeHandler("email", e.target.value)}
                value={state?.email}
              />
            </Grid>
            <Grid item xs={6} className="label">
              {" "}
              Phone Number {<span style={{ color: "red" }}>*</span>}
              <Input
                onChange={(e) => onChangeHandler("phoneNumber", e.target.value)}
                value={state?.phoneNumber}
              />
            </Grid>
          </Grid>
        </Form.Item>

        <Form.Item>
          <Grid container spacing={2}>
            <Grid item xs={6} className="label">
              Password {<span style={{ color: "red" }}>*</span>}
              <Input
                onChange={(e) => onChangeHandler("password", e.target.value)}
                value={state?.password}
              />
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                justifyContent: "flex-end",
                alignItems: "flex-end",
                marginBottom: "5px",
                display: "flex",
              }}
            >
              <Button
                type="primary"
                onClick={cancelHandler}
                style={{ marginLeft: 8 }}
              >
                Cancel
              </Button>
              <Button
                disabled={
                  !state.firstName ||
                  !state.lastName ||
                  !state.email ||
                  !state.phoneNumber ||
                  !state.password
                }
                onClick={saveHandler}
                type="primary"
                htmlType="submit"
              >
                Save
              </Button>
            </Grid>
          </Grid>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AdminRegistrationForm;
