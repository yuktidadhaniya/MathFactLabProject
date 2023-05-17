import React, { useState, useEffect } from "react";
import StudentTable from "components/teacher/StudentTable";
import ReactGA from "react-ga";
import StudentDialog from "components/StudentDailog";
import MultipleStudentEditDialog from "components/MultipleStudentEditDialog";
import StudentResetLevelDailog from "components/StudentResetLevelDailog";
import StudentLevelLifterLockDailog from "components/StudentLevelLifterLockDailog";
import StrategyDailog from "components/StrategyDailog";
import StudentStatus from "components/StudentStatusPopup";
import {
  removeUser,
  removeMultipleUser,
  editUser,
  editMultipleUser,
} from "store/action";
import ErrorBoundary from "components/ErrorBoundary";
import StudentReportDailog from "components/StudentReportDailog";
import SessionsDetailsDailog from "components/SessionsDetailsDailog";
import StrategyConfirmationPopup from "components/StrategyConfirmationPopup";
import LevelLifterTestReportDialog from "components/LevelLifterTestFailedReportDailog";
// import CloseAssignmentDailog from "components/CloseAssignmentDailog";

import { userRole } from "config/const";
import { useDispatch, useSelector } from "react-redux";
import {
  getUsersList,
  getClassCodeList,
  // getUsersListFromGoogleClassRoom,
  // removeMultipleUser,
} from "store/action";
import ProgressTablePopup from "components/ProgressTablePopup";
import ProgressLevelTable from "components/ProgressAllLevelTable";
import StudentStatusControllerDialog from "components/StudentStatusControllerDialog";

