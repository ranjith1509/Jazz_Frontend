import React, { Fragment, useEffect, useState } from "react";
import {
  Breadcrumb,
  Button,
  Modal,
  Pagination,
  Spin,
  Table,
  notification,
} from "antd";
import StudentRegistrationForm from "./StudentRegistrationForm";
import AddIcon from "@mui/icons-material/Add";
import EditStudent from "./EditStudentForm";
import axiosInstance from "../HOC/Interceptor";
import Swal from "sweetalert2";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({ status: false, data: "" });
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  useEffect(() => {
    fetchAllUsers();
  }, [page, pageSize]); // eslint-disable-line

  const fetchAllUsers = async () => {
    try {
      let data = {
        page: page,
        rows: pageSize,
      };
      setLoading(true);
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BASE_URL}/users?page=${page}&rows=${pageSize}`,
        data
      );
      setData(response?.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Full Name",
      dataIndex: "fullName",
      render: (text, record) => `${record.firstName} ${record.lastName}`,
      sorter: {
        compare: (a, b) =>
          (a.firstName + " " + a.lastName).localeCompare(
            b.firstName + " " + b.lastName
          ),
        multiple: 5,
      },
    },
    {
      title: "Age",
      dataIndex: "age",
      sorter: {
        compare: (a, b) => a.age - b.age,
        multiple: 7,
      },
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Gender",
      dataIndex: "gender",
    },
    {
      title: "Number",
      dataIndex: "number",
    },
    {
      title: "Department",
      dataIndex: "department",
      sorter: {
        compare: (a, b) => a.department.localeCompare(b.department),
        multiple: 3,
      },
    },
    // {
    //   title: "Percentage",
    //   dataIndex: "percentage",
    //   sorter: {
    //     compare: (a, b) => a.percentage - b.percentage,
    //     multiple: 2,
    //   },
    // },
    // {
    //   title: "No. of Arrears",
    //   dataIndex: "arrears_count",
    //   sorter: {
    //     compare: (a, b) => a.arrears_count - b.arrears_count,
    //     multiple: 1,
    //   },
    // },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span style={{ display: "flex", gap: "10px" }}>
          <p className="edit" onClick={() => handleEdit(record)}>
            Edit
          </p>
          <span className="ant-divider" />
          <p className="delete" onClick={() => handleDelete(record._id)}>
            Delete
          </p>
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEdit({ ...edit, status: true, data: record?._id });
  };

  const handleDelete = async (id) => {
    try {
      Swal.fire({
        title: "Do you want to delete the user?",
        showDenyButton: true,
        confirmButtonText: "Yes",
      }).then(async (result) => {
        if (result.isConfirmed) {
          await axiosInstance.delete(
            `${process.env.REACT_APP_BASE_URL}/users/${id}`
          );
          notification.success({
            message: "User deleted successfully",
          });
          fetchAllUsers();
        }
      });
      setLoading(true);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleOk = async (data) => {
    try {
      await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/users`, data);
      notification.success({
        message: "User created successfully",
      });
      fetchAllUsers();
    } catch (e) {
      console.log(e);
    }
  };
  const handleCancel = () => {
    setOpen(false);
  };

  const handleEditOk = async (value) => {
    try {
      setLoading(true);
      await axiosInstance.put(
        `${process.env.REACT_APP_BASE_URL}/users/${value?._id}`,
        value
      );
      notification.success({
        message: "User updated successfully",
      });
      fetchAllUsers();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEdit({ ...edit, status: false, data: "" });
  };

  const handleFileUpload = async (e) => {
    try {
      setLoading(true);
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append("file", file);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/users/file_import`,
        formData
      );
      notification.success({ message: response?.data?.message });
      fetchAllUsers();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handlePageSizeChange = (newPage, newPageSize) => {
    setPageSize(newPageSize);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  return (
    <Fragment>
      <Spin spinning={loading}>
        {edit?.data && (
          <Modal onCancel={handleEditCancel} open={edit.status} footer={null}>
            <EditStudent
              data={edit?.data}
              handleEditOk={handleEditOk}
              handleEditCancel={handleEditCancel}
            />
          </Modal>
        )}
        <Modal
          open={open}
          onCancel={handleCancel}
          footer={null}
          closable={false}
        >
          <StudentRegistrationForm onOk={handleOk} onCancel={handleCancel} />
        </Modal>
        <div
          style={{
            padding: "10px",
            background: "#e6e6e6",
            borderRadius: "8px",
          }}
        >
          {" "}
          <Breadcrumb
            items={[
              {
                title: "List of Clinics",
              },
            ]}
          />
        </div>
        <div
          style={{
            margin: "10px 0px 10px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div className="uploadButton">
            <label htmlFor="file-upload" className="uploadButton">
              <CloudUploadIcon /> Import Data
            </label>
            <input
              type="file"
              accept=".xlsx, .xls"
              id="file-upload"
              onChange={handleFileUpload}
              style={{ display: "none" }}
            />
          </div>

          <Button
            className="register-button"
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setOpen(true)}
          >
            <AddIcon className="mr-2" /> Register Clinic
          </Button>
        </div>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={data?.users}
          onChange={onChange}
          pagination={false}
        />
        <Pagination
          className="mt-2"
          current={page}
          pageSize={pageSize}
          total={data?.totalRecords}
          onChange={handlePageChange}
          onShowSizeChange={handlePageSizeChange}
          showSizeChanger={true}
        />
      </Spin>
    </Fragment>
  );
};

export default Dashboard;
