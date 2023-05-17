import React, { useEffect, useState } from "react";
import {
  editUser,
  getLevelLifterQuestionList,
  updateCurrentLevelLifterSubmissionDetails,
} from "store/action";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { userRole } from "config/const";
import moment from "moment";
import Button from "components/Button";

import {
  mulSubLevelList,
  addSubLevelList,
  mathOperationList,
} from "config/const";
import AvgResponseTime from "components/AvgResponseTime";

function LevelLifterInterviewTestReportDialog(props) {
  const {
    errorCount = "",
    user,
    selectedLevelLearningMode,
    levelLifterSubmissionID,
    correctButOverTime = "",
  } = props;

  const dispatch = useDispatch();
  const history = useHistory();
  const {
    levelLifterSubmissionDetails,
    fetchingLevelLifterQuestionListLoading,
    levelLifterSubmissionReportDetails,
  } = useSelector(({ strategy }) => strategy);

  const { userDetails } = useSelector(({ auth }) => auth);

  const activeUser = JSON.parse(localStorage.getItem("interview_student_user"));

  const userData = user || userDetails;

  const {
    profile: { student_learning_mode_id },
  } = userData;
  useEffect(() => {
    //get  level lifter report by user ID
    dispatch(
      getLevelLifterQuestionList(
        "only_attepmpted",
        userData && userData.id,
        selectedLevelLearningMode,
        levelLifterSubmissionID,
      ),
    );
  }, []); // eslint-disable-line

  const mathOprationList = {
    Addition: {
      title: "Addition",
    },

    Subtraction: {
      title: "Subtraction",
    },
    Multiplication: {
      title: "Multiplication",
    },
    Division: {
      title: "Division",
    },
  };

  const [isNotyetClicked, setIsNotyetClicked] = useState(false);

  const handleLevelUp = () => {
    const {
      profile: { add_sub_level_id, student_learning_mode_id, mul_div_level_id },
    } = activeUser;
    const body = {
      mul_div_level_id:
        student_learning_mode_id === 2
          ? +mul_div_level_id + 1 + ""
          : mul_div_level_id,
      add_sub_level_id:
        student_learning_mode_id === 1
          ? +add_sub_level_id === 17
            ? +add_sub_level_id + 9 + ""
            : +add_sub_level_id + 1 + ""
          : add_sub_level_id,
      is_add_sub_level_lifter: student_learning_mode_id === 1 ? 1 : 0,
      is_mul_div_level_lifter: student_learning_mode_id === 2 ? 1 : 0,
    };
    const submissionBody = {
      status_id: "lss_057c0a98c0ef85878b6b1185",
    };

    dispatch(
      updateCurrentLevelLifterSubmissionDetails(
        submissionBody,
        levelLifterSubmissionDetails,
        "",
        "",
        userData.id,
      ),
    );
    dispatch(editUser(activeUser.id, body));
    props.showCoagulationPop();
    // props.close();

    // history.push("/teacher/students?is_level_lifter_failed=true");
  };

  const handleNotYet = () => {
    const body = {
      is_add_sub_level_lifter:
        activeUser.profile.student_learning_mode_id === 1 ? 1 : 0,
      is_mul_div_level_lifter:
        activeUser.profile.student_learning_mode_id === 2 ? 1 : 0,
    };
    dispatch(editUser(activeUser.id, body));
    const submissionBody = {
      status_id: "lss_5b926ac2d0943bd829fead7f",
    };

    dispatch(
      updateCurrentLevelLifterSubmissionDetails(
        submissionBody,
        levelLifterSubmissionDetails,
        "",
        "",
        userData.id,
      ),
    );
    setIsNotyetClicked(true);
  };
  function studentReportCard(mathOperation, index, questionList) {
    const correctResponseInTimeQnsList = questionList.filter(
      qns => qns.correct_answer === qns.answer,
    );

    const notYetResponseQnsList = questionList.filter(
      qns => qns.correct_answer !== qns.answer,
    );

    const correctResponseInTimeQnsAvgResponseTime = +(
      correctResponseInTimeQnsList.reduce((acc, question) => {
        return acc + +question.time_taken_in_second;
      }, 0) / correctResponseInTimeQnsList.length
    ).toFixed(1);

    const inCorrectResponseQnsAvgResponseTime = +(
      notYetResponseQnsList.reduce((acc, question) => {
        return acc + +question.time_taken_in_second;
      }, 0) / notYetResponseQnsList.length
    ).toFixed(1);
    return (
      <div
        className={
          index === 0 ? "popup-box-wrapper mfl-top-less" : "popup-box-wrapper "
        }
      >
        <div className="popup-content-cols-inner">
          <div className="student-popcont-header">
            <div className="student-popcont-header-left">
              <b> {mathOprationList[mathOperation].title}</b> (
              {questionList.length} Questions)
            </div>
            {/* <div className="student-popcont-header-right">
              <i
                className="report-timer icon-timer mfl-text-green"
                aria-hidden="true"
              ></i>{" "}
              <b className="font-24 mr-5">3</b>
              <span className="mt-auto">secs</span>
            </div> */}
          </div>
          <div className="student-popcont-content">
            {correctResponseInTimeQnsList.length ? (
              <div
                className="student-additional-wrapper"
                key="correctResponseInTimeQnsList"
              >
                <div className="student-additional-title">
                  <span className="mfl-report-title-left font-24">
                    Correct response, fluent
                  </span>

                  {userDetails.role_id === userRole.TEACHER.role_id ? (
                    <span className="mfl-report-title-right">
                      <i
                        className={
                          correctResponseInTimeQnsAvgResponseTime <=
                          userData.profile.max_timeout_correct_ans_secs
                            ? "report-timer icon-timer mfl-text-green"
                            : "report-timer icon-timer mfl-text-yellow"
                        }
                        aria-hidden="true"
                      ></i>{" "}
                      <b className="font-24 mr-5">
                        {" "}
                        <AvgResponseTime
                          value={correctResponseInTimeQnsAvgResponseTime}
                        />
                      </b>
                      <span className="mt-auto">secs</span>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="student-popcont-content-inner">
                  {correctResponseInTimeQnsList.map((qns, i) => {
                    const time_taken_in_second_label =
                      qns.time_taken_in_second === 0 ||
                      qns.time_taken_in_second === 1
                        ? `${qns.time_taken_in_second}  second`
                        : `${qns.time_taken_in_second}  seconds`;
                    return (
                      <>
                        <div
                          className="student-popcont-content-cols"
                          key={`${qns.id}_${i}`}
                        >
                          <div className="student-calc-card mf-success">
                            <div className="student-calc-card-title">
                              {" "}
                              {`  ${qns.first_factor} ${
                                mathOperationList[qns.math_operation_id]
                              }
                              ${qns.second_factor} = ${
                                qns.answer ? qns.answer : ""
                              }`}
                            </div>
                            {userDetails.role_id ===
                            userRole.TEACHER.role_id ? (
                              <div className="student-calc-card-time">
                                {time_taken_in_second_label}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}

            {notYetResponseQnsList.length ? (
              <div
                className="student-additional-wrapper"
                key="inCorrectResponseQnsList"
              >
                <div className="student-additional-title">
                  <span className="mfl-report-title-left font-24">Not yet</span>
                  {userDetails.role_id === userRole.TEACHER.role_id ? (
                    <span className="mfl-report-title-right">
                      <i
                        className={
                          inCorrectResponseQnsAvgResponseTime <=
                          userData.profile.max_timeout_correct_ans_secs
                            ? "report-timer icon-timer mfl-text-green"
                            : "report-timer icon-timer mfl-text-yellow"
                        }
                        aria-hidden="true"
                      ></i>{" "}
                      <b className="font-24 mr-5">
                        {" "}
                        <AvgResponseTime
                          value={inCorrectResponseQnsAvgResponseTime}
                        />
                      </b>
                      <span className="mt-auto">secs</span>
                    </span>
                  ) : (
                    ""
                  )}
                </div>
                <div className="student-popcont-content-inner">
                  {notYetResponseQnsList.map((qns, i) => {
                    const time_taken_in_second_label =
                      qns.time_taken_in_second === 0 ||
                      qns.time_taken_in_second === 1
                        ? `${qns.time_taken_in_second}  second`
                        : `${qns.time_taken_in_second}  seconds`;
                    return (
                      <>
                        <div
                          className="student-popcont-content-cols"
                          key={`${qns.id}_${i}`}
                        >
                          <div className="student-calc-card mf-danger-teacher">
                            <div className="student-calc-card-title">
                              {" "}
                              {`  ${qns.first_factor} ${
                                mathOperationList[qns.math_operation_id]
                              }
                              ${qns.second_factor}`}
                            </div>
                            {userDetails.role_id ===
                            userRole.TEACHER.role_id ? (
                              <div className="student-calc-card-time">
                                {time_taken_in_second_label}
                              </div>
                            ) : (
                              ""
                            )}
                          </div>
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    );
  }
  const handleCloseStudentDeleteDailog = () => {
    if (isNotyetClicked) {
      history.push("/teacher/students");
      props.close();
    } else {
      props.showClosePopup();
    }
  };

  let totalQuestionList = Object.keys(levelLifterSubmissionReportDetails).length
    ? Object.keys(levelLifterSubmissionReportDetails.questions).reduce(
        (acc, opration) => {
          return [
            ...acc,
            ...levelLifterSubmissionReportDetails.questions[opration],
          ];
        },
        [],
      )
    : [];

  const totalCorrectResponseInTimeQnsList = totalQuestionList.filter(
    qns => qns.correct_answer === qns.answer,
  );

  // const totalCorrectResponseOverTimeQnsList = totalQuestionList.filter(
  //   qns =>
  //     qns.correct_answer === qns.answer &&
  //     qns.time_taken_in_second > userData.profile.max_timeout_correct_ans_secs,
  // );

  const totalInCorrectResponseQnsList = totalQuestionList.filter(
    qns => qns.correct_answer !== qns.answer,
  );

  //based on error count
  let isShowErrorMessage = correctButOverTime <= 3 && errorCount <= 3;

  return (
    <>
      <>
        {/* <LevelLifterCongratulationPopup /> */}
        {/* <!-- Popup modal --> */}
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open student-report-popup">
          {/* <Scrollbar className="popup student-report-popup-inner"> */}
          {/* id="style-4" */}
          <div className="popup student-report-popup-inner" id="style-4">
            <div className="popup-header">
              <div className="popup-header-top">
                <div className="popup-header-left">
                  <h2 className="popup-title">
                    {`${userData.profile.first_name} ${userData.profile.last_name}’s Level Lifter Report Interview Report
`}{" "}
                    <Button
                      type="primary"
                      // disabled={!hasSelected}
                      onClick={handleLevelUp}
                      className={
                        isNotyetClicked
                          ? "btn btn-secondary btn-test-level-up hidden"
                          : "btn btn-secondary btn-test-level-up mr-10 ml-10"
                      }
                      name={"Level up!"}
                      style={{
                        visibility: isNotyetClicked ? "hidden" : "visible",
                      }}
                    />
                    <Button
                      type="primary"
                      // disabled={!hasSelected}
                      onClick={handleNotYet}
                      className={
                        isNotyetClicked
                          ? "btn btn-secondary btn-test-not-yet hidden"
                          : "btn btn-secondary btn-test-not-yet"
                      }
                      name={" Not yet."}
                    />
                  </h2>

                  <div className="popup-header-subtitle">
                    <div className="popup-header-subtitle-inner">
                      Class Name:{" "}
                      <div className="popup-header-subtitle-bold">
                        {userData.profile.class_name}
                      </div>
                    </div>
                    <div className="popup-header-subtitle-inner">
                      Mode:{" "}
                      <div className="popup-header-subtitle-bold">
                        {selectedLevelLearningMode === "1"
                          ? "Addition/Subtraction"
                          : "Multiplication/Division"}
                      </div>
                    </div>
                    <div className="popup-header-subtitle-inner">
                      Level:{" "}
                      {Object.keys(levelLifterSubmissionReportDetails)
                        .length ? (
                        <div className="popup-header-subtitle-bold">
                          {student_learning_mode_id === 1 ? (
                            addSubLevelList[
                              levelLifterSubmissionReportDetails
                                .assigned_level_id
                            ] ? (
                              <>
                                {
                                  addSubLevelList[
                                    levelLifterSubmissionReportDetails
                                      .assigned_level_id
                                  ].sort
                                }{" "}
                                {
                                  addSubLevelList[
                                    levelLifterSubmissionReportDetails
                                      .assigned_level_id
                                  ].descriptors
                                }
                              </>
                            ) : (
                              "-"
                            )
                          ) : mulSubLevelList[
                              levelLifterSubmissionReportDetails
                                .assigned_level_id
                            ] ? (
                            <>
                              {
                                mulSubLevelList[
                                  levelLifterSubmissionReportDetails
                                    .assigned_level_id
                                ].sort
                              }{" "}
                              {
                                mulSubLevelList[
                                  levelLifterSubmissionReportDetails
                                    .assigned_level_id
                                ].descriptors
                              }
                            </>
                          ) : (
                            "-"
                          )}
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
                <div className="popup-header-right">
                  <div className="popup-time">
                    <i className="icon-calender"></i>{" "}
                    {Object.keys(levelLifterSubmissionReportDetails).length &&
                      moment(
                        levelLifterSubmissionReportDetails.submission_created_at,
                      ).format("MMMM DD, YYYY")}
                  </div>
                  <div className="popup-time">
                    <i className="icon-clock"></i>{" "}
                    {Object.keys(levelLifterSubmissionReportDetails).length &&
                      moment(
                        levelLifterSubmissionReportDetails.submission_created_at,
                      ).format("LT")}
                  </div>
                </div>
              </div>
              {userDetails.role_id === userRole.STUDENT.role_id &&
              isShowErrorMessage ? (
                <div
                  className="popup-header-bottom mb-10"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                  }}
                >
                  <div className={"popup-box-wrapper "}>
                    <h6
                      style={{
                        textAlign: "center",
                        fontSize: "24px",
                        padding: "24px 24px",
                        background: "white",
                        borderBottom: "4px solid #50be81",
                        borderRadius: "6px",
                      }}
                    >
                      {
                        "You are very close to passing this level.  Keep up the good work."
                      }
                    </h6>{" "}
                  </div>
                </div>
              ) : (
                ""
              )}

              <div className="popup-header-bottom">
                <div className="legend-wrap">
                  <span className="legend mfl-bg-green"></span>Correct response,
                  fluent{" "}
                  <span className="mfl-text-green ml-5">
                    ({totalCorrectResponseInTimeQnsList.length}/
                    {totalQuestionList.length})
                  </span>
                </div>
                <div className="legend-wrap">
                  <span className="legend mfl-bg-yellow"></span>Not yet{" "}
                  <span className="mfl-text-yellow ml-5">
                    ({totalInCorrectResponseQnsList.length}/
                    {totalQuestionList.length})
                  </span>
                </div>
                {/* <div className="legend-wrap">
                  <span className="legend mfl-bg-red"></span>Incorrect response{" "}
                  <span className="mfl-text-red ml-5">
                    ({totalInCorrectResponseQnsList.length}/
                    {totalQuestionList.length})
                  </span>
                </div> */}
              </div>
              <span
                className="close"
                onClick={() => handleCloseStudentDeleteDailog()}
              >
                &times;
              </span>
            </div>

            <div className="popup-content">
              <div className="popup-content-inner">
                {fetchingLevelLifterQuestionListLoading ? (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20vh",
                      width: "100%",
                    }}
                  >
                    <div className="lds-dual-ring"></div>
                  </div>
                ) : Object.keys(levelLifterSubmissionReportDetails).length ? (
                  Object.keys(levelLifterSubmissionReportDetails.questions).map(
                    (key, index) => {
                      return studentReportCard(
                        key,
                        index,
                        levelLifterSubmissionReportDetails.questions[key],
                      );
                    },
                  )
                ) : (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "20vh",
                      width: "100%",
                      fontSize: "24px",
                    }}
                  >
                    <div>This student has not yet taken a Level Lifter.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
          {/* </Scrollbar> */}
        </div>
        <div className="popup-backface open"></div>
      </>
    </>
  );
}

export default LevelLifterInterviewTestReportDialog;