import { DeleteOutlined, QuestionCircleOutlined } from "@ant-design/icons";
import { Modal } from "antd";
import moment from "moment";
function StudentPage(props) {
  const dispatch = useDispatch();
  const { userDetails } = useSelector(({ auth }) => auth);
  const { searchClassCode: selectedClassCode } = useSelector(
    ({ header }) => header,
  );

  const { studentList: studentUserList } = useSelector(({ user }) => user);

  const { searchText } = useSelector(({ header }) => header);

  const { classCodeList } = useSelector(({ classCode }) => classCode);

  const [isShowSettingDialog, setIsShowSettingDialog] = useState(false);

  const [isShowStudentDailog, setIsShowStudentDailog] = useState(false);
  const [isShowStudentDeleteDailog] = useState(false);
  const [
    isShowMultiStudentEditDailog,
    setIsShowMultiStudentEditDailog,
  ] = useState(false);

  const [isShowStrategyDialog, setIsShowStrategyDialog] = useState(false);
  const [selectedStudentIDList, setSelectedStudentIDList] = useState([]);

  const [
    isShowStudentResetConfirmationDailog,
    setIsShowStudentResetConfirmationDailog,
  ] = useState(false);

  const [
    isShowStudentLevelLifterDailog,
    setIsShowStudentLevelLifterDailogDailog,
  ] = useState(false);

  const [isShowStudentReportDailog, setIsShowStudentReportDailog] = useState(
    false,
  );
  const [
    isShowLevelLifterReportPopup,
    setIsShowLevelLifterReportPopup,
  ] = useState(false);

  const [
    isShowStudentSessionDetailsDailog,
    setIsShowStudentSessionDetailsDailog,
  ] = useState(false);

  const [
    isShowStrategyConfirmationDailog,
    setIsShowStrategyConfirmationDailog,
  ] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [isSelectedStudentIDReset, setIsSelectedStudentIDReset] = useState(
    false,
  );
  const [isShowProgressTable, setShowProgressTable] = useState(false);

  //default set 1 to learning mode
  const [selectedLevelLearningMode, setSelectedLevelLearningMode] = useState(1);

  const [isShowProgressTablePopup, setIsShowProgressTablePopup] = useState(
    false,
  );

  const [
    isShowStudentActivityStatus,
    setIsShowStudentActivityStatus,
  ] = useState(false);

  const [isShowStudentDetails, setIsShowStudentDetails] = useState(false);

  const [activeUser, setActiveUser] = useState(false);

  const [
    activeLevelLifterSubmissionID,
    setActiveLevelLifterSubmissionID,
  ] = useState("");

  const [selectedStrategySlug, setSelectedStrategySlug] = useState("");
  const [isStrategyChecked, setIsStrategyChecked] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageLimit, setPageLimit] = useState(10);

  useEffect(() => {
    !classCodeList.length && dispatch(getClassCodeList());
  }, [classCodeList.length]); // eslint-disable-line

  useEffect(() => {
    const currentDate = moment(userDetails.profile.created_at).format(
      "DD-MM-YYYY",
    );
    if (Object.keys(userDetails)) {
      dispatch(
        getUsersList(
          userRole.STUDENT.role_id,
          currentDate,
          currentDate,
          currentPage,
          pageLimit,
        ),
      );
    }
  }, [currentPage, pageLimit]); // eslint-disable-line

  const handleShowStudentDailog = () => {
    setIsShowStudentDailog(true);
    setIsEditMode(false);
    setActiveUser({});
  };
  // Setting Dialog open
  const handleShowSettingPopup = () => {
    setIsShowSettingDialog(true);
  };
  // Setting Dialog close
  const handleSettingDialog = () => {
    setIsShowSettingDialog(false);
  };

  //Edit Student Dailog Open

  const handleShowEditStudentPopup = activeUser => {
    setIsEditMode(true);
    setIsShowStudentDailog(true);
    setActiveUser(activeUser);
  };

  //Show Student Activity Status

  const handleShowStudentActivityStatusPopup = activeUser => {
    setIsShowStudentActivityStatus(true);
    setActiveUser(activeUser);
  };

  //Close Student Activity Status
  const handleCloseStudentActivityStatusPopup = () => {
    setIsShowStudentActivityStatus(false);
  };

  const handleShowStudentDetailsPopup = activeUser => {
    setIsShowStudentDetails(true);
    setActiveUser(activeUser);
  };

  //Close Student Activity Status
  const handleCloseStudentDetailsPopup = () => {
    setIsShowStudentDetails(false);
  };

  //Close Student Dailog
  const handleCloseStudentDailog = () => {
    setIsShowStudentDailog(false);
  };

  //Show Delete Confirmation Dailog
  const handleShowDeleteStudentPopup = activeUser => {
    setSelectedStudentIDList([]);
    // setIsShowStudentDeleteDailog(false);
    setActiveUser(activeUser);

    Modal.confirm({
      title: (
        <div>
          <p>
            Are you sure you wish to delete{" "}
            <b>
              {activeUser.profile.first_name} {activeUser.profile.last_name}'s
            </b>{" "}
            account?
          </p>
          <p>
            Student data will be erased. Once deleted, this cannot be undone.
          </p>
        </div>
      ),
      icon: <DeleteOutlined style={{ color: "red" }} />,
      okText: "Delete",
      onOk() {
        dispatch(removeUser(activeUser));
        if (
          process.env.REACT_APP_ENV !== "development" ||
          process.env.REACT_APP_ENV !== "staging"
        ) {
          ReactGA.event({
            category: "Teacher Student  Event",
            action: `Teacher deleted class`,
            label: "Teacher Dashboard",
          });
        }
      },
      onCancel() {
        //Close Delete Confirmation Dailog

        setIsSelectedStudentIDReset(!isSelectedStudentIDReset);
      },
    });
  };

  //Close Delete Confirmation Dailog
  // const handleCloseDeleteStudentPopup = activeUser => {
  //   ReactGA.event({
  //     category: "Teacher Student  Event",
  //     action: `Teacher deleted class`,
  //     label: "Teacher Dashboard",
  //   });
  //   setIsShowStudentDeleteDailog(false);
  //   setIsSelectedStudentIDReset(!isSelectedStudentIDReset);
  // };

  //show student  report dialog
  const handleShowStudentReportDailog = activeUser => {
    setIsShowStudentReportDailog(true);

    setActiveUser(activeUser);
  };

  const handleCloseStudentReportDailog = activeUser => {
    setIsShowStudentReportDailog(false);
    setActiveUser({});
  };

  const handleShowStudentResetDailog = row => {
    setActiveUser(row);
    // setIsShowStudentResetConfirmationDailog(true);
    Modal.confirm({
      // title: `Are you sure you want to reassess ${row.profile.first_name} ${
      //   row.profile.last_name
      // } in ${
      //   row.profile.student_learning_mode_id === 1
      //     ? "Addition/Subtraction"
      //     : "Multiplication/Division"
      // }?  If so, all ${
      //   row.profile.student_learning_mode_id === 1
      //     ? "addition/subtraction"
      //     : "multiplication/division"
      // } performance data for this student will be erased.`,
      title: (
        <div>
          <p>
            Are you sure you want to reassess{" "}
            <b>
              {row.profile.first_name} {row.profile.last_name}
            </b>{" "}
            in{" "}
            {row.profile.student_learning_mode_id === 1
              ? "Addition/Subtraction"
              : "Multiplication/Division"}
            ?
          </p>
          <p>
            If so, all{" "}
            <b>
              {" "}
              {row.profile.student_learning_mode_id === 1
                ? "addition/subtraction"
                : "multiplication/division"}{" "}
            </b>
            performance data for this student will be erased.
          </p>
        </div>
      ),
      icon: <QuestionCircleOutlined />,
      okText: "Yes, reassess",
      cancelText: "No, cancel",
      onOk() {
        let body;
        if (row.profile.student_learning_mode_id === 1) {
          body = {
            role_id: 3,
            profile: {
              add_sub_level_id: "",
              mul_div_level_id: row.profile.mul_div_level_id,
              class_code: row.profile.class_code,
              student_learning_mode_id: row.profile.student_learning_mode_id,
            },
          };
        } else {
          body = {
            role_id: 3,

            profile: {
              mul_div_level_id: "",
              add_sub_level_id: row.add_sub_level_id,
              class_code: row.profile.class_code,
              student_learning_mode_id: row.profile.student_learning_mode_id,
            },
          };
        }

        dispatch(editUser(row.id, body));
      },
    });
  };

  const handleCloseStudentResetDailog = () => {
    setActiveUser({});

    setIsShowStudentResetConfirmationDailog(false);
  };

  const handleShowStudentLevelLifterLockDailog = row => {
    setActiveUser(row);
    setIsShowStudentLevelLifterDailogDailog(true);
  };

  const handleCloseStudentLevelLifterLockDailog = () => {
    setActiveUser({});

    setIsShowStudentLevelLifterDailogDailog(false);
  };

  const handleMultiDeleteUser = selectedRowKeys => {
    // setIsShowStudentDeleteDailog(true);
    setSelectedStudentIDList(selectedRowKeys);

    Modal.confirm({
      title: (
        <div>
          <p>
            Are you sure you wish to delete <b>{selectedRowKeys.length}</b>{" "}
            selected student accounts?
          </p>
          <p>
            Student data will be erased. Once deleted, this cannot be undone.
          </p>
        </div>
      ),
      icon: <DeleteOutlined style={{ color: "red" }} />,
      okText: "Delete",
      onOk() {
        if (selectedRowKeys.length) {
          dispatch(removeMultipleUser(selectedRowKeys));
        } else {
          dispatch(removeUser(activeUser));
        }
      },
    });

    // dispatch(removeMultipleUser(ids));
  };

  const handleStartStudenSessionDetailsDailog = row => {
    setIsShowStudentSessionDetailsDailog(true);
    setActiveUser(row);
  };

  const handleCloseStudenSessionDetailsDailog = () => {
    setIsShowStudentSessionDetailsDailog(false);
    setActiveUser({});
  };

  const handleShowLevelLifterReportPopup = (row, learning_mode) => {
    setIsShowLevelLifterReportPopup(true);
    setActiveUser(row);
    setSelectedLevelLearningMode(learning_mode);
  };

  const handleShowLevelLifterReportBySubmissionID = (
    levelLifterSubmissionID,
    learningMode,
  ) => {
    setIsShowLevelLifterReportPopup(true);
    setActiveLevelLifterSubmissionID(levelLifterSubmissionID);
    setSelectedLevelLearningMode(learningMode);
  };

  const handleCloseLevelLifterReportPopup = () => {
    setIsShowLevelLifterReportPopup(false);
    setActiveLevelLifterSubmissionID("");
  };

  const handleMultiEditUserDailog = selectedRowKeys => {
    setSelectedStudentIDList(selectedRowKeys);
    setIsShowMultiStudentEditDailog(true);
  };

  const handleCloseMultipleStudentEditDailog = () => {
    setIsShowMultiStudentEditDailog(false);
    setIsSelectedStudentIDReset(!isSelectedStudentIDReset);
  };

  const handleShowProgressTable = (user, learning_mode) => {
    setActiveUser(user);
    setSelectedLevelLearningMode(learning_mode);
    setIsShowProgressTablePopup(true);
  };

  const handleCloseProgressTable = () => {
    // setActiveUser({});
    setSelectedLevelLearningMode("");
    setIsShowProgressTablePopup(false);
    setShowProgressTable(false);
  };

  const handleShowStrategiesTable = activeUser => {
    setActiveUser(activeUser);

    setIsShowStrategyDialog(true);
  };
  const handleCloseStrategiesTable = () => {
    setIsShowStrategyDialog(false);
  };

  const handleShowDisableStrategyConfirmationPopup = (
    isChecked,
    row,
    strategySlug,
  ) => {
    setActiveUser(row);
    setSelectedStrategySlug(strategySlug);
    setIsShowStrategyConfirmationDailog(true);
    setIsStrategyChecked(isChecked);
  };
  const handleCloseDisableStrategyConfirmationPopup = () => {
    setActiveUser({});
    setIsShowStrategyConfirmationDailog(false);
  };

  const handleShowProgressTablePopup = () => {
    setShowProgressTable(true);
  };

  let updatedStudentList = studentUserList;

  // filter by search bar
  if (searchText) {
    const updateStudentList = updatedStudentList.filter(std => {
      return (
        std.profile.last_name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        std.profile.first_name
          .toLowerCase()
          .includes(searchText.toLowerCase()) ||
        std.profile.user_name.toLowerCase().includes(searchText.toLowerCase())
      );
    });
    updatedStudentList = updateStudentList;
  }
  if (selectedClassCode) {
    const updateStudentList = updatedStudentList.filter(std => {
      return std.profile.class_code.toLowerCase().includes(selectedClassCode);
    });
    updatedStudentList = updateStudentList;
  }

  console.log("updatedStudentList", updatedStudentList);
  console.log(
    "updatedStudentList",
    updatedStudentList.filter(std => std.profile.is_assignment_on),
  );

  const handleShowCloseAssignmentDailog = () => {
    Modal.confirm({
      title: (
        <div>
          <p>Are you sure you wish to clear the assignment column ?</p>
          <p style={{ color: "GrayText" }}>
            Assignment data <u>is saved</u> and can be found on individual and
            group reports (see Report Generator).
          </p>
        </div>
      ),
      icon: <DeleteOutlined style={{ color: "red" }} />,
      okText: "Yes, clear",
      cancelText: "No, cancel",
      onOk() {
        const studentKeyListByAssignment = updatedStudentList
          .filter(std => std.profile.is_assignment_on)
          .map(std => std.id)
          .join(",");
        const body = {
          role_id: 3,
          profile: {
            is_assignment_on: 0,
          },
        };
        dispatch(editMultipleUser(studentKeyListByAssignment, body));
      },
      onCancel() {},
    });
  };
  return (
    <>
      <ErrorBoundary>
        <StudentTable
          updatedStudentList={updatedStudentList}
          isSelectedStudentIDReset={isSelectedStudentIDReset}
          showDeleteStudentDailog={handleShowDeleteStudentPopup}
          showEditStudentDailog={handleShowEditStudentPopup}
          showAddStudentDialog={handleShowStudentDailog}
          showStudentReportDailog={handleShowStudentReportDailog}
          showResetStudentDailog={handleShowStudentResetDailog}
          searchClassCode={selectedClassCode}
          showSessionDetailsDailog={handleStartStudenSessionDetailsDailog}
          showLevelLifterReportDailog={handleShowLevelLifterReportPopup}
          showMultipleDeleteStudentDailog={handleMultiDeleteUser}
          showMultiEditStudentDailog={handleMultiEditUserDailog}
          showProgressTable={handleShowProgressTable}
          showStrategiesTable={handleShowStrategiesTable}
          showStrategyConfirmationDailog={
            handleShowDisableStrategyConfirmationPopup
          }
          showLevelLifterLock={handleShowStudentLevelLifterLockDailog}
          showProgressTablePopup={handleShowProgressTablePopup}
          handleShowStudentActivityStatusPopup={
            handleShowStudentActivityStatusPopup
          }
          handleShowStudentDetailsPopup={handleShowStudentDetailsPopup}
          studentUserList={updatedStudentList}
          showSettingDialog={handleShowSettingPopup}
          handlePage={setCurrentPage}
          handlePageSize={setPageLimit}
          currentPage={currentPage}
          showCloseAssignmentDailog={handleShowCloseAssignmentDailog}
        />
      </ErrorBoundary>

      {isShowSettingDialog && (
        <ErrorBoundary>
          <StudentStatusControllerDialog
            open={isShowSettingDialog}
            closeSettingPopup={handleSettingDialog}
          />
        </ErrorBoundary>
      )}

      {isShowStudentDailog && (
        <>
          {/* <!-- Popup modal --> */}
          {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
          <ErrorBoundary>
            <StudentDialog
              closeStudentPopup={handleCloseStudentDailog}
              isEditMode={isEditMode}
              activeUser={activeUser}
              searchClassCode={selectedClassCode}
            />
          </ErrorBoundary>
        </>
      )}

      {/* Multiple use edit dialog  */}
      {!isShowStudentDeleteDailog && isShowMultiStudentEditDailog && (
        <>
          <ErrorBoundary>
            <MultipleStudentEditDialog
              closeStudentPopup={handleCloseMultipleStudentEditDailog}
              isEditMode={isEditMode}
              activeUser={activeUser}
              searchClassCode={selectedClassCode}
              selectedStudentIDList={selectedStudentIDList}
            />
          </ErrorBoundary>
        </>
      )}

      {/* {isShowStudentDeleteDailog && (
            <ErrorBoundary>
              <StudentDeleteDailog
                user={activeUser}
                 closeDeleteDailog={handleCloseDeleteStudentPopup}
                selectedStudentIDList={selectedStudentIDList}
                isShow={isShowStudentDeleteDailog}
              />
            </ErrorBoundary>
          )} */}

      {isShowStudentReportDailog && (
        <ErrorBoundary>
          <StudentReportDailog
            user={activeUser.row}
            learning_mode={activeUser.learning_mode}
            closeReportDailog={handleCloseStudentReportDailog}
          />
        </ErrorBoundary>
      )}

      {isShowStudentResetConfirmationDailog && (
        <ErrorBoundary>
          <StudentResetLevelDailog
            closeResetStudentDailog={handleCloseStudentResetDailog}
            user={activeUser}
          />
        </ErrorBoundary>
      )}

      {isShowStudentSessionDetailsDailog && (
        <ErrorBoundary>
          <SessionsDetailsDailog
            closeStudentSessionDailog={handleCloseStudenSessionDetailsDailog}
            showLevelLifterReportDailog={
              handleShowLevelLifterReportBySubmissionID
            }
            user={activeUser}
          />
        </ErrorBoundary>
      )}
      {isShowLevelLifterReportPopup && (
        <ErrorBoundary>
          <LevelLifterTestReportDialog
            open={isShowLevelLifterReportPopup}
            close={handleCloseLevelLifterReportPopup}
            user={activeUser}
            levelLifterSubmissionID={activeLevelLifterSubmissionID}
            // learning_mode={activeUser.profile.student_learning_mode_id}
            selectedLevelLearningMode={+selectedLevelLearningMode}
          />{" "}
        </ErrorBoundary>
      )}
      <ErrorBoundary>
        {isShowStrategyDialog && (
          <StrategyDailog
            user={activeUser}
            close={handleCloseStrategiesTable}
            isShowStrategyDialog={isShowStrategyDialog}
          />
        )}
      </ErrorBoundary>

      <ErrorBoundary>
        {isShowProgressTablePopup && (
          <ProgressTablePopup
            user={activeUser}
            selectedLearningMode={selectedLevelLearningMode}
            close={handleCloseProgressTable}
            isShowProgressTablePopup={isShowProgressTablePopup}
          />
        )}
      </ErrorBoundary>

      <ErrorBoundary>
        {isShowStrategyConfirmationDailog && (
          <StrategyConfirmationPopup
            user={activeUser}
            close={handleCloseDisableStrategyConfirmationPopup}
            open={isShowStrategyConfirmationDailog}
            selectedStrategySlug={selectedStrategySlug}
            isChecked={isStrategyChecked}
          />
        )}
      </ErrorBoundary>

      {isShowStudentLevelLifterDailog && (
        <ErrorBoundary>
          <StudentLevelLifterLockDailog
            closeStudentLevelLifterLockDailog={
              handleCloseStudentLevelLifterLockDailog
            }
            user={activeUser}
          />
        </ErrorBoundary>
      )}
      {isShowStudentActivityStatus && (
        <ErrorBoundary>
          <StudentStatus
            user={activeUser}
            close={handleCloseStudentActivityStatusPopup}
          />
        </ErrorBoundary>
      )}
      {isShowStudentDetails && (
        <ErrorBoundary>
          <StudentStatus
            user={activeUser}
            close={handleCloseStudentDetailsPopup}
          />
        </ErrorBoundary>
      )}
      {isShowProgressTable && (
        <>
          <ErrorBoundary>
            <ProgressLevelTable
              user={activeUser}
              close={handleCloseProgressTable}
              isShowProgressTablePopup={isShowProgressTable}
            />
          </ErrorBoundary>
        </>
      )}
    </>
  );
}

