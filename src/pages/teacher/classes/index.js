import React, { useState, useEffect } from "react";
// import { useSnackbar } from "notistack";
import { Tag, Typography, Button } from "antd";
import ClassCodeTable from "components/ClassCodeTable";
import ClassCodeDialog from "components/ClassCodeDialog";
import ConfirmationClassCodeDialog from "components/ConfirmationClassCodeDialog";
import ErrorBoundary from "components/ErrorBoundary";
import ClassroomSyncErrorPopup from "components/ClassroomSyncErrorPopup";
import ReactGA from "react-ga";
import { useDispatch, useSelector } from "react-redux";
import classRoomImg from "assets/images/google-classroom.svg";
import {
  getClassCodeList,
  removeClassCode,
  getClassCodeListFromGoogleClassRoom,
  headerResetFilter,
  fetchClassLinkClasses,
} from "store/action";
import SyncDialog from "components/SyncDialog";
// import Helmet from "react-helmet";
import SelectClassDailog from "components/ClassListSelectionDailog";
import ClassLinkClassesSelectionDialog from "components/ClassLinkClassesSelectionDialog";
import Section from "components/Section";
import Container from "components/Container";
// import Button from "components/ButtonAnt";
// import Button from "components/ButtonAnt";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import "assets/sass/components/button-ant.scss";
import { useLocation } from "react-router-dom";
import { googleScopeClassroom } from "config/const";
import { Modal } from "antd";
const { Title } = Typography;
const ClassPage = props => {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const code = query.get("code");
  // const { enqueueSnackbar } = useSnackbar();
  const { userDetails } = useSelector(({ auth }) => auth);

  const { searchText } = useSelector(({ header }) => header);

  const {
    classCodeList,
    deleteClassCodeLoading,
    addNewClassCodeLoading,
    editClassCodeDetailsLoading,
    fetchingAllClassCodeListFromGoogleClassRoomLoading,
    fetchingClassLinkClassListLoading,
  } = useSelector(({ classCode }) => classCode);

  useEffect(() => {
    dispatch(headerResetFilter());
  }, []); // eslint-disable-line

  useEffect(() => {
    !classCodeList.length && dispatch(getClassCodeList());
  }, [classCodeList.length]); // eslint-disable-line

  const [isShowClassCodeDialog, setIsShowClassCodeDialog] = useState(false);
  const [
    isShowClassCodeDeleteDialog,
    setIsShowClassCodeDeleteDialog,
  ] = useState(false);

  const [isEditMode, setIsEditMode] = useState(false);
  const [activeClassCode, setActiveClassCode] = useState(false);
  const [isShowSelectClassDailog, setIsShowSelectClassDailog] = useState(false);
  const [isShowSelectClassLinkDialog, setShowSelectClassLinkDialog] = useState(
    false,
  );

  const [
    isShowClassroomSyncErrorDialog,
    setIsShowClassroomSyncErrorDialog,
  ] = useState(false);

  //Edit class code Dialog Open
  const handleShowEditClassCodePopup = activeClassCode => {
    setIsEditMode(true);
    setIsShowClassCodeDialog(true);
    setActiveClassCode(activeClassCode);
  };

  //Close class code Dialog close
  const handleCloseClassCodeDialog = () => {
    setIsEditMode(false);
    setIsShowClassCodeDialog(false);
  };

  //Show Delete Confirmation Dialog open
  const handleShowDeleteClassCodePopup = activeClassCode => {
    // setIsShowClassCodeDeleteDialog(true);
    setActiveClassCode(activeClassCode);
    handleConfirmDeleteClass(activeClassCode);
  };

  const handleConfirmDeleteClass = activeClassCode => {
    Modal.confirm({
      title: (
        <>
          <span style={{ fontWeight: "500" }}>
            Are you sure you wish to delete ClassName? <br />
            This will{" "}
            <span style={{ fontWeight: "700" }}>permanently delete</span> all
            student data for all NUMBER of the students in ClassName{" "}
            <span style={{ fontWeight: "700" }}>{activeClassCode.name}?</span>{" "}
            <br />
            Once deleted, student data cannot be recovered.
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
          removeClassCode(activeClassCode.id, handleCloseDeleteClassCodePopup),
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
      // onCancel() {
      //   close();
      // },
    });
  };
  //Close Delete Confirmation Dialog close
  const handleCloseDeleteClassCodePopup = activeClassCode => {
    setIsShowClassCodeDeleteDialog(false);
  };

  //delete api call
  const handleDeleteClassCode = () => {
    dispatch(
      removeClassCode(activeClassCode.id, handleCloseDeleteClassCodePopup),
    );
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Teacher Class Event`,
        action: `Teacher deleted class`,
        label: "Teacher Dashboard",
      });
    }
  };

  const handleShowClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(true);
  };
  const handleCloseClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(false);
  };
  const handleCallBackSyncToGoogle = message => {
    // enqueueSnackbar(message, {
    //   variant: "error",
    //   anchorOrigin: { vertical: "bottom", horizontal: "left" },
    // });
    handleShowClassroomSyncErrorDailog();
  };

  //Show Class selection  dialog
  const handleShowClassSelectDailog = () => {
    handleCloseClassroomSyncErrorDailog(false);
    setIsShowSelectClassDailog(true);
  };

  //Close Class selection  dialog
  const handleCloseClassSelectionDailog = () => {
    setIsShowSelectClassDailog(false);
  };

  //Import data from google class rome
  const handleImportDataFromGoogle = body => {
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Teacher Google classroom `,
        action: `Teacher clicked on  Sync with Classroom`,
        label: "Teacher Dashboard",
      });
    }
    dispatch(
      getClassCodeListFromGoogleClassRoom(
        body,
        handleShowClassSelectDailog,
        handleCallBackSyncToGoogle,
      ),
    );
  };

  useEffect(() => {
    if (code) {
      handleImportDataFromGoogle({
        code: code,
        requested_url: location.pathname,
      });
    }
  }, [code]); // eslint-disable-line

  const classLinkClassesFetchSuccess = () => {
    setShowSelectClassLinkDialog(true);
  };
  //close class link classes dialog
  const handleCloseClassLinkSelectionDailog = () => {
    setShowSelectClassLinkDialog(false);
  };

  const handleSyncClassLinkClasses = () => {
    dispatch(fetchClassLinkClasses(classLinkClassesFetchSuccess));
  };

  const handleAddclassName = () => {
    setIsShowClassCodeDialog(true);
  };
  // const handleAddclassNameDemo = () => {
  //   setPopupShow(true);
  // };

  // Filter Classcode list by searchbox
  // filter by search bar

  let updatedClassCodeList = classCodeList;
  if (searchText) {
    updatedClassCodeList = classCodeList.filter(classCode => {
      return classCode.name.toLowerCase().includes(searchText);
    });
  }

  return (
    <>
      {/* <Helmet>
        <title>Classes | MathFact Lab</title>
       
      </Helmet> */}

      <Container fluid>
        <Section
          // title={`Classes (${classCodeList.length})`}
          title={
            <>
              <Title level={4} className={"tab-heading"}>
                Classes
                <span className="table-header-counter">
                  <Tag> {updatedClassCodeList?.length}</Tag>
                </span>
              </Title>
            </>
          }
          extra={
            <div className="google-classroom-section">
              {location.pathname === "/teacher/classes" &&
                !!userDetails.is_class_link_user && (
                  <Button
                    type="primary"
                    size="small"
                    className="mr-10"
                    onClick={handleSyncClassLinkClasses}
                  >
                    Sync with Class Link
                  </Button>
                )}
              {location.pathname === "/teacher/classes" &&
              !!userDetails.is_google_user ? (
                !userDetails.is_gcl_data_access_granted ? (
                  <>
                    <a
                      // className="search with-button btn-google-classroom js-sync-google-classrooms"
                      // href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.REACT_APP_GOOGLE_SCOPE}&include_granted_scopes=true&redirect_uri=${process.env.REACT_APP_FRONTEND_REDIRECT_URL}/teacher/login&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code`}
                      href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScopeClassroom.join(
                        "%20",
                      )}&include_granted_scopes=true&redirect_uri=${
                        process.env.REACT_APP_FRONTEND_REDIRECT_URL
                      }/teacher/classes&client_id=${
                        process.env.REACT_APP_GOOGLE_CLIENT_ID
                      }&response_type=code&access_type=offline&prompt=consent`}
                    >
                      <Button
                        type="primary"
                        size="small"
                        icon={
                          <img
                            className="google-classrooms-img"
                            src={classRoomImg}
                            alt="Classroom"
                            style={{ width: "18px", marginRight: "6px" }}
                          />
                        }
                        className="mr-10"
                      >
                        Sync with Classroom
                      </Button>
                    </a>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleAddclassName()}
                      className="joyride-2"
                    >
                      Add Class <PlusOutlined />
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      type="primary"
                      size="small"
                      icon={
                        <img
                          className="google-classrooms-img"
                          src={classRoomImg}
                          alt="Classroom"
                          style={{ width: "18px", marginRight: "6px" }}
                        />
                      }
                      className="mr-10"
                      onClick={() => handleImportDataFromGoogle()}
                    >
                      Sync with Classroom
                    </Button>
                    <Button
                      type="primary"
                      size="small"
                      onClick={() => handleAddclassName()}
                      className="joyride-2"
                    >
                      Add Class <PlusOutlined />
                    </Button>
                  </>
                )
              ) : (
                <Button
                  type="primary"
                  size="small"
                  onClick={() => handleAddclassName()}
                  className="joyride-2"
                >
                  Add Class <PlusOutlined />
                </Button>
              )}
            </div>
          }
        >
          <ErrorBoundary>
            <ClassCodeTable
              showDeleteClassCodeDialog={handleShowDeleteClassCodePopup}
              showEditClassCodeDialog={handleShowEditClassCodePopup}
              searchText={searchText}
              classCodeList={updatedClassCodeList}
            />
          </ErrorBoundary>

          {isShowClassCodeDialog ? (
            <ErrorBoundary>
              <ClassCodeDialog
                open={isShowClassCodeDialog}
                closeClassCodePopup={handleCloseClassCodeDialog}
                isEditMode={isEditMode}
                activeClassCode={activeClassCode}
                loading={addNewClassCodeLoading || editClassCodeDetailsLoading}
              />
            </ErrorBoundary>
          ) : (
            ""
          )}

          {isShowClassCodeDeleteDialog && (
            <ErrorBoundary>
              <ConfirmationClassCodeDialog
                open={false}
                activeClassCode={activeClassCode}
                closeConfirmationDialog={handleCloseDeleteClassCodePopup}
                success={handleDeleteClassCode}
                loading={deleteClassCodeLoading}
              />
            </ErrorBoundary>
          )}

          {fetchingAllClassCodeListFromGoogleClassRoomLoading && (
            <ErrorBoundary>
              <SyncDialog contentText="Syncing with google classroom (Active classes)" />
            </ErrorBoundary>
          )}
          {fetchingClassLinkClassListLoading && (
            <ErrorBoundary>
              <SyncDialog contentText="Syncing with class link classes (Active classes)" />
            </ErrorBoundary>
          )}

          {/* //Select Classes Dailog  */}
          {isShowSelectClassDailog && (
            <ErrorBoundary>
              <SelectClassDailog
                open={isShowSelectClassDailog}
                // open={true}
                activeClassCode={activeClassCode}
                close={handleCloseClassSelectionDailog}
                loading={deleteClassCodeLoading}
              />
            </ErrorBoundary>
          )}
          {/* class link classes dialog */}
          {isShowSelectClassLinkDialog && (
            <ErrorBoundary>
              <ClassLinkClassesSelectionDialog
                open={isShowSelectClassLinkDialog}
                activeClassCode={activeClassCode}
                close={handleCloseClassLinkSelectionDailog}
                loading={deleteClassCodeLoading}
              />
            </ErrorBoundary>
          )}

          {/* //Classroom sync error  */}

          {isShowClassroomSyncErrorDialog && (
            <ErrorBoundary>
              <ClassroomSyncErrorPopup
                close={handleCloseClassroomSyncErrorDailog}
              />
            </ErrorBoundary>
          )}
        </Section>
      </Container>
    </>
  );
};

export default ClassPage;
