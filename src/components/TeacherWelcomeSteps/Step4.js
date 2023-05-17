import React, { useContext, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Input, Table, Select } from "antd";
import { Form } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { addNewUsers } from "store/action";
import { useDispatch } from "react-redux";
import { debounce } from "lodash";
import { DeleteOutlined } from "@ant-design/icons";

const EditableContext = React.createContext(null);

const Step4 = props => {
  const {
    handleNextNewUser,
    handleBackNewUser,
    studentList,
    selectedClass,
  } = props;
  const dispatch = useDispatch();

  const { addNewStudentsLoading } = useSelector(({ user }) => user);

  // const [selectedClass, setSelectedClass] = useState("");

  const [isAtLeastStdError, setIsAtLeastStdError] = useState(false);

  // useEffect(() => {
  //   if (studentList.length) {
  //     const commonClassCode = studentList[0].profile.class_code;
  //     setSelectedClass(commonClassCode);
  //   }
  // }, []); // eslint-disable-line

  const EditableRow = ({ index, ...props }) => {
    const [form] = Form.useForm();
    return (
      <Form form={form} component={false}>
        <EditableContext.Provider value={form}>
          <tr {...props} />
        </EditableContext.Provider>
      </Form>
    );
  };

  const EditableCell = ({
    title,
    editable,
    children,
    dataIndex,
    record,
    handleSave,
    ...restProps
  }) => {
    const [editing, setEditing] = useState(false);
    const [isDuplicateUserName, setIsDuplicateUserName] = useState(false);
    const [isSpecialCharError, setIsSpecialCharError] = useState(false);
    const [isPasswordValidError, setIsPasswordValidError] = useState(false);
    const [isSpecialCharExAphoHyPh, setIsSpecialCharExAphoHyPh] = useState(
      false,
    );

    const [editStudent, setEditStudent] = useState({});

    const inputRef = useRef(null);
    const form = useContext(EditableContext);
    useEffect(() => {
      if (editing) {
        inputRef.current.focus();
      }
    }, [editing]);
    const toggleEdit = () => {
      setEditing(!editing);
      if (
        dataIndex === "first_name" ||
        dataIndex === "last_name" ||
        dataIndex === "mode"
      ) {
        form.setFieldsValue({
          [dataIndex]: record.profile[dataIndex],
        });
      } else {
        form.setFieldsValue({
          [dataIndex]: record[dataIndex],
        });
      }
    };

    const save = async () => {
      try {
        const values = await form.validateFields();
        console.log("🚀 ~ file: Step4.js:97 ~ save ~ record", record);

        console.log("🚀 ~ file: Step4.js:88 ~ save ~ values", values);
        toggleEdit();
        if (
          Object.keys(values)[0] === "first_name" ||
          Object.keys(values)[0] === "last_name" ||
          Object.keys(values)[0] === "mode"
        ) {
          if (!isSpecialCharError) {
            let updateProfile = { ...record.profile, ...values };
            record.profile = updateProfile;
            handleSave({
              ...record,
            });
          }
        } else {
          if (
            !isDuplicateUserName &&
            !isSpecialCharError &&
            !isPasswordValidError
          ) {
            handleSave({
              ...record,
              ...values,
            });
          }
        }
      } catch (errInfo) {
        console.log("Save failed:", errInfo);
      }
    };
    const checkDuplicateUserName = debounce(event => {
      setEditStudent(record);
      if (
        dataIndex === "user_name" &&
        studentList.filter(
          item =>
            editStudent.key !== item.key &&
            item.user_name === event.target.value,
        ).length > 0
      ) {
        setIsDuplicateUserName(true);
      } else {
        setIsDuplicateUserName(false);
      }

      //: For all special
      //: /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]
      //: below regex hyphens and apostrophes remove
      const specialCharsExAphoHyPh = /[`!@#$%^&*()_+\=\[\]{};:"\\|.<>\/?~]/; //eslint-disable-line

      const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|.<>\/?~]/; //eslint-disable-line

      if (
        (dataIndex === "first_name" || dataIndex === "last_name") &&
        specialCharsExAphoHyPh.test(event.target.value)
      ) {
        setIsSpecialCharExAphoHyPh(true);
      } else {
        setIsSpecialCharExAphoHyPh(false);
      }

      if (dataIndex === "user_name" && specialChars.test(event.target.value)) {
        setIsSpecialCharError(true);
      } else {
        setIsSpecialCharError(false);
      }

      // Password error handler

      if (dataIndex === "password" && event.target.value.length < 5) {
        setIsPasswordValidError(true);
      } else {
        setIsPasswordValidError(false);
      }
      props.setStudentList(studentList);
    }, 500);
    let childNode = children;
    if (editable) {
      childNode = editing ? (
        <>
          <Form.Item
            style={{
              margin: 0,
            }}
            name={dataIndex}
            rules={[
              {
                required: true,
                message: `${title} is required.`,
              },
            ]}
          >
            <Input
              ref={inputRef}
              onPressEnter={save}
              onBlur={save}
              onChange={checkDuplicateUserName}
              status={
                isSpecialCharError ||
                isPasswordValidError ||
                isDuplicateUserName
                  ? "error"
                  : ""
              }
            />
          </Form.Item>
          {isDuplicateUserName ? (
            <span
              style={{ color: "#ff4d4f", fontSize: "14px", lineHeight: "1" }}
            >
              Username is already assigned to another student.
            </span>
          ) : (
            ""
          )}
          {isSpecialCharError || isSpecialCharExAphoHyPh ? (
            <span
              style={{ color: "#ff4d4f", fontSize: "14px", lineHeight: "1" }}
              className="create-student-error-text"
            >
              Please enter alphabetic and numeric characters only.
            </span>
          ) : (
            ""
          )}
          {isPasswordValidError ? (
            <span
              style={{ color: "#ff4d4f", fontSize: "14px", lineHeight: "1" }}
              className="create-student-error-text"
            >
              Passwords must be at least 5 characters in length.
            </span>
          ) : (
            ""
          )}
        </>
      ) : (
        <div
          className="editable-cell-value-wrap"
          style={{
            paddingRight: 24,
          }}
          onClick={toggleEdit}
        >
          {children}
        </div>
      );
    }
    return <td {...restProps}>{childNode}</td>;
  };

  const handleDelete = key => {
    const newData = props.studentList.filter(item => item.key !== key);
    props.setStudentList(newData);
  };

  const handleSave = row => {
    console.log("🚀 ~ file: Step4.js:193 ~ handleSave ~ row", row);
    const newData = [...props.studentList];
    const index = newData.findIndex(item => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    props.setStudentList(newData);
  };

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // eslint-disable-next-line jsx-a11y/anchor-is-valid
  const defaultColumns = [
    {
      title: "No",
      dataIndex: "key",
      key: "key",
      width: 50,
      render: text => +text + 1,
      align: "center",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
      key: "last_name",
      editable: true,
      align: "center",
      width: 100,
      render: (_, record) => record.profile.last_name,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
      key: "first_name",
      editable: true,
      align: "center",
      width: 100,
      render: (_, record) => record.profile.first_name,
    },
    {
      title: "Username",
      dataIndex: "user_name",
      key: "user_name",
      editable: true,
      width: 100,
      align: "center",
    },
    {
      title: "Password",

      dataIndex: "password",
      key: "password",
      editable: true,
      width: 100,
      align: "center",
    },
    {
      title: "Mode",
      key: "mode",
      align: "center",
      width: 80,
      render: (_, record) => {
        return (
          <>
            {/* {record.profile.student_learning_mode_id === 1 ? "+/- " : "x/÷ "} */}
            <Select
              value={record.profile.student_learning_mode_id}
              bordered={false}
              onChange={value => handleChangeLearningMode(value, record)}
              options={[
                {
                  value: 1,
                  label: "+/-",
                },
                {
                  value: 2,
                  label: "×/÷",
                },
              ]}
            />
          </>
        );
      },
    },

    {
      title: "",
      key: "action",
      width: 50,
      align: "center",
      render: (_, record) => (
        <>
          <DeleteOutlined
            style={{ color: "#f92b2b" }}
            onClick={() => handleDelete(record.key)}
          />
        </>
      ),
    },
  ];

  const columns = defaultColumns.map(col => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: record => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave,
      }),
    };
  });

  const handleChangeLearningMode = (value, record) => {
    const newData = props.studentList.map(std => {
      if (std.key === record.key) {
        return Object.assign({}, std, {
          profile: {
            ...std.profile,
            student_learning_mode_id: value,
          },
        });
      }
      return std;
    });
    props.setStudentList(newData);
  };

  const handleCreateNewUsersSuccess = () => {
    handleNextNewUser();
  };

  const handleNext = () => {
    if (!studentList.length) {
      setIsAtLeastStdError(true);
    } else {
      studentList.map(std => {
        delete std.entered_name;

        return std;
      });
      dispatch(
        addNewUsers({ students: studentList }, handleCreateNewUsersSuccess),
      );
    }
  };
  const handleBack = () => {
    handleBackNewUser();
  };

  return (
    <>
      <div className="step-4">
        <div className="header-text">Edit Student Details</div>
        <div className="header-sub-title-text-1">
          Make any needed changes to the details below.
        </div>
        <div className="header-sub-title-text-2">
          Student details can also be edited at any time on the teacher
          dashboard by clicking the edit icon on the student’s line.
        </div>
        <div className="class-selection-dropdown">
          <span>{`${selectedClass.name} - ${selectedClass.class_code}`}</span>
        </div>

        <div className="student-list-table-wrapper">
          <Table
            components={components}
            rowClassName={() => "editable-row"}
            dataSource={studentList}
            columns={columns}
            pagination={false}
            scroll={{ y: "calc(100vh - 650px)" }}
          />
        </div>

        {isAtLeastStdError && (
          <span className="create-student-error-text">
            Please at least add one student.
          </span>
        )}
      </div>
      <div className="welcome-step-popup-footer">
        <div className="back-nav-btn" onClick={handleBack}>
          <ArrowLeftOutlined /> Back
        </div>
        <div className="next-nav-btn" onClick={handleNext}>
          {addNewStudentsLoading ? (
            "Adding Students..."
          ) : (
            <>
              Next <ArrowRightOutlined />
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default Step4;