export default StudentPage;

// import React, { useState, useEffect } from "react";
// import DashboardLayout from "components/DashboardLayout";
// import Table from "components/Table";
// import StudentDailog from "components/StudentDailog";
// import MultipleStudentEditDialog from "components/MultipleStudentEditDialog";
// import StudentDeleteDailog from "components/DeleteDailog";
// import StudentResetLevelDailog from "components/StudentResetLevelDailog";
// import ErrorBoundary from "components/ErrorBoundary";
// import StudentReportDailog from "components/StudentReportDailog";
// import SessionsDetailsDailog from "components/SessionsDetailsDailog";
// import LevelLifterTestReportDailog from "components/LevelLifterTestFailedReportDailog";
// import { userRole } from "config/const";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   getUsersList,
//   getClassCodeList,
//   getUsersListFromGoogleClassRoom,
//   // removeMultipleUser,
// } from "store/action";
// import ProgressTablePopup from "components/ProgressTablePopup";

// function StudentPage(props) {
//   const dispatch = useDispatch();
//   const { userDetails } = useSelector(({ auth }) => auth);

//   // const { studentList } = useSelector(({ user }) => user);

//   const { classCodeList } = useSelector(({ classCode }) => classCode);

//   const [isShowStudentDailog, setIsShowStudentDailog] = useState(false);
//   const [isShowStudentDeleteDailog, setIsShowStudentDeleteDailog] = useState(
//     false,
//   );
//   const [
//     isShowMultiStudentEditDailog,
//     setIsShowMultiStudentEditDailog,
//   ] = useState(false);

