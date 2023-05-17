import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { editMultipleUser, handleUserError } from "store/action";
import { useSelector, useDispatch } from "react-redux";
import Select from "components/ReactSelect";
import {
  // autoTimeoutSecList,
  maxTimeoutAnswerCountList,
  studentLearningModeList,
  levelLifterWhoopsiesList,

  // FOR JUST TESTING PURPOSE
  devSessionTimeLimitList,
  studentSessionTimeLimitList,
} from "config/const";
import { Tooltip, Switch } from "antd";
import ConfirmationDailog from "components/ConfirmationDailog";
import { userRole } from "config/const";
import Button from "components/Button";

function StudentDailog(props) {
  const dispatch = useDispatch();
  const { isEditMode, activeUser, selectedStudentIDList } = props;

  const { studentList: studentUserList } = useSelector(({ user }) => user);

  const {
    addNewStudentLoading,
    addNewUserError,
    editUserDetailsLoading,
    studentList,
  } = useSelector(({ user }) => user);

  // const { userDetails } = useSelector(({ auth }) => auth);

  const [isShowError, setShowError] = useState(false);

  const [isShowConfirmationDailog, setIsShowConfirmationDailog] = useState(
    false,
  );

  const filterSelectedStudentList = studentUserList.filter(student =>
    selectedStudentIDList.join(",").includes(student.id),
  );

  const loading = addNewStudentLoading || editUserDetailsLoading;

  // const [autoTimeOutOptions, setAutoTimeOutOptions] = useState(
  //   autoTimeoutSecList,
  // );
  // const [selectedAutoTime, setSelectAutoTime] = useState("");

  // const [selectedRetryCount, setSelectRetryCount] = useState(
  //   retryCountList[0].value,
  // );
  const [selectedMaxTimeout, setSelectMaxTimeout] = useState("");
  const [selectedLearningMode, setSelectLearningMode] = useState("");

  //FOR JUST TESTING NOW ASSIGN DEV LIST

  let sessionTimeLimitList =
    process.env.REACT_APP_ENV === "development"
      ? devSessionTimeLimitList
      : studentSessionTimeLimitList;
  const [selectedSessionTimeLimit, setSelectedSessionTimeLimit] = useState("");

  const [
    selectedLevelLifterWhoopsiesLimit,
    setSelectedLevelLifterWhoopsiesLimit,
  ] = useState("");
  const [isEnabledSuperLevelLifter, setIsEnabledSuperLevelLifter] = useState(0);
  const defaultValues = {
    // auto_timeout_for_question: "",
    max_retry_count_to_attempt_question: "",
    user_name: "",
    student_learning_mode_id: "",
    session_time_limit: "",
    max_timeout_correct_ans_secs: "",
    allowed_level_lifter_whoopsies: "",
    is_super_level_lifter_lock: 0,
  };

  const { handleSubmit, watch } = useForm({
    defaultValues,
  });

  useEffect(() => {
    dispatch(handleUserError());
  }, []); // eslint-disable-line

  //Set Value for Edit Student

  const handleCloseStudentDailog = () => {
    props.closeStudentPopup();
  };

  const handleSuccess = () => {
    props.closeStudentPopup();
  };

  const handleSubmitLoginForm = data => {
    if (isShowError) return;

    const body = {
      role_id: userRole.STUDENT.role_id,
      profile: {
        ...(defaultValues.student_learning_mode_id !== selectedLearningMode && {
          student_learning_mode_id: selectedLearningMode,
        }),
        // ...(defaultValues.auto_timeout_for_question !== selectedAutoTime && {
        //   auto_timeout_for_question: selectedAutoTime,
        // }),
        ...(defaultValues.max_timeout_correct_ans_secs !==
          selectedMaxTimeout && {
          max_timeout_correct_ans_secs: selectedMaxTimeout,
        }),
        ...(defaultValues.session_time_limit !== selectedSessionTimeLimit && {
          session_time_limit: selectedSessionTimeLimit,
        }),
        ...(defaultValues.allowed_level_lifter_whoopsies !==
          selectedLevelLifterWhoopsiesLimit && {
          allowed_level_lifter_whoopsies: selectedLevelLifterWhoopsiesLimit,
        }),
        ...(defaultValues.is_super_level_lifter_lock !==
          isEnabledSuperLevelLifter && {
          is_super_level_lifter_lock: isEnabledSuperLevelLifter + "",
        }),
      },
    };
    dispatch(editMultipleUser(selectedStudentIDList, body, handleSuccess));
  };

  // const handleChangeTimeOut = e => {
  //   setSelectAutoTime(e.target.value);
  // };

  const handleChangeMaxTimeout = e => {
    // let updatedAutoTimeoutSecOptionsList = [];
    // updatedAutoTimeoutSecOptionsList = autoTimeoutSecList.filter(
    //   option => option.value >= e.target.value,
    // );

    // setAutoTimeOutOptions(updatedAutoTimeoutSecOptionsList);

    // setSelectAutoTime(updatedAutoTimeoutSecOptionsList[0].value);

    setSelectMaxTimeout(e.target.value);
  };
  const handleChangeLearningMode = e => {
    setSelectLearningMode(e.target.value);
  };

  const handleChangeSessionTimeLimit = e => {
    setSelectedSessionTimeLimit(e.target.value);
  };

  Math.floor(Math.random() * 10);

  useEffect(() => {
    if (
      watch("user_name") &&
      activeUser.user_name !== watch("user_name") &&
      studentList.find(student => student.user_name === watch("user_name"))
    ) {
      setShowError(true);
    } else {
      setShowError(false);
    }
  }, [watch("user_name")]); // eslint-disable-line

  //set default session time same if all selected student have same session time limit
  useEffect(() => {
    if (
      filterSelectedStudentList.every(
        (val, i, arr) =>
          val.profile.session_time_limit === arr[0].profile.session_time_limit,
      )
    ) {
      setSelectedSessionTimeLimit(
        +filterSelectedStudentList[0].profile.session_time_limit,
      );
    }
  }, []); // eslint-disable-line

  const handleCloseConfirmationDailog = () => {
    setIsShowConfirmationDailog(false);
  };

  const handleSetActiveSelectedLevel = () => {
    setIsShowConfirmationDailog(false);
  };

  const handleChangeLevelLifterWhoopsiesLimit = e => {
    setSelectedLevelLifterWhoopsiesLimit(e.target.value);
  };

  const handleSuperLevelLifterLock = change => {
    setIsEnabledSuperLevelLifter(change ? 1 : 0);
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open">
          <form
            className="popup"
            onSubmit={handleSubmit(handleSubmitLoginForm)}
          >
            <div className="popup-header">
              <h3 className="popup-title">
                {isEditMode ? "Edit Student " : "Edit Student"}
              </h3>
              <span
                className="close"
                onClick={() => handleCloseStudentDailog()}
              >
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content">
              <div className="form-group">
                <div className="form-input">
                  <label
                    className="input-label"
                    htmlFor="student_learning_mode_id"
                  >
                    Student learning mode
                    <Tooltip
                      overlayClassName="ant-tooltip-reset-counter"
                      title="In MathFactLab, students learn addition and subtraction together or multiplication and division together.  We call these ‘learning modes’.  Select the mode you would like this student to work on currently.  Learning modes can be switched at any time without loss of data."
                    >
                      <b>?</b>
                    </Tooltip>
                  </label>

                  <Select
                    name="learningMode"
                    value={selectedLearningMode}
                    options={[
                      { value: "", label: "" },
                      ...studentLearningModeList,
                    ]}
                    onChange={handleChangeLearningMode}
                    placeholder="Select Learning Mode..."
                  />

                  {selectedLearningMode && !selectedLearningMode && (
                    <span className="error">
                      Please enter student learning mode.
                    </span>
                  )}
                </div>
              </div>
              <div className="form-group">
                <div className="form-input">
                  <label
                    className="input-label"
                    htmlFor="max_timeout_correct_ans_secs"
                  >
                    Required fluency rate
                    <Tooltip
                      overlayClassName="ant-tooltip-reset-counter"
                      title="This option allows you to change the number of seconds by which a student must accurately and consistently respond to a math fact prompt to be considered fluent.  Our default setting for this is 4 seconds.  See our FAQ for further details and suggestions."
                    >
                      <b>?</b>
                    </Tooltip>
                  </label>

                  <Select
                    name="maxTimeout"
                    value={selectedMaxTimeout}
                    options={[
                      { value: "", label: "" },
                      ...maxTimeoutAnswerCountList,
                    ]}
                    onChange={handleChangeMaxTimeout}
                    placeholder="Select Timeout..."
                  />

                  {!!selectedMaxTimeout && !selectedMaxTimeout && (
                    <span className="error">
                      Please enter required fluency rate.
                    </span>
                  )}
                </div>
                {/* <div className="form-input">
                  <label className="input-label" htmlFor="auto_timeout">
                    Available time
                    <Tooltip
                      title="By default, questions on the placement test automatically advance after 10 seconds if no response has been given.  Use this option to override the default for students who may need additional time."
                      classes={{ tooltip: classes.tooltip }}
                    >
                      <b>?</b>
                    </Tooltip>
                  </label>
                  <Select
                    name="autoTimeoutSecList"
                    value={selectedAutoTime}
                    options={[{ value: "", label: "" }, ...autoTimeOutOptions]}
                    onChange={handleChangeTimeOut}
                    placeholder="Auto Timeout..."
                  />
                  {!!selectedAutoTime && !selectedAutoTime && (
                    <span className="error">Please enter available time.</span>
                  )}
                </div> */}

                {/* retry count comment for sending by default 3 */}
                {/* <div className="form-input">
                    <label
                      className="input-label"
                      htmlFor="max_retry_count_to_attempt_question"
                    >
                      Retry Count
                    </label>
                    <Select
                      name="retryCount"
                      value={selectedRetryCount}
                      options={retryCountList}
                      onChange={handleChangeRetryCount}
                      placeholder="Retry Count..."
                    />
                    {selectedRetryCount && !selectedRetryCount && (
                      <span className="error">Please enter retry count</span>
                    )}
                  </div> */}
              </div>
              <div className="form-group">
                <div className="form-input">
                  <label
                    className="input-label"
                    htmlFor="max_timeout_correct_ans_secs"
                  >
                    Session Time Limit
                    <Tooltip
                      overlayClassName="ant-tooltip-reset-counter"
                      title="This determines how many minutes a student can practice on MathFactLab before being logged off.  Like with most things, we believe short and frequent practice is the key to success.  When the time runs out, students will be able to finish the activity they are working on."
                    >
                      <b>?</b>
                    </Tooltip>
                  </label>

                  <Select
                    name="maxTimeout"
                    value={selectedSessionTimeLimit}
                    options={[
                      { value: "", label: "" },
                      ...sessionTimeLimitList,
                    ]}
                    onChange={handleChangeSessionTimeLimit}
                    placeholder="Select Session Limit..."
                  />

                  {!!selectedMaxTimeout && !selectedMaxTimeout && (
                    <span className="error">
                      Please enter session time limit.
                    </span>
                  )}
                </div>
                <div className="form-input">
                  <label className="input-label" htmlFor="allowed_whoopsies">
                    Level Lifter Whoopsies
                    <Tooltip
                      title={
                        <div>
                          <p>
                            A ‘whoopsie’ is an error on a Level Lifter.{" "}
                            <span style={{ marginRight: "2px" }}></span>A late
                            response counts as 1 whoopsie, while an incorrect
                            response counts as 2 whoopsies.{" "}
                            <span style={{ marginRight: "2px" }}></span>
                            Allowing, for example, 4 whoopsies means that a
                            student could respond late to up to 4 prompts or
                            answer 2 incorrectly (or a combination totalling up
                            to 4 whoopsies) and still pass the Level Lifter.
                          </p>
                          <p>
                            For most students,
                            <span style={{ fontWeight: "800" }}>
                              <span style={{ marginRight: "4px" }}></span>
                              we recommend 2 or less whoopsies.
                            </span>
                          </p>
                          <p>
                            The ‘Staggered’ option increases the number of
                            allowed ‘whoopsies’ by 2 with each Level Lifter
                            attempt - up to a total of 8 on the fourth or more
                            Level Lifter attempt.
                          </p>
                          <p>
                            Providing flexibility in passing requirements helps
                            struggling students stay motivated.
                          </p>
                        </div>
                      }
                      overlayClassName="ant-tooltip-reset-counter"
                    >
                      <b>?</b>
                    </Tooltip>
                  </label>

                  <Select
                    name="allowed_whoopsies"
                    value={selectedLevelLifterWhoopsiesLimit}
                    options={[
                      { value: "", label: "" },
                      ...levelLifterWhoopsiesList,
                    ]}
                    onChange={handleChangeLevelLifterWhoopsiesLimit}
                    placeholder="Select Whoopsies..."
                  />

                  {!!selectedLevelLifterWhoopsiesLimit &&
                    !selectedLevelLifterWhoopsiesLimit && (
                      <span className="error">
                        Please select whoopsies limit.
                      </span>
                    )}
                </div>{" "}
              </div>
              {(process.env.REACT_APP_ENV === "development" ||
                process.env.REACT_APP_ENV === "staging") && (
                <div className="form-group">
                  <div className="form-input">
                    <label
                      className="input-label"
                      htmlFor="max_timeout_correct_ans_secs"
                    >
                      Super-Advanced Level Lifters {"    "}
                      <Switch
                        checkedChildren="off"
                        unCheckedChildren="on"
                        checked={isEnabledSuperLevelLifter}
                        onChange={e => {
                          handleSuperLevelLifterLock(e);
                        }}
                        style={{
                          backgroundColor:
                            isEnabledSuperLevelLifter === 0
                              ? "#52c41a"
                              : "#f5222d",
                          backgroundImage: "none",
                        }}
                      />{" "}
                      <Tooltip
                        overlayClassName="ant-tooltip-reset-counter"
                        title="By default, students are not given Level Lifters on Super-Advanced and Super-Duper Advanced stages.  This is to make these stages accessible and passable for most students.  For gifted students, who need a real challenge, we recommend turning these on. You could also turn on these Level Lifters after students have reached the graduate level once without them."
                      >
                        <b>?</b>
                      </Tooltip>
                    </label>
                  </div>
                </div>
              )}
              {!!addNewUserError && (
                <div className="error-text" style={{ paddingBottom: "0px" }}>
                  <span>{addNewUserError}</span>
                </div>
              )}
            </div>

            <div className="popup-footer">
              <div className="button-wrap">
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-gray"
                    name={"Cancel"}
                    disabled={loading}
                    onClick={() => handleCloseStudentDailog()}
                  />
                </div>

                <div className="button-cols">
                  <Button
                    type="submit"
                    className="btn btn-secondary"
                    name={"Save"}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="popup-backface open"></div>

        {isShowConfirmationDailog && (
          <ConfirmationDailog
            closeConfirmationDailog={handleCloseConfirmationDailog}
            setActiveSelectedLevel={handleSetActiveSelectedLevel}
            user={activeUser}
          />
        )}
      </>
    </>
  );
}

export default StudentDailog;
