import React, { useEffect } from "react";
import { getSubmissionDetails } from "store/action";
import { useSelector, useDispatch } from "react-redux";

import { levels } from "config/const";
import AvgResponseTime from "components/AvgResponseTime";
function StudentReportDailog(props) {
  const { user, learning_mode } = props;
  const dispatch = useDispatch();

  useEffect(() => {
    const body = {
      id: user.id,
      profile: {
        student_learning_mode_id: learning_mode,
      },
    };
    dispatch(getSubmissionDetails(body, "only_attepmpted"));
  }, [dispatch, user]); // eslint-disable-line

  const { submissionDetails, fetchingSubmissionDetailsLoading } = useSelector(
    ({ quiz }) => quiz,
  );

  const handleCloseStudentDeleteDailog = () => {
    props.closeReportDailog();
  };

  function studentReportCardResult(level, questionLevel) {
    return (
      <>
        {questionLevel.length ? (
          <div key={level} style={{ width: "100%" }}>
            <h6 className="level-title">{levels[level]}</h6>
            <div className="avg-time-title">
              <AvgResponseTime
                value={
                  +(
                    questionLevel.reduce((acc, question) => {
                      return acc + +question.time_taken_in_second;
                    }, 0) / questionLevel.length
                  ).toFixed(1)
                }
              />
            </div>

            <hr style={{ width: "100%" }} />
            <span>
              <span
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                }}
              >
                {questionLevel.map((quetion, i) => {
                  const time_taken_in_second_label =
                    quetion.time_taken_in_second === 0 ||
                    quetion.time_taken_in_second === 1
                      ? `${quetion.time_taken_in_second}  second`
                      : `${quetion.time_taken_in_second}  seconds`;

                  if (!quetion.is_correct) {
                    return (
                      <div className="m-2 badge-danger" key={i}>
                        <span>{`${quetion.question} = ${
                          quetion.answer ? quetion.answer : "EMPTY"
                        }`}</span>
                        <span className="suffix">
                          {time_taken_in_second_label}
                        </span>
                      </div>
                    );
                  } else if (
                    quetion.time_taken_in_second <=
                    user.profile.max_timeout_correct_ans_secs
                  ) {
                    return (
                      <span className="m-2 badge-success" key={i}>
                        <span>
                          {`${quetion.question} = ${
                            quetion.answer ? quetion.answer : "EMPTY"
                          }`}
                        </span>
                        <span className="suffix">
                          {time_taken_in_second_label}{" "}
                        </span>
                      </span>
                    );
                  } else {
                    return (
                      <span className="m-2 badge-warning" key={i}>
                        <span>
                          {`${quetion.question} = ${
                            quetion.answer ? quetion.answer : "EMPTY"
                          }`}{" "}
                        </span>
                        <span className="suffix">
                          {time_taken_in_second_label}{" "}
                        </span>{" "}
                      </span>
                    );
                  }
                })}
                <hr
                  style={{
                    width: "100%",
                    marginTop: "0px",
                    visibility: "hidden",
                  }}
                />
                <br />
              </span>
            </span>
          </div>
        ) : (
          ""
        )}
      </>
    );
  }

  function studentReportCard(level, questionLevel) {
    return (
      <div className="report-card" key={level}>
        <h6 style={{ textAlign: "center", fontSize: "24px" }}>{level}</h6>
        <hr style={{ width: "100%" }} />
        <span>
          <span
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            {Object.keys(questionLevel).map(level => {
              return studentReportCardResult(level, questionLevel[level]);
            })}
          </span>
        </span>
      </div>
    );
  }

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open">
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Student Report</h3>
              <span
                className="close"
                onClick={() => handleCloseStudentDeleteDailog()}
              >
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content" style={{ padding: "20px 20px" }}>
              {fetchingSubmissionDetailsLoading ? (
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
              ) : submissionDetails.length ? (
                Object.keys(
                  submissionDetails[0].question_answer_groupby_level,
                ).map(key => {
                  return studentReportCard(
                    key,
                    submissionDetails[0].question_answer_groupby_level[key],
                  );
                })
              ) : (
                ""
              )}
            </div>
            <div className="popup-footer">
              <div className="flex" style={{ marginBottom: "6px" }}>
                {" "}
                <div className="m-2  success"> {`              `} </div>{" "}
                <span className="ml-2">Correct response, fluent </span>
              </div>
              <div className="flex" style={{ marginBottom: "6px" }}>
                {" "}
                <div className="m-2  warning"></div>
                <span className="ml-2">Correct response, not yet fluent</span>
              </div>
              <div className="flex mb-2">
                {" "}
                <div className="m-2  danger"></div>
                <span className="ml-2"> Incorrect response </span>
              </div>
            </div>
          </div>
        </div>
        <div className="popup-backface open"></div>
      </>
    </>
  );
}

export default StudentReportDailog;