//   const [selectedStudentIDList, setSelectedStudentIDList] = useState([]);

//   const [
//     isShowStudentResetConfirmationDailog,
//     setIsShowStudentResetConfirmationDailog,
//   ] = useState(false);

//   const [isShowStudentReportDailog, setIsShowStudentReportDailog] = useState(
//     false,
//   );
//   const [
//     isShowLevelLifterReportPopup,
//     setIsShowLevelLifterReportPopup,
//   ] = useState(false);

//   const [
//     isShowStudentSessionDetailsDailog,
//     setIsShowStudentSessionDetailsDailog,
//   ] = useState(false);
//   const [selectedClassCode, setSelectClassCode] = useState("");

//   const [searchText, setSearchText] = useState("");
//   const [isEditMode, setIsEditMode] = useState(false);
//   const [isSelectedStudentIDReset, setIsSelectedStudentIDReset] = useState(
//     false,
//   );
//   //default set 1 to learning mode
//   const [selectedLevelLearningMode, setSelectedLevelLearningMode] = useState(1);

//   const [isShowProgressTablePopup, setIsShowProgressTablePopup] = useState(
//     false,
//   );
//   const [activeUser, setActiveUser] = useState(false);

//   useEffect(() => {
//     !classCodeList.length && dispatch(getClassCodeList());
//   }, [classCodeList.length]); // eslint-disable-line

