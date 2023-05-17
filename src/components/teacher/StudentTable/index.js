import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Table, Tag, Typography } from "antd";
import Section from "components/Section";
import Container from "components/Container";
import { Modal, Row, Col, message } from "antd";
import ReactGA from "react-ga";
import { updateTeacherPassword } from "store/action";
import TeacherDialog from "components/TeacherDialog";
import ErrorBoundary from "components/ErrorBoundary";
import { useSelector } from "react-redux";

import { useDispatch } from "react-redux";
import { getTeachers, deleteTeachers } from "toolkit/slice/teachers";
import "assets/sass/components/button-ant.scss";
import moment from "moment";
import {
  PlusOutlined,
  CloseOutlined,
  CheckOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button } from "antd";

import { EditOutlined } from "@ant-design/icons";

const { Title } = Typography;

// moment fromnow text changes
moment.updateLocale("en", {
  relativeTime: {
    s: "Seconds",
  },
});

export default function StudentTable(props) {
  const dispatch = useDispatch();

  // const { addNewClassCodeLoading, editClassCodeDetailsLoading } = useSelector(

  // );
  // const { userDetails } = useSelector(({ auth }) => auth);
  const {
    teachers,
    fetchTeachersLoading,
    deleteTeacherCodeLoading,
  } = useSelector(({ teachers }) => teachers);
  const defaultValues = {
    last_name: "",
    first_name: "",
    is_admin_verified: "",
    is_email_verified: "",
  };
  const {
    handleSubmit: passwordHandleSubmit,
    errors: passwordErrors,
    watch: passwordWatch,
    register: passwordRegister,
    reset,
  } = useForm({
    defaultValues,
  });
  const [filteredInfo, setFilteredInfo] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTeacherList, setActiveTeacherList] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [isPassWord, setIsPassWord] = useState(false);
  // const [showDeleteClassCodeDialog, setShowDeleteClassCodeDialog] = useState();
  console.log("activeTeacherList", activeTeacherList);
  const [isShowTeacherDeleteDialog, setIsShowTeacherDeleteDialog] = useState(
    false,
  );

  const [openModal, setOpenModal] = useState(false);
  const searchText = "";

  //Default set last name ascend order
  const [sortedInfo, setSortedInfo] = useState({
    column: {
      title: "Last Name",

      dataIndex: "last_name",
      key: "last_name",

      align: "center",
      showSorterTooltip: false,
    },

    // columnKey: "name1",
    // field: "name1",
    columnKey: "last_name",
    field: "last_name",
    order: "ascend",
  });

  useEffect(() => {
    !teachers.length && dispatch(getTeachers());
  }, []); // eslint-disable-line
  // useEffect(()=>{
  //   dispatch(teacherEdit())
  // })
  //   // const [sortedInfo, setSortedInfo] = useState({});
  const handleChangeTable = (pagination, filters, sorter) => {
    setFilteredInfo(filters);
    setSortedInfo(sorter);
  };
  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };
  const handleUpdatePasswordForm = data => {
    console.log("data11111: ", data);
    const { new_password } = data;

    const body = {
      new_password,
    };

    dispatch(updateTeacherPassword(body))
      .then(() => {
        message.success("Your password change successfully.");
      })
      .catch(() => {
        message.error("Old password is not valid.");
      });
  };
  const studentUserList = [];

  const selectedClassCode = "";
  // const [filterColumn, setFilterColumn] = useState([]);

  //reset selected row id after edit

  const handleAddTeacherName = () => {
    setIsModalOpen(true);
  };
  const handleCloseTeacherCodeDialog = () => {
    setIsModalOpen(false);
    setIsEditMode(false);
  };

  const handleShowEditTeacherCodePopup = record => {
    setIsEditMode(true);
    setIsModalOpen(true);
    setActiveTeacherList(record);
  };
  const handlePasswordCodePopup = () => {
    setIsPassWord(true);
  };
  const handleClosePassword = () => {
    setIsPassWord(false);
  };

  const handleCloseDeleteTeacherPopup = activeTeacherList => {
    setIsShowTeacherDeleteDialog(false);
  };
  const handleShowTeacherPopup = record => {
    console.log("record: ", record);

    setActiveTeacherList(record);
    handleConfirmDeleteClass(record);
  };

  const handleConfirmDeleteClass = activeTeacherList => {
    Modal.confirm({
      title: (
        <>
          <span style={{ fontWeight: "500" }}>
            Are you sure you wish to delete ClassName?
          </span>
        </>
      ),
      width: 500,
      icon: <DeleteOutlined style={{ color: "#fa1414" }} />,
      okText: "Delete",
      cancelText: "Cancel",
      maskClosable: true,
      okButtonProps: { size: "small", type: "danger" },
      cancelButtonProps: { size: "small" },

      onOk() {
        dispatch(
          deleteTeachers(activeTeacherList.id, handleCloseDeleteTeacherPopup),
        );
        if (
          process.env.REACT_APP_ENV !== "development" ||
          process.env.REACT_APP_ENV !== "staging"
        ) {
          ReactGA.event({
            category: "Teacher Class Event",
            action: `Teacher deleted class`,
            label: "Teacher Dashboard",
          });
        }
      },
    });
  };
  if (searchText) {
    const updateStudentList = updatedStudentList.filter(std => {
      console.log("std: ", std);
      return (
        std.profile.last_name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        std.profile.first_name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        std.is_admin_verified.includes(searchText.toLowerCase()) ||
        std.is_email_verified.includes(searchText.toLowerCase())
        // std.profile.user_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    updatedStudentList = updateStudentList;
  }
  if (selectedClassCode) {
    const updateStudentList = updatedStudentList.filter(std => {
      {
        console.log("std: ", std);
      }

      return (
        std.profile.first_name.toLowerCase().includes(selectedClassCode),
        std.profile.last_name.toLowerCase().includes(selectedClassCode),
        std.is_admin_verified.includes(selectedClassCode),
        std.is_email_verified.includes(selectedClassCode)
      );
    });
    updatedStudentList = updateStudentList;
  }
  let updatedStudentList = studentUserList;
  console.log("updatedStudentList: ", updatedStudentList);

  const columns = [
    {
      title: "First Name",
      dataIndex: "profile.first_name",
      key: "profile.first_name",
      align: "left",
      showSorterTooltip: false,
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortOrder:
        sortedInfo.columnKey === "profile.first_name" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.profile.first_name}</div>,
        };
      },
    },
    {
      title: "Last Name",
      dataIndex: "profile.last_name",
      key: "profile.last_name",
      align: "left",
      showSorterTooltip: false,
      sorter: (a, b) => a.last_name.localeCompare(b.last_name),
      sortOrder:
        sortedInfo.columnKey === "profile.last_name" && sortedInfo.order,
      render(text, record) {
        return {
          children: <div>{record.profile.last_name}</div>,
        };
      },
    },
    {
      title: "Email",
      dataIndex: "user_name",
      key: "user_name",
      align: "center",
      showSorterTooltip: false,
      sorter: (a, b) => a.user_name.localeCompare(b.user_name),
      sortOrder: sortedInfo.columnKey === "user_name" && sortedInfo.order,
    },
    {
      title: "is_email_verified",
      dataIndex: "is_email_verified",
      key: "is_email_verified",
      align: "center",
      render(text, record) {
        return {
          children: (
            <div>
              {record.is_email_verified === 0 ? (
                <CloseOutlined />
              ) : (
                <CheckOutlined />
              )}
            </div>
          ),
        };
      },
    },
    {
      title: "is_admin_verified",
      dataIndex: "is_admin_verified",
      key: "is_admin_verified",
      align: "center",

      render(text, record) {
        return {
          children: (
            <div>
              {record.is_admin_verified === 0 ? (
                <CloseOutlined />
              ) : (
                <CheckOutlined />
              )}
            </div>
          ),
        };
      },
    },
    {
      title: "Last updated ",
      dataIndex: "updated_at",
      key: "updated_at",
      align: "center",
      sorter: (a, b) => new Date(a.updated_at) - new Date(b.updated_at),
      sortOrder: sortedInfo.columnKey === "updated_at" && sortedInfo.order,
      showSorterTooltip: false,

      render(text, record) {
        return {
          children: (
            <div>
              {record.profile.updated_at
                ? moment(record.profile.updated_at).fromNow()
                : ""}
            </div>
          ),
        };
      },
    },
    {
      title: "Password",
      dataIndex: "Password",
      key: "Password",
      align: "center",
      render(text, record) {
        return {
          children: (
            <button
              type="button"
              className="btn-icon-trans edit"
              onClick={() => handlePasswordCodePopup(record)}
            >
              {/* <i className="icon-edit" aria-hidden="true"></i> */}
              <EditOutlined />
            </button>
          ),
        };
      },
    },
    {
      title: "Edit",
      dataIndex: "edit",
      key: "edit",
      align: "center",
      render(text, record) {
        return {
          children: (
            <button
              type="button"
              className="btn-icon-trans edit"
              onClick={() => handleShowEditTeacherCodePopup(record)}
            >
              {/* <i className="icon-edit" aria-hidden="true"></i> */}
              <EditOutlined />
            </button>
          ),
        };
      },
    },
    {
      title: "Delete",
      dataIndex: "delete",
      key: "delete",
      align: "center",
      render(text, record) {
        return {
          children: (
            <button
              type="button"
              className="btn-icon-trans delete"
              onClick={() => handleShowTeacherPopup(record)}
            >
              {/* <i className="icon-delete" aria-hidden="true"></i> */}
              <DeleteOutlined />
            </button>
          ),
        };
      },
    },
  ];

  return (
    <>
      <Container fluid>
        <Section
          title={
            <div style={{ display: "grid", gridTemplateColumns: "auto auto" }}>
              <Title level={4} className={"tab-heading"}>
                All Teachers
                <span className="table-header-counter">
                  <Tag> {teachers?.length}</Tag>
                </span>
              </Title>
            </div>
          }
          extra={
            <div className="google-classroom-section">
              <Button
                type="primary"
                size="small"
                onClick={handleAddTeacherName}
                className="joyride-2"
              >
                Add Teacher <PlusOutlined />
              </Button>
            </div>
          }
        >
          {/* <ErrorBoundary>
          <TeacherTable
            showEditClassCodeDialog={handleShowEditClassCodePopup}
            // searchText={searchText}
            // classCodeList={updatedClassCodeList}
          />
        </ErrorBoundary> */}
          {isModalOpen ? (
            <ErrorBoundary>
              <TeacherDialog
                open={isModalOpen}
                closeClassCodePopup={handleCloseTeacherCodeDialog}
                isEditMode={isEditMode}
                activeTeacherList={activeTeacherList}
                studentUserList={updatedStudentList}
                loading={deleteTeacherCodeLoading}
                closePasswordPopup={handleClosePassword}

                // showDeleteClassCodeDialog={handleShowDeleteClassCodePopup}

                // loading={addNewClassCodeLoading || editClassCodeDetailsLoading}
                // title={isEditMode ? "Edit Class " : "New Class"}
              />
            </ErrorBoundary>
          ) : (
            ""
          )}

          <Table
            columns={columns}
            dataSource={teachers}
            onChange={handleChangeTable}
            loading={fetchTeachersLoading}
            scroll={{ y: "calc(100vh - 300px)", x: "1150" }}
            pagination={false}
            size="middle"
          />
        </Section>
      </Container>
      <Modal
        title="Password"
        open={isPassWord}
        onOk={handleClosePassword}
        onCancel={handleClosePassword}
      >
        <div className="form-group">
          <div className="form-input">
            <form
              name="update-password-form"
              onSubmit={passwordHandleSubmit(handleUpdatePasswordForm)}
              className="user-profile-wrapper"
            >
              <div className="popup-content">
                <div>
                  <Row gutter={30}>
                    <Col lg={12} xs={12}>
                      <div className="form-group">
                        <div
                          className={
                            passwordErrors.old_password &&
                            (passwordErrors.old_password.type === "required" ||
                              passwordErrors.old_password.type === "pattern")
                              ? "form-input input-error"
                              : "form-input "
                          }
                        ></div>
                      </div>
                    </Col>
                  </Row>
                  <Row gutter={30}>
                    <Col lg={12} xs={12}>
                      <div className="form-group">
                        <div
                          className={
                            (passwordErrors.new_password &&
                              passwordErrors.new_password.type ===
                                "required") ||
                            (passwordErrors.new_password &&
                              passwordErrors.new_password.type === "pattern")
                              ? "form-input input-error"
                              : "form-input "
                          }
                        >
                          <label className="input-label" htmlFor="new_password">
                            New Password
                          </label>
                          <div className="input-wrap">
                            <input
                              type={
                                showPassword &&
                                activeInputFieldID === "new_password"
                                  ? "text"
                                  : "password"
                              }
                              id="new_password"
                              className={
                                passwordWatch("new_password") &&
                                passwordErrors.new_password &&
                                passwordErrors.new_password.type !== "pattern"
                                  ? "form-control"
                                  : "form-control input-error"
                              }
                              placeholder=" new password"
                              name="new_password"
                              ref={passwordRegister({
                                required: true,
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                              })}
                            />
                            <i
                              className={
                                showPassword &&
                                activeInputFieldID === "new_password"
                                  ? "icon-hide show-password-icon"
                                  : "icon-view show-password-icon"
                              }
                              aria-hidden="true"
                              onClick={() =>
                                handleToggleShowPassword("new_password")
                              }
                            ></i>
                          </div>
                          {passwordErrors.new_password &&
                            passwordErrors.new_password.type === "required" && (
                              <span className="error">
                                Please enter new password.
                              </span>
                            )}
                          {passwordErrors.new_password &&
                            passwordErrors.new_password.type === "pattern" && (
                              <span className="error">
                                Required: 8 characters, including
                                UPPER/lowercase and numeric.
                              </span>
                            )}
                        </div>
                      </div>
                    </Col>
                    <Col lg={12} xs={12}>
                      <div className="form-group">
                        <div
                          className={
                            (passwordErrors.confirm_password &&
                              passwordErrors.confirm_password.type ===
                                "required") ||
                            (passwordWatch("new_password") &&
                              passwordWatch("confirm_password") &&
                              passwordWatch("new_password") !==
                                passwordWatch("confirm_password"))
                              ? "form-input input-error"
                              : "form-input"
                          }
                        >
                          <label
                            className="input-label"
                            htmlFor="confirm_password"
                          >
                            Confirm Password
                          </label>
                          <div className="input-wrap">
                            <input
                              type={
                                showPassword &&
                                activeInputFieldID === "confirm_password"
                                  ? "text"
                                  : "password"
                              }
                              id="confirm_password"
                              className={
                                passwordWatch("confirm_password")
                                  ? "form-control"
                                  : "form-control input-error"
                              }
                              placeholder="Confirm password"
                              name="confirm_password"
                              ref={passwordRegister({
                                required: true,
                                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                              })}
                            />
                            <i
                              className={
                                showPassword &&
                                activeInputFieldID === "confirm_password"
                                  ? "icon-hide show-password-icon"
                                  : "icon-view show-password-icon"
                              }
                              aria-hidden="true"
                              onClick={() =>
                                handleToggleShowPassword("confirm_password")
                              }
                            ></i>
                          </div>
                          {passwordErrors.confirm_password &&
                            passwordErrors.confirm_password.type ===
                              "required" && (
                              <span className="error">
                                Please confirm your new password.
                              </span>
                            )}
                          {passwordErrors &&
                            passwordWatch("new_password") &&
                            passwordWatch("confirm_password") &&
                            passwordWatch("new_password") !==
                              passwordWatch("confirm_password") && (
                              <span className="error">
                                Please make sure the passwords match.
                              </span>
                            )}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}
