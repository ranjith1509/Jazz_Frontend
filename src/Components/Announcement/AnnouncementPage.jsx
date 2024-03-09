import {
  Breadcrumb,
  Button,
  Input,
  Modal,
  Pagination,
  Spin,
  Table,
  notification,
} from "antd";
import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../HOC/Interceptor";

const Announcement = () => {
  const navigate = useNavigate();
  const { TextArea } = Input;
  const [state, setState] = useState({
    percentage: "",
    arrears_count: "",
    department: "",
  });
  const [data, setData] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState([]);
  const [emailModal, setEmailModal] = useState(false);
  const [totalRecords, setTotalRecords] = useState();
  const [content, setContent] = useState("");

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
    {
      title: "Percentage",
      dataIndex: "percentage",
      sorter: {
        compare: (a, b) => a.percentage - b.percentage,
        multiple: 2,
      },
    },
    {
      title: "No. of Arrears",
      dataIndex: "arrears_count",
      sorter: {
        compare: (a, b) => a.arrears_count - b.arrears_count,
        multiple: 1,
      },
    },
  ];

  useEffect(() => {
    fetchAllUsers();
  }, [page, pageSize]); // eslint-disable-line

  const fetchAllUsers = async (data) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/announcement?page=${page}&rows=${pageSize}`,
        data
      );
      let tempValue = response?.data?.users?.map((dt, index) => {
        // Adding 1 to index to start from 1 instead of 0
        return { ...dt, key: index + 1 };
      });
      setData(tempValue);
      setTotalRecords(response?.data?.totalRecords);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      let emailID = selectedRows.map((dt) => dt.email);
      setEmail(emailID);
    },
  };

  const handlePageSizeChange = (newPage, newPageSize) => {
    setPageSize(newPageSize);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      fetchAllUsers(state);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setState({
      percentage: "",
      arrears_count: "",
      department: "",
    });
    fetchAllUsers({
      percentage: "",
      arrears_count: "",
      department: "",
    });
  };

  const handleEmail = () => {
    setEmailModal(true);
  };

  const handleEmailSend = async () => {
    try {
      setLoading(true);
      setEmailModal(false);
      await axiosInstance.post(
        `${process.env.REACT_APP_BASE_URL}/announcement/email`,
        {
          to: email,
          text: content,
        }
      );
      setContent("");
      setEmail([]);
      setState({
        percentage: "",
        arrears_count: "",
        department: "",
      });
      notification.success({
        message: "Email sent successfully",
      });
      navigate(`/announcement`);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
      // window.location.reload(true);
    }
  };

  return (
    <Fragment>
      <Spin spinning={loading}>
        <Modal
          visible={emailModal}
          onCancel={() => setEmailModal(false)}
          footer={null}
        >
          <div style={{ padding: "50px 20px 20px 20px" }}>
            <TextArea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={15}
            />
          </div>
          <div className="send-button">
            <Button
              onClick={() => {
                setEmail([]);
                setEmailModal(false);
              }}
              className="send-button"
            >
              Cancel
            </Button>
            <Button onClick={handleEmailSend} className="send-button">
              Send
            </Button>
          </div>
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
                title: "Announcement",
              },
            ]}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="announcement-filter">
            <div className="filter-label">
              <label className="label">Percenatge</label>
              <Input
                value={state.percentage || ""}
                onChange={(e) =>
                  setState({ ...state, percentage: parseInt(e.target.value) })
                }
              />
            </div>
            <div className="filter-label">
              <label className="label">No. of Arrears</label>
              <Input
                value={state.arrears_count || ""}
                onChange={(e) =>
                  setState({
                    ...state,
                    arrears_count: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="filter-label">
              <label className="label">Department</label>
              <Input
                value={state.department || ""}
                onChange={(e) =>
                  setState({ ...state, department: e.target.value })
                }
              />
            </div>
            <div className="filter-button">
              <Button onClick={handleCancel} className="filter-button">
                Clear
              </Button>
              <Button className="filter-button" onClick={handleSubmit}>
                Submit
              </Button>
            </div>
            <div>
              <Button
                onClick={handleEmail}
                disabled={email?.length === 0}
                className="filter-button"
              >
                Send Email
              </Button>
            </div>
          </div>
        </div>

        <div>
          {" "}
          <Table
            rowSelection={{
              type: "checkbox",
              ...rowSelection,
            }}
            columns={columns}
            dataSource={data}
            pagination={false}
          />
          <Pagination
            className="mt-2"
            current={page}
            pageSize={pageSize}
            total={totalRecords}
            onChange={handlePageChange}
            onShowSizeChange={handlePageSizeChange}
            showSizeChanger={true}
          />
        </div>
      </Spin>
    </Fragment>
  );
};

export default Announcement;
