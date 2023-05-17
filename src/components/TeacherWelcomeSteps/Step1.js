import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { Button } from "antd";
import classRoomImg from "assets/images/google-classroom.svg";
import { PlusOutlined } from "@ant-design/icons";
import { googleScopeClassroom, userRole } from "config/const";
import ReactGA from "react-ga";
import {
  getClassCodeListFromGoogleClassRoom,
  getUsersList,
} from "store/action";
import ErrorBoundary from "components/ErrorBoundary";
import SyncDialog from "components/SyncDialog";
import ClassListSelectionDailog from "components/ClassListSelectionDailog";
import ClassroomSyncErrorPopup from "components/ClassroomSyncErrorPopup";
import moment from "moment";

const Step1 = props => {
  const dispatch = useDispatch();
  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const code = query.get("code");
  const { userDetails } = useSelector(({ auth }) => auth);
  const [
    isShowClassroomSyncErrorDialog,
    setIsShowClassroomSyncErrorDialog,
  ] = useState(false);
  const [isShowSelectClassDailog, setIsShowSelectClassDailog] = useState(false);

  const {
    deleteClassCodeLoading,
    fetchingAllClassCodeListFromGoogleClassRoomLoading,
  } = useSelector(({ classCode }) => classCode);
  const handleCreateClass = () => {
    if (props.currentStep === 3) {
      props.setCurrentStep(1);
    } else {
      props.setCurrentStep(props.currentStep + 1);
    }
  };
  const handleShowClassSelectDailog = () => {
    handleCloseClassroomSyncErrorDailog(false);
    setIsShowSelectClassDailog(true);
  };
  const handleCallBackSyncToGoogle = message => {
    handleShowClassroomSyncErrorDailog();
  };
  const handleShowClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(true);
  };
  const handleCloseClassSelectionDailog = () => {
    setIsShowSelectClassDailog(false);
  };
  useEffect(() => {
    if (code) {
      handleImportDataFromGoogle({
        code: code,
        requested_url: location.pathname,
      });
    }
  }, [code]); // eslint-disable-line
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
  const currentDate = moment(userDetails.profile.created_at).format(
    "DD-MM-YYYY",
  );
  const handleCloseClassroomSyncErrorDailog = () => {
    setIsShowClassroomSyncErrorDialog(false);
  };
  const handleSuccessSyncClass = () => {
    dispatch(getUsersList(userRole.STUDENT.role_id, currentDate, currentDate));
    props.setCurrentStep(4);
  };

  return (
    <>
      <div className="step-1">
        <div className="welcom-text">Welcome</div>

        <div className="welcom-sub-text">
          You’re just a few short steps away from being ready to use
          MathFactLab.
        </div>
        <div className="begin-text">
          {!userDetails.is_google_user
            ? "To begin, click Create a class."
            : "To begin, create your first class or sync with your Google Classroom."}
        </div>
        <div className="actions-button">
          {!!userDetails.is_google_user ? (
            !userDetails.is_gcl_data_access_granted ? (
              <>
                <div className="sync-button">
                  <a
                    href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScopeClassroom.join(
                      "%20",
                    )}&include_granted_scopes=true&redirect_uri=${
                      process.env.REACT_APP_FRONTEND_REDIRECT_URL
                    }/teacher/classes&client_id=${
                      process.env.REACT_APP_GOOGLE_CLIENT_ID
                    }&response_type=code&access_type=offline&prompt=consent`}
                  >
                    <Button
                      size="large"
                      icon={
                        <img
                          className="google-classrooms-img"
                          src={classRoomImg}
                          alt="Classroom"
                          style={{
                            width: "18px",
                            marginRight: "6px",
                          }}
                        />
                      }
                      className="mr-10"
                    >
                      Sync with Classroom
                    </Button>
                  </a>
                  <div className="sync-text">
                    Use this option only if your students are in a Google
                    Classroom that you manage.
                  </div>
                </div>
                <Button
                  type="primary"
                  size="large"
                  className="joyride-2"
                  onClick={handleCreateClass}
                >
                  Create a class <PlusOutlined />
                </Button>
              </>
            ) : (
              <>
                <div className="sync-button">
                  <Button
                    size="large"
                    icon={
                      <img
                        className="google-classrooms-img"
                        src={classRoomImg}
                        alt="Classroom"
                        style={{
                          width: "18px",
                          marginRight: "6px",
                        }}
                      />
                    }
                    className="mr-10"
                    onClick={() => handleImportDataFromGoogle()}
                  >
                    Sync with Classroom
                  </Button>

                  <div className="sync-text">
                    Use this option only if your students are in a Google
                    Classroom that you manage.
                  </div>
                </div>

                <Button
                  type="primary"
                  size="large"
                  className="joyride-2"
                  onClick={handleCreateClass}
                >
                  Create a class <PlusOutlined />
                </Button>
              </>
            )
          ) : (
            <Button
              type="primary"
              size="large"
              className="joyride-2"
              onClick={handleCreateClass}
            >
              Create a class <PlusOutlined />
            </Button>
          )}
        </div>
      </div>
      {fetchingAllClassCodeListFromGoogleClassRoomLoading && (
        <ErrorBoundary>
          <SyncDialog contentText="Syncing with google classroom (Active classes)" />
        </ErrorBoundary>
      )}

      {/* //Select Classes Dailog  */}
      {isShowSelectClassDailog && (
        <ErrorBoundary>
          <ClassListSelectionDailog
            open={isShowSelectClassDailog}
            // open={true}
            close={handleCloseClassSelectionDailog}
            success={handleSuccessSyncClass}
            loading={deleteClassCodeLoading}
          />
        </ErrorBoundary>
      )}
      {isShowClassroomSyncErrorDialog && (
        <ErrorBoundary>
          <ClassroomSyncErrorPopup
            close={handleCloseClassroomSyncErrorDailog}
          />
        </ErrorBoundary>
      )}
    </>
  );
};

export default Step1;