//   useEffect(() => {
//     if (Object.keys(userDetails)) {
//       dispatch(getUsersList(userRole.STUDENT.role_id));
//     }
//   }, []); // eslint-disable-line

//   const handleShowStudentDailog = () => {
//     setIsShowStudentDailog(true);
//     setIsEditMode(false);
//     setActiveUser({});
//   };

//   //Edit Student Dailog Open

//   const handleShowEditStudentPopup = activeUser => {
//     setIsEditMode(true);
//     setIsShowStudentDailog(true);
//     setActiveUser(activeUser);
//   };

//   //Close Student Dailog
//   const handleCloseStudentDailog = () => {
//     setIsShowStudentDailog(false);
//   };

//   //Show Delete Confirmation Dailog
//   const handleShowDeleteStudentPopup = activeUser => {
//     setSelectedStudentIDList([]);
//     setIsShowStudentDeleteDailog(true);
//     setActiveUser(activeUser);
//   };

//   //Close Delete Confirmation Dailog
//   const handleCloseDeleteStudentPopup = activeUser => {
//     setIsShowStudentDeleteDailog(false);
//     setIsSelectedStudentIDReset(!isSelectedStudentIDReset);
//   };

//   //show student  report dialog
//   const handleShowStudentReportDailog = activeUser => {
//     setIsShowStudentReportDailog(true);

