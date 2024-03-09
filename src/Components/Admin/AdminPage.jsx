import React, { Fragment, useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import {
  Breadcrumb,
  Button,
  Modal,
  Pagination,
  Spin,
  Table,
  notification,
} from "antd";
import AdminRegister from "./AdminRegisterForm";
import AddIcon from "@mui/icons-material/Add";
import EditAdmin from "./EditAdminForm";
import axiosInstance from "../HOC/Interceptor";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AdminDetails = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState({ status: false, data: "" });
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetchAllAdmins();
  }, [page, pageSize]); // eslint-disable-line

  const fetchAllAdmins = async () => {
    try {
      let data = {
        page: page,
        rows: pageSize,
      };
      setLoading(true);
      const response = await axiosInstance.get(
        `${process.env.REACT_APP_BASE_URL}/admin?page=${page}&rows=${pageSize}`,
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
      title: "Email",
      dataIndex: "email",
    },

    {
      title: "Number",
      dataIndex: "phoneNumber",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <span style={{ display: "flex", gap: "10px" }}>
          <p className="edit" onClick={() => handleEdit(record)}>
            Edit
          </p>
          <span className="ant-divider" />
          <p
            className={`delete ${
              record._id === localStorage.getItem("userId") ? "disabled" : ""
            }`}
            onClick={() => deleteAdminById(record._id)}
          >
            Delete
          </p>
        </span>
      ),
    },
  ];

  const handleEdit = (record) => {
    setEdit({ ...edit, status: true, data: record?._id });
  };

  const deleteAdminById = async (id) => {
    try {
      setLoading(true);
      if (localStorage.getItem("userId") !== id) {
        Swal.fire({
          title: "Do you want to delete the user?",
          showDenyButton: true,
          confirmButtonText: "Yes",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await axiosInstance.delete(
              `${process.env.REACT_APP_BASE_URL}/admin/${id}`
            );
            notification.success({
              message: "Admin deleted successfully",
            });
            fetchAllAdmins();
          }
        });
      } else {
        notification.error({
          message: "Admin can't delete their own profile",
        });
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

  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  const handleOk = async (data) => {
    try {
      await axiosInstance.post(`${process.env.REACT_APP_BASE_URL}/admin`, data);
      notification.success({
        message: "Admin created successfully",
      });
      fetchAllAdmins();
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
        `${process.env.REACT_APP_BASE_URL}/admin/${value?._id}`,
        value
      );
      notification.success({
        message: "Admin updated successfully",
      });
      fetchAllAdmins();
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEdit({ ...edit, status: false, data: "" });
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
            <EditAdmin
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
          <AdminRegister onOk={handleOk} onCancel={handleCancel} />
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
                title: (
                  <span
                    style={{ cursor: "pointer" }}
                    onClick={() => navigate(`/`)}
                  >
                    Home
                  </span>
                ),
              },
              {
                title: "Admin Details",
              },
            ]}
          />
        </div>
        <div
          style={{
            margin: "10px 0px 10px 0px",
            display: "flex",
            alignItems: "center",
            justifyContent: "flex-end",
          }}
        >
          <Button
            className="register-button"
            style={{
              display: "flex",
              alignItems: "center",
            }}
            onClick={() => setOpen(true)}
          >
            <AddIcon className="mr-2" /> Create Admin
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

export default AdminDetails;
