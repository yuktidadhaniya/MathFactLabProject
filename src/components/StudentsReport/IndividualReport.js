import React, { useEffect, useRef, useState } from "react";
import moment from "moment";
import logoImg from "assets/images/logo.svg";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useSelector, useDispatch } from "react-redux";
import { Table, Card } from "antd";
import { getStudentIndividualReport } from "store/action";
import useOnClickOutside from "hooks/Backdrop";
import { addSubLevelList, mulSubLevelList } from "config/const";
import { PrinterOutlined, DownloadOutlined } from "@ant-design/icons";
// import Select from "components/ReactSelect";
import Loader from "components/Loader";

function IndividualReport(props) {
  const { students, fromDate, toDate } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStudentIndividualReport(students.join(","), fromDate, toDate));
  }, [dispatch, students]); // eslint-disable-line
  //  Create a ref that we add to the element for which we want to detect outside clicks
  const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  useOnClickOutside(ref, () => console.log("close"));

  const { studentIndividual, fetchingStudentIndividualLoading } = useSelector(
    ({ user }) => user,
  );

  //generated data required as per table
  const userListOption = studentIndividual
    .map(user => {
      return {
        label: `${user.last_name}, ${user.first_name}`,
        value: user.user_id,
      };
    })
    .sort((a, b) => a.label.localeCompare(b.label));

  const [selectUser, setSelectUser] = useState("");

  useEffect(() => {
    if (studentIndividual.length > 0) {
      setSelectUser(userListOption[0].value);
    }
  }, [studentIndividual.length, fetchingStudentIndividualLoading]); // eslint-disable-line

  const selectedUserDetails = studentIndividual.find(
    data => data.user_id === selectUser,
  );

  const handleChangeClassCode = value => {
    setSelectUser(value);
  };
  const handleCloseStudentDeleteDailog = () => {
    props.handleCloseReport();
  };

  const columns = [
    {
      title: "Date",
      dataIndex: "created_at",
      align: "center",
      width: "100px",
      render: (value, row, index) => {
        return value ? moment(value).format("DD MMM YY") : "-";
      },
    },
    {
      title: "Total Minutes",
      align: "center",
      dataIndex: "time_taken_in_min",
      width: "80px",
    },
    {
      title: "Total Completed Activities",
      align: "center",
      dataIndex: "total_completed_activities",
      width: "100px",
    },

    {
      title: "Beginning Level",
      align: "center",
      dataIndex: "starting_level_index",
      width: "100px",
      render: (value, row, index) => {
        return row.student_learning_mode_id === 1
          ? value && value !== "undefined"
            ? `${addSubLevelList[value].sort} ${addSubLevelList[value].descriptors}`
            : "-"
          : value && value !== "undefined"
          ? `${mulSubLevelList[value].sort} ${mulSubLevelList[value].descriptors}`
          : "-";
      },
    },
    {
      title: "Ending Level",
      align: "center",
      dataIndex: "ending_level_index",
      width: "80px",
      render: (value, row, index) => {
        return row.student_learning_mode_id === 1
          ? value && value !== "undefined"
            ? `${addSubLevelList[value].sort} ${addSubLevelList[value].descriptors}`
            : "-"
          : value && value !== "undefined"
          ? `${mulSubLevelList[value].sort} ${mulSubLevelList[value].descriptors}`
          : "-";
      },
    },

    {
      title: "Level Lifters Passes/Attempts",
      align: "center",
      dataIndex: "assigned_level_id",
      width: "100px",
      render: (value, row, index) => {
        return `${row.total_completed_level_lifter}/${row.total_level_lifter}`;
      },
    },
  ];

  function headRows() {
    return [
      {
        sr: "No.",
        created_at: "Date",
        time_taken_in_min: "Total Minutes",
        total_completed_activities: "Total Completed Activities",
        starting_level_index: "Beginning Level",
        ending_level_index: "Ending Level",
        assigned_level_id: "Level Lifters Passes/Attempts",
      },
    ];
  }

  function bodyRows(reportData) {
    var body = [];

    reportData.forEach((data, i) => {
      body.push({
        sr: i + 1,
        created_at: moment(data.created_at).format("DD MMM YY"),
        time_taken_in_min: data.time_taken_in_min,
        total_completed_activities: data.total_completed_activities,
        starting_level_index:
          data.student_learning_mode_id === 1
            ? data.starting_level_index
              ? `${addSubLevelList[data.starting_level_index].sort} ${
                  addSubLevelList[data.starting_level_index].descriptors
                }`
              : "-"
            : data.starting_level_index
            ? `${mulSubLevelList[data.starting_level_index].sort} ${
                mulSubLevelList[data.starting_level_index].descriptors
              }`
            : "-",
        ending_level_index:
          data.student_learning_mode_id === 1
            ? data.ending_level_index
              ? `${addSubLevelList[data.ending_level_index].sort} ${
                  addSubLevelList[data.ending_level_index].descriptors
                }`
              : "-"
            : data.ending_level_index
            ? `${mulSubLevelList[data.ending_level_index].sort} ${
                mulSubLevelList[data.ending_level_index].descriptors
              }`
            : "-",
        assigned_level_id: `${data.total_completed_level_lifter}/${data.total_level_lifter}`,
      });
    });

    return body;
  }

  const IndividualReportPdf = ({ reportData }) => {
    if (reportData.length) {
      var doc = new jsPDF("p", "mm", "a4");
      reportData.map(data => {
        doc.setFontSize(20);
        doc.text(
          `${data.first_name} ${data.last_name}’s Individual Performance Report`,
          100,
          15,
          "center",
        );
        doc.setFontSize(11);
        doc.setTextColor(100);

        // jsPDF 1.4+ uses getWidth, <1.4 uses .width

        doc.text(`Total Sessions : ${data.sessionDetails.length}`, 14, 25);
        doc.text(
          `Total minutes : ${data.sessionDetails &&
            data.sessionDetails.reduce((a, b) => a + b.time_taken_in_min, 0)}`,
          50,
          25,
        );
        doc.text(
          `+/- Growth : ${
            data.student_learning_mode === 1 && data.sessionDetails.length
              ? `${+data.sessionDetails[0].ending_level_index -
                  +data.sessionDetails[data.sessionDetails.length - 1]
                    .starting_level_index} Levels`
              : "NA"
          }`,
          85,
          25,
        );
        doc.text(
          `x/÷ Growth : ${
            data.student_learning_mode === 2 && data.sessionDetails.length
              ? `${+data.sessionDetails[0].ending_level_index -
                  +data.sessionDetails[data.sessionDetails.length - 1]
                    .starting_level_index} Levels`
              : "NA"
          }`,
          125,
          25,
        );
        doc.text(
          `${moment(fromDate).format("DD MMM YY")} - ${moment(toDate).format(
            "DD MMM YY",
          )}`,
          165,
          25,
        );
        doc.autoTable({
          head: headRows(),
          body: bodyRows(data.sessionDetails),
          startY: 30,
          styles: {
            fontSize: 10,
            halign: "center",
          },
          columnStyles: {
            0: { cellWidth: "auto" },
            1: { cellWidth: 25 },
            2: { cellWidth: "auto" },
            3: { cellWidth: "auto" },
            4: { cellWidth: 35 },
            5: { cellWidth: 35 },
            6: { cellWidth: "auto" },
            // etc
          },
          // showHead: "firstPage"
        });
        doc.addPage();
        return true;
      });
      doc.save(`${reportData.length} Report.pdf`);
    } else {
      alert("There isn't any data to generate report!");
    }
  };

  const handlePrint = () => {
    IndividualReportPdf({
      reportData: studentIndividual,
    });
  };

  const totalTime =
    selectedUserDetails &&
    selectedUserDetails.sessionDetails.reduce(
      (a, b) => a + b.time_taken_in_min,
      0,
    );

  const studentCompletedSessions =
    selectedUserDetails &&
    selectedUserDetails.sessionDetails.filter(session => session.status === 1);
  return (
    <section className="individual-report-main-wrapper-layout">
      <div
        className={
          props.visible
            ? "custom-popup open individual-report-main-wrapper ease-in-popup"
            : "custom-popup  individual-report-main-wrapper ease-in-popup"
        }
      >
        <div className="popup">
          {studentIndividual.length <= 0 ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "calc(100vh - 244px)",
                width: "100%",
              }}
            >
              <Loader />
            </div>
          ) : (
            <div className="drawer-container ">
              <div className="left-content">
                <div className="student-list-header">Student :</div>
                <div className="user-list-right-side">
                  {userListOption.length &&
                    userListOption.map(user => {
                      return (
                        <div
                          key={user.value}
                          className={`user-list-item ${
                            selectUser === user.value ? "selected" : ""
                          }`}
                          onClick={() => handleChangeClassCode(user.value)}
                        >
                          {user.label}
                        </div>
                      );
                    })}
                </div>
              </div>
              <div className="right-content">
                <div className="popup-header">
                  <div className="top-header">
                    <div className="app-logo">
                      <img
                        src={logoImg}
                        className=" md"
                        alt="Math Fact Lab"
                        key="logo-small"
                      />
                    </div>
                    <div>
                      {/* <div className="student-select">
                        <Select
                          name="learningMode"
                          className="form-control"
                          value={selectUser}
                          options={userListOption}
                          onChange={handleChangeClassCode}
                          style={{ width: 260 }}
                        >
                          {userListOption}
                        </Select>
                      </div> */}
                      <span
                        className="close"
                        onClick={() => handleCloseStudentDeleteDailog()}
                      >
                        &times;
                      </span>
                    </div>
                  </div>
                  <div className="popup-header-top mb-0 pb-0">
                    <div className="popup-header-left">
                      <h2 className="popup-title">
                        {selectedUserDetails && selectedUserDetails.first_name}{" "}
                        {selectedUserDetails && selectedUserDetails.last_name}
                        ’s Individual Performance Report{" "}
                      </h2>
                      <div className="popup-header-bottom">
                        <div className="legend-wrap">
                          Total Sessions :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {selectedUserDetails &&
                              selectedUserDetails.sessionDetails.length}
                          </span>
                        </div>
                        <div className="legend-wrap">
                          Total minutes :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {totalTime}
                          </span>
                        </div>
                        <div className="legend-wrap">
                          +/- Growth :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {studentCompletedSessions &&
                            studentCompletedSessions.length &&
                            selectedUserDetails.student_learning_mode === 1
                              ? `${+studentCompletedSessions[0]
                                  .ending_level_index -
                                  +studentCompletedSessions[
                                    studentCompletedSessions.length - 1
                                  ].starting_level_index} Levels`
                              : "NA"}
                          </span>
                        </div>
                        <div className="legend-wrap">
                          x/÷ Growth :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {studentCompletedSessions &&
                            studentCompletedSessions.length &&
                            selectedUserDetails.student_learning_mode === 2
                              ? `${+studentCompletedSessions[0]
                                  .ending_level_index -
                                  +studentCompletedSessions[
                                    studentCompletedSessions.length - 1
                                  ].starting_level_index} Levels`
                              : "NA"}
                          </span>
                        </div>
                        <div className="legend-wrap">
                          Assignments :{" "}
                          <span className="legend-wrap-subtitle-bold">
                            {studentCompletedSessions &&
                            studentCompletedSessions.length
                              ? `${selectedUserDetails.total_completed_assignment}/${selectedUserDetails.total_assignment}`
                              : "0 / 0"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="popup-header-right">
                      <div className="popup-time">
                        <i className="icon-calender"></i>{" "}
                        {moment(fromDate).format("DD MMM YY")} -{" "}
                        {moment(toDate).format("DD MMM YY")}
                      </div>
                      <div className="popup-time">
                        <PrinterOutlined
                          style={{
                            color: "#2B95F9",
                            fontSize: "22px",
                            marginRight: "20px",
                            cursor: "pointer",
                          }}
                          onClick={() => handlePrint()}
                        />
                        {"  "}{" "}
                        <DownloadOutlined
                          onClick={() => handlePrint()}
                          style={{
                            color: "#2B95F9",
                            fontSize: "22px",
                            cursor: "pointer",
                          }}
                        />{" "}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="popup-content">
                  <div className="popup-content-inner">
                    <div className={"popup-box-wrapper mfl-top-less"}>
                      <Card className="report-session-table-wrapper pb-0">
                        <Table
                          rowClassName={(record, index) =>
                            index % 2 === 0
                              ? "table-row-light"
                              : "table-row-dark"
                          }
                          columns={columns}
                          dataSource={
                            (selectedUserDetails &&
                              selectedUserDetails.sessionDetails) ||
                            []
                          }
                          bordered
                          pagination={false}
                          loading={fetchingStudentIndividualLoading}
                          headerClassName={"ant-table-blue-header"}
                          scroll={{ y: "calc(100vh - 460px)" }}
                          render={() => <>mathfact</>}
                        ></Table>
                      </Card>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* </Modal> */}
        </div>
      </div>
    </section>
  );
}

export default IndividualReport;
