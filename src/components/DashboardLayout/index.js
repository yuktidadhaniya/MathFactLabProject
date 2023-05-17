import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Button from "components/Button";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";
import Select from "components/ReactSelect";
import Header from "./Header";
import classRoomImg from "assets/images/google-classroom.svg";
import { useHistory } from "react-router-dom";
import { resendVerificationMail } from "store/action";
import { useDispatch } from "react-redux";
import { studentLearningModeList } from "config/const";
import { googleScopeClassroom } from "config/const";

function DashboardLayout(props) {
  let location = useLocation();
  const query = new URLSearchParams(location.search);
  let history = useHistory();
  const dispatch = useDispatch();

  const code = query.get("code");
  const teacherClassCode = +query.get("class_code");
  const {
    changeClassCode,
    showAddDialog,
    changeSearchText,
    handleImportDataFromGoogle,
    changeLearningMode,
  } = props;

  const { classCodeList } = useSelector(({ classCode }) => classCode);
  const { userDetails } = useSelector(({ auth }) => auth);

  const [isShowEmailVerifyBanner, setIsShowEmailVerifyBanner] = useState(true);
  const [
    isShowSentVerificationSuccessMessage,
    setIsShowSentVerificationSuccessMessage,
  ] = useState(false);

  const classCodeListOption = [
    {
      label: "All",
      value: "",
    },
    ...classCodeList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code,
      };
    }),
  ];

  const [selectedClassCode, setSelectClassCode] = useState(
    teacherClassCode ? teacherClassCode : "",
  );

  const [selectedLearningMode, setSelectedLearningMode] = useState(
    studentLearningModeList[0].value,
  );

  const handleChangeClassCode = e => {
    setSelectClassCode(e.target.value);
    changeClassCode(e.target.value);
    history.push(`/teacher/students`);
  };

  const handleChangeLearningMode = e => {
    setSelectedLearningMode(e.target.value);
    changeLearningMode(e.target.value);
  };
  const { pageLabel, buttonText } = props;

  const handleAddStudent = () => {
    showAddDialog();
  };

  const handleChangeSearchText = e => {
    changeSearchText(e.target.value);
  };

  useEffect(() => {
    selectedClassCode && changeClassCode(selectedClassCode);
  }, [selectedClassCode]); // eslint-disable-line

  const handleSuccessResendVerificationMail = () => {
    setIsShowSentVerificationSuccessMessage(true);
  };

  const handleResendVerificationMessage = () => {
    dispatch(resendVerificationMail(handleSuccessResendVerificationMail));
  };

  const handleCloseResendVerificationMessage = () => {
    setIsShowEmailVerifyBanner(false);
  };
  const responseGoogleSignUp = response => {
    const body = {
      code: code,
      requested_url: location.pathname,
    };
    handleImportDataFromGoogle(body);
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}:Teacher Google classroom `,
        action: `Teacher clicked on  Sync with Classroom`,
        label: "Teacher Dashboard",
      });
    }
  };

  useEffect(() => {
    if (code) {
      responseGoogleSignUp();
    }
  }, [code]); // eslint-disable-line

  return (
    <>
      {/* <!-- Main Wrapper --> */}
      <main className="main-wrapper full-page-layout">
        <Header />

        <section className="aside-page-layout">
          <aside className="aside">
            <ul className="aside-link-wrapper">
              {/* dashboard tab commented for now  */}
              {/* <li className="aside-link-item">
                <Link
                  className={
                    location.pathname === "/teacher/dashboard"
                      ? "aside-link active"
                      : "aside-link "
                  }
                  to="/teacher/dashboard"
                >
                  <i className="icon-dashboard" aria-hidden="true"></i>Dashboard
                </Link>
              </li> */}
              {/* <li className="aside-link-item">
                <Link href="#" className="aside-link active">
                  <i className="icon-teachers" aria-hidden="true"></i>Teachers
                </Link>
              </li> */}
              <li className="aside-link-item" to="/teacher/classes">
                <Link
                  className={
                    location.pathname === "/teacher/classes"
                      ? "aside-link active"
                      : "aside-link "
                  }
                  to="/teacher/classes"
                >
                  <i className="icon-class-Active" aria-hidden="true"></i>
                  Classes
                </Link>
              </li>
              <li className="aside-link-item" to="/teacher/students">
                <Link
                  className={
                    location.pathname === "/teacher/students"
                      ? "aside-link active"
                      : "aside-link "
                  }
                  to="/teacher/students"
                >
                  <i className="icon-students" aria-hidden="true"></i>Students
                </Link>
              </li>
              <li className="aside-link-item" style={{ pointerEvents: "none" }}>
                <Link className={"aside-link"}>
                  <i className="icon-students" aria-hidden="true"></i>Teaching
                  Tools
                </Link>
              </li>

              <li
                className="aside-link-item"
                to="/teacher/classroom-implementation"
              >
                <Link
                  className={
                    location.pathname === "/teacher/classroom-implementation"
                      ? "aside-link active"
                      : "aside-link "
                  }
                  to="/teacher/classroom-implementation"
                >
                  <i className="icon-classroom" aria-hidden="true"></i>
                  Classroom Implementation
                </Link>
              </li>
              <li className="aside-link-item" to="/teacher/faqs">
                <Link
                  className={
                    location.pathname === "/teacher/faqs"
                      ? "aside-link active"
                      : "aside-link "
                  }
                  to="/teacher/faqs"
                >
                  <i className="icon-faqs" aria-hidden="true"></i>
                  FAQs
                </Link>
              </li>
              <li className="aside-link-item" to="/teacher/settings">
                <Link
                  className={
                    location.pathname === "/teacher/settings"
                      ? "aside-link active"
                      : "aside-link "
                  }
                  to="/teacher/settings"
                >
                  <i className="icon-faqs" aria-hidden="true"></i>
                  Settings
                </Link>
              </li>
            </ul>
          </aside>
          <div className="right-main-layout">
            <div className="right-main-inner">
              <div className="right-main-content">
                <div className="action-header">
                  <h1 className="table-title">{pageLabel}</h1>
                  <div className="flex pull-right">
                    {location.pathname === "/teacher/classes" &&
                      !!userDetails.is_google_user &&
                      (!userDetails.is_gcl_data_access_granted ? (
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
                          style={{ height: "44px" }}
                        >
                          <button
                            type="button"
                            className="search with-button btn-google-classroom js-sync-google-classrooms"
                            title={"Import"}
                            // onClick={() => handleImportDataFromGoogle()}
                            style={{ height: "100%" }}
                          >
                            <img
                              className="google-classrooms-img"
                              src={classRoomImg}
                              alt="Classroom"
                            />
                            <div className="classroom-text">
                              Sync with Classroom
                            </div>
                          </button>
                        </a>
                      ) : (
                        <button
                          type="button"
                          className="search with-button btn-google-classroom js-sync-google-classrooms"
                          title={"Import"}
                          onClick={() => handleImportDataFromGoogle()}
                          style={{ height: "100%" }}
                        >
                          <img
                            className="google-classrooms-img"
                            src={classRoomImg}
                            alt="Classroom"
                          />
                          <div className="classroom-text">
                            Sync with Classroom
                          </div>
                        </button>
                      ))}

                    {location.pathname === "/teacher/students" && (
                      <div className="search with-button">
                        <Select
                          name="learningMode"
                          value={selectedClassCode}
                          options={classCodeListOption}
                          onChange={handleChangeClassCode}
                          placeholder="Select Class Code..."
                        />
                      </div>
                    )}
                    {(location.pathname === "/teacher/students" ||
                      location.pathname === "/teacher/classes") && (
                      <div className="search with-button">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Search"
                          onChange={e => handleChangeSearchText(e)}
                          name="search"
                        />
                        <div className="btn-icon-trans">
                          <i className="icon-search" aria-hidden="true"></i>
                        </div>
                      </div>
                    )}

                    {location.pathname === "/teacher/progression-tables" && (
                      <div className="search with-button">
                        <Select
                          name="learningMode"
                          value={selectedLearningMode}
                          options={studentLearningModeList}
                          onChange={handleChangeLearningMode}
                          placeholder="Select Learning Mode..."
                        />
                      </div>
                    )}
                    {buttonText && (
                      <Button
                        type="button"
                        className="btn btn-secondary"
                        name={buttonText}
                        onClick={() => handleAddStudent()}
                      ></Button>
                    )}
                  </div>
                </div>
                <div className="table-wrapper">{props.children}</div>
              </div>
            </div>
          </div>
        </section>

        {!userDetails.is_email_verified && isShowEmailVerifyBanner && (
          <div
            style={{
              position: "fixed",
              bottom: "0px",
              // backgroundColor: "#fbe5e1",
              backgroundColor: "#ffffff",

              // color: "rgb(212 50 24)",
              // color: "#008afc",
              padding: "12px 64px 12px 64px",
              zIndex: "100",
              opacity: "0.9",
              boxShadow: "0px -2px 6px rgba(57,73,76,0.35)",
              fontSize: "14px",
              width: "100%",
            }}
            className="w-full"
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              {isShowSentVerificationSuccessMessage ? (
                <div>
                  <div style={{ margin: "4px 0px" }}>
                    Resend verification email has been sent successfully.
                  </div>
                </div>
              ) : (
                <div>
                  {/* <div className="font-semibold">Verification needed.</div> */}
                  <div style={{ margin: "4px 0px" }}>
                    Your email is not verified. Please verifiy your email.
                  </div>
                  <div
                    className="font-semibold hover-text-red"
                    onClick={() => handleResendVerificationMessage()}
                    style={{ cursor: "pointer", color: "#008afc" }}
                  >
                    Resend verification mail
                  </div>
                </div>
              )}

              <span
                className="close"
                onClick={() => handleCloseResendVerificationMessage()}
              >
                <i className="icon-close" aria-hidden="true"></i>
              </span>
              {/* <div
              className="font-semibold hover-text-red"
              onClick={() => handleCloseResendVerificationMessage()}
            >
              Remind me later
            </div> */}
              {/* <img
                    src={errorImg}
                    style={{
                      width: "14px",
                      height: "14px",
                      cursor: "pointer"
                    }}
                    onClick={() => handleCloseResendVerificationMessage()}
                  /> */}
            </div>
          </div>
        )}
      </main>
    </>
  );
}

export default DashboardLayout;