//     setActiveUser(activeUser);
//   };

//   const handleCloseStudentReportDailog = activeUser => {
//     setIsShowStudentReportDailog(false);
//     setActiveUser({});
//   };

//   const handleChangeSearchText = searchText => {
//     setSearchText(searchText);
//   };

//   const handleShowStudentResetDailog = row => {
//     setActiveUser(row);
//     setIsShowStudentResetConfirmationDailog(true);
//   };

//   const handleCloseStudentResetDailog = () => {
//     setActiveUser({});

//     setIsShowStudentResetConfirmationDailog(false);
//   };

//   //search class code
//   const handleChangeClassCode = searchText => {
//     setSelectClassCode(searchText);
//   };

//   //Import data from google class rome
//   const handleImportDataFromGoogle = () => {
//     dispatch(getUsersListFromGoogleClassRoom(selectedClassCode));
//   };

//   const handleMultiDeleteUser = selectedRowKeys => {
//     setIsShowStudentDeleteDailog(true);
//     setSelectedStudentIDList(selectedRowKeys);

//     // dispatch(removeMultipleUser(ids));
//   };

//   const handleStartStudenSessionDetailsDailog = row => {
//     setIsShowStudentSessionDetailsDailog(true);
//     setActiveUser(row);
//   };
//   const handleCloseStudenSessionDetailsDailog = () => {
//     setIsShowStudentSessionDetailsDailog(false);
//     setActiveUser({});
//   };

