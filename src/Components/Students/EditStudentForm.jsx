import React, { useEffect } from "react";
import { Button, Form, Input, Select, Spin } from "antd";
import { Grid } from "@material-ui/core";
import { useState } from "react";
import axiosInstance from "../HOC/Interceptor";

const { Option } = Select;

const EditStudent = ({ data, handleEditOk, handleEditCancel }) => {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);

  const fetchDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BASE_URL}/users/${id}`
      );
      setState(response?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (data) {
      fetchDetails(data);
    }
  }, [data]);

  const cancelHandler = () => {
    handleEditCancel();
    setState();
  };

  const saveHandler = () => {
    handleEditOk(state);
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
      case "percentage":
        setState({ ...state, percentage: value });
        break;
      case "arrears_count":
        setState({ ...state, arrears_count: value });
        break;
      default:
        break;
    }
  };

  return (
    <Spin spinning={loading}>
      <div style={{ maxWidth: "400px", margin: "0 auto" }}>
        <h2
          style={{
            padding: "10px 0px 0px 0px",
            alignItems: "center",
            justifyContent: "center",
            display: "flex",
          }}
        >
          Edit Clinic
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
              <Grid item xs={6}>
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
                  onChange={(e) =>
                    onChangeHandler("department", e.target.value)
                  }
                  value={state?.department}
                />
              </Grid>
            </Grid>
          </Form.Item>
          {/* <Form.Item>
            <Grid container spacing={2}>
              <Grid item xs={6} className="label">
                Percentage {<span style={{ color: "red" }}>*</span>}
                <Input
                  onChange={(e) =>
                    onChangeHandler("percentage", parseInt(e.target.value))
                  }
                  value={state?.percentage || 0}
                />
              </Grid>
              <Grid item xs={6} className="label">
                No. of arrears
                <Input
                  type="number"
                  onChange={(e) =>
                    onChangeHandler("arrears_count", parseInt(e.target.value))
                  }
                  value={state?.arrears_count}
                />
              </Grid>
            </Grid>
          </Form.Item> */}
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
                    !state?.firstName ||
                    !state?.lastName ||
                    !state?.age ||
                    !state?.email ||
                    !state?.gender ||
                    !state?.number ||
                    !state?.department 
                    // !state?.percentage
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
    </Spin>
  );
};

export default EditStudent;
