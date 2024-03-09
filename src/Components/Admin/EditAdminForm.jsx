import React, { useEffect, useState } from "react";
import { Button, Form, Input, Spin } from "antd";
import { Grid } from "@material-ui/core";
import axiosInstance from "../HOC/Interceptor";

const EditAdmin = ({ data, handleEditOk, handleEditCancel }) => {
  const [state, setState] = useState();
  const [loading, setLoading] = useState(false);

  const fetchDetails = async (id) => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BASE_URL}/admin/${id}`
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

      case "email":
        setState({ ...state, email: value });
        break;

      case "phoneNumber":
        setState({ ...state, phoneNumber: value });
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
          Edit Admin
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
                  onChange={(e) =>
                    onChangeHandler("phoneNumber", e.target.value)
                  }
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
                  onChange={(e) =>
                    onChangeHandler("password", parseInt(e.target.value))
                  }
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
                    !state?.firstName ||
                    !state?.lastName ||
                    !state?.email ||
                    !state?.phoneNumber ||
                    !state?.password
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

export default EditAdmin;