//   const handleShowLevelLifterReportPopup = (row, learning_mode) => {
//     setIsShowLevelLifterReportPopup(true);
//     setActiveUser(row);
//     setSelectedLevelLearningMode(learning_mode);
//   };

//   const handleCloseLevelLifterReportPopup = () => {
//     setIsShowLevelLifterReportPopup(false);
//   };

//   const handleMultiEditUserDailog = selectedRowKeys => {
//     setSelectedStudentIDList(selectedRowKeys);
//     setIsShowMultiStudentEditDailog(true);
//   };

//   const handleCloseMultipleStudentEditDailog = () => {
//     setIsShowMultiStudentEditDailog(false);
//     setIsSelectedStudentIDReset(!isSelectedStudentIDReset);
//   };

//   const handleShowProgressTable = (user, learning_mode) => {
//     setActiveUser(user);
//     setSelectedLevelLearningMode(learning_mode);
//     setIsShowProgressTablePopup(true);
//   };

//   const handleCloseProgressTable = () => {
//     // setActiveUser({});
//     setSelectedLevelLearningMode("");
//     setIsShowProgressTablePopup(false);
//   };
//   return (
//     <>
//       <DashboardLayout
//         showAddDialog={handleShowStudentDailog}
//         changeSearchText={handleChangeSearchText}
//         pageLabel="Students"
//         buttonText="Add Student"
//         changeClassCode={handleChangeClassCode}
//         handleImportDataFromGoogle={handleImportDataFromGoogle}
//       >
//         <ErrorBoundary>
//           <Table
//             isSelectedStudentIDReset={isSelectedStudentIDReset}
//             showDeleteStudentDailog={handleShowDeleteStudentPopup}
//             showEditStudentDailog={handleShowEditStudentPopup}
//             showStudentReportDailog={handleShowStudentReportDailog}
//             searchText={searchText}
//             showResetStudentDailog={handleShowStudentResetDailog}
//             searchClassCode={selectedClassCode}
//             showSessionDetailsDailog={handleStartStudenSessionDetailsDailog}
//             showLevelLifterReportDailog={handleShowLevelLifterReportPopup}
//             showMultipleDeleteStudentDailog={handleMultiDeleteUser}
//             showMultiEditStudentDailog={handleMultiEditUserDailog}
//             showProgressTable={handleShowProgressTable}
//           />
//         </ErrorBoundary>

