import React from "react";
import { Button, Form, Input, Select } from "antd";
import { Grid } from "@material-ui/core";
import { useState } from "react";

const { Option } = Select;

const StudentRegistrationForm = ({ onOk, onCancel }) => {
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    age: "",
    email: "",
    gender: "",
    number: "",
    department: "",
  });

  const cancelHandler = () => {
    onCancel(false);
    setState({
      firstName: "",
      lastName: "",
      age: "",
      email: "",
      gender: "",
      number: "",
      department: "",
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
      case "age":
        setState({ ...state, age: value });
        break;
      case "email":
        setState({ ...state, email: value });
        break;
      case "gender":
        setState({ ...state, gender: value });
        break;
      case "number":
        setState({ ...state, number: value });
        break;
      case "department":
        setState({ ...state, department: value });
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
        Student Registration Form
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
              Age {<span style={{ color: "red" }}>*</span>}
              <Input
                type="number"
                onChange={(e) => onChangeHandler("age", e.target.value)}
                value={state?.age}
              />
            </Grid>
            <Grid item xs={6} className="label">
              {" "}
              Phone Number {<span style={{ color: "red" }}>*</span>}
              <Input
                onChange={(e) => onChangeHandler("number", e.target.value)}
                value={state?.number}
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
              Department {<span style={{ color: "red" }}>*</span>}
              <Input
                onChange={(e) => onChangeHandler("department", e.target.value)}
                value={state?.department}
              />
            </Grid>
          </Grid>
        </Form.Item>

        <Form.Item>
          <Grid style={{ marginBottom: "2rem" }} container spacing={2}>
            <Grid item xs={6} className="label">
              Gender {<span style={{ color: "red" }}>*</span>}
              <Select
                onChange={(value) => onChangeHandler("gender", value)}
                value={state?.gender}
              >
                <Option value="Male">Male</Option>
                <Option value="Female">Female</Option>
                <Option value="Others">Others</Option>
              </Select>
            </Grid>{" "}
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
                  !state?.age ||
                  !state.email ||
                  !state?.gender ||
                  !state.number ||
                  !state.department
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

export default StudentRegistrationForm;