//         {isShowStudentDailog && (
//           <>
//             {/* <!-- Popup modal --> */}
//             {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
//             <ErrorBoundary>
//               <StudentDailog
//                 closeStudentPopup={handleCloseStudentDailog}
//                 isEditMode={isEditMode}
//                 activeUser={activeUser}
//                 searchClassCode={selectedClassCode}
//               />
//             </ErrorBoundary>
//           </>
//         )}

//         {/* Multiple use edit dialog  */}
//         {!isShowStudentDeleteDailog && isShowMultiStudentEditDailog && (
//           <>
//             <ErrorBoundary>
//               <MultipleStudentEditDialog
//                 closeStudentPopup={handleCloseMultipleStudentEditDailog}
//                 isEditMode={isEditMode}
//                 activeUser={activeUser}
//                 searchClassCode={selectedClassCode}
//                 selectedStudentIDList={selectedStudentIDList}
//               />
//             </ErrorBoundary>
//           </>
//         )}

//         {isShowStudentDeleteDailog && (
//           <ErrorBoundary>
//             <StudentDeleteDailog
//               user={activeUser}
//               closeDeleteDailog={handleCloseDeleteStudentPopup}
//               selectedStudentIDList={selectedStudentIDList}
//             />
//           </ErrorBoundary>
//         )}
//         {isShowStudentReportDailog && (
//           <ErrorBoundary>
//             <StudentReportDailog
//               user={activeUser.row}
//               learning_mode={activeUser.learning_mode}
//               closeReportDailog={handleCloseStudentReportDailog}
//             />
//           </ErrorBoundary>
//         )}

//         {isShowStudentResetConfirmationDailog && (
//           <ErrorBoundary>
//             <StudentResetLevelDailog
//               closeResetStudentDailog={handleCloseStudentResetDailog}
//               user={activeUser}
//             />
//           </ErrorBoundary>
//         )}

//         {isShowStudentSessionDetailsDailog && (
//           <ErrorBoundary>
//             <SessionsDetailsDailog
//               closeStudentSessionDailog={handleCloseStudenSessionDetailsDailog}
//               user={activeUser}
//             />
//           </ErrorBoundary>
//         )}
//         {isShowLevelLifterReportPopup && (
//           <ErrorBoundary>
//             <LevelLifterTestReportDailog
//               open={isShowLevelLifterReportPopup}
//               close={handleCloseLevelLifterReportPopup}
//               user={activeUser}
//               learning_mode={activeUser.learning_mode}
//               selectedLevelLearningMode={selectedLevelLearningMode}
//             />{" "}
//           </ErrorBoundary>
//         )}
//         {5 == 2 && (
//         <ErrorBoundary>
//           <ProgressTablePopup
//             user={activeUser}
//             selectedLearningMode={selectedLevelLearningMode}
//             close={handleCloseProgressTable}
//             isShowProgressTablePopup={isShowProgressTablePopup}
//           />
//         </ErrorBoundary>
//         )}
//       </DashboardLayout>
//     </>
//   );
// }

// export default StudentPage;
