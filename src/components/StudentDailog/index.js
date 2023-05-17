import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addNewUser, editUser, handleUserError } from "store/action";
import { useSelector, useDispatch } from "react-redux";
import ReactGA from "react-ga";
import Select from "components/ReactSelect";
import {
  // autoTimeoutSecList,
  maxTimeoutAnswerCountList,
  studentLearningModeList,
  mulSubLevelList,
  addSubLevelList,
  studentPasswordList,
  booleanOptionsList,
  levelLifterWhoopsiesList,
  // FOR JUST TESTING PURPOSE
  devSessionTimeLimitList,
  studentSessionTimeLimitList,
} from "config/const";
import {
  randomTwoDigitNumberGeneratior,
  capitalizeFirstLetter,
} from "utils/helpers";
import ConfirmationDailog from "components/ConfirmationDailog";
import { userRole } from "config/const";
// import Button from "components/Button";
import { Divider, Drawer, Button, Space, Tooltip, Switch } from "antd";
import "assets/sass/components/button-ant.scss";

function StudentDialog(props) {
  const dispatch = useDispatch();
  const { isEditMode, activeUser, searchClassCode } = props;

  const { classCodeList } = useSelector(({ classCode }) => classCode);

  let addSubLevelOptionsList = Object.values(addSubLevelList).filter(
    level => level.isAvailable === true,
  );

  let mulDivLevelOptionsList = Object.values(mulSubLevelList).filter(
    level => level.isAvailable === true,
  );

  const addSubLevelListOption = Object.values(addSubLevelOptionsList).map(
    lvl => {
      return {
        label: `${lvl.label}  ${lvl.descriptors}`,
        value: lvl.value,
      };
    },
  );

  const mulDivLevelListOption = Object.values(mulDivLevelOptionsList).map(
    lvl => {
      return {
        label: `${lvl.label}  ${lvl.descriptors}`,
        value: lvl.value,
      };
    },
  );

  const classCodeListOption = [
    { label: "", value: null },
    ...classCodeList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code,
      };
    }),
  ];

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
  const [isActiveMathOpration, setIsActiveMathOpration] = useState(false);
  const [activeSelectedLevel, setActiveSelectedLevel] = useState(false);

  const [
    isShowErrorSelectedClassCode,
    setShowErrorSelectedClassCode,
  ] = useState(false);

  const [
    selectedLevelLifterWhoopsiesLimit,
    setSelectedLevelLifterWhoopsiesLimit,
  ] = useState(levelLifterWhoopsiesList[2].value);

  const [selectedClassCode, setSelectClassCode] = useState("");

  const defaultValues = {
    // auto_timeout_for_question: "",
    first_name: "",
    last_name: "",
    max_retry_count_to_attempt_question: "",
    password: "",
    user_name: "",
    autoTimeoutSec: null,
  };

  const {
    register,
    watch,
    errors,
    setValue,
    clearErrors,
    handleSubmit,
  } = useForm({
    mode: "onChange",
    shouldUnregister: false,
    reValidateMode: "onChange",
    defaultValues,
  });

  useEffect(() => {
    dispatch(handleUserError());
  }, []); // eslint-disable-line

  useEffect(() => {
    console.log("isEditMode", isEditMode);
    if (isEditMode) {
      console.log("useEffect called", activeUser);
      setValue("first_name", activeUser.profile.first_name);
      setValue("last_name", activeUser.profile.last_name);
      setValue("user_name", activeUser.user_name);
      setValue("password", activeUser.profile.password);
    }
  }, []); // eslint-disable-line

  console.log("watch-first_name", watch("first_name"));
  console.log("watch-last_name", watch("last_name"));

  useEffect(() => {
    isEditMode
      ? setSelectClassCode(activeUser.profile.class_code)
      : setSelectClassCode(
          searchClassCode ||
            (classCodeListOption.length &&
              classCodeListOption[1] &&
              classCodeListOption[1].value) ||
            "",
        );
  }, []); // eslint-disable-line

  // useEffect(() => {
  //   if (isEditMode) {
  //     setSelectRetryCount(+activeUser.max_retry_count_to_attempt_question);
  //   }
  // }, []);

  useEffect(() => {
    if (isEditMode) {
      setSelectMaxTimeout(+activeUser.profile.max_timeout_correct_ans_secs);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isEditMode) {
      setSelectLearningMode(+activeUser.profile.student_learning_mode_id);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isEditMode) {
      setSelectMulSubLevel(activeUser.profile.mul_div_level_id);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isEditMode) {
      setSelectAddSubLevel(activeUser.profile.add_sub_level_id);
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isEditMode) {
      setSelectedSessionTimeLimit(activeUser.profile.session_time_limit);
      setSelectedLevelLifterWhoopsiesLimit(
        activeUser.profile.allowed_level_lifter_whoopsies,
      );
    }
  }, []); // eslint-disable-line

  useEffect(() => {
    if (isEditMode) {
      setIsEnabledLevelLifter(activeUser.profile.is_level_lifter_lock);
      setIsEnabledSuperLevelLifter(
        activeUser.profile.is_super_level_lifter_lock,
      );
    }
  }, []); // eslint-disable-line
  //Set Value for Edit Student

  const handleCloseStudentDailog = () => {
    props.closeStudentPopup();
  };

  const handleSuccess = data => {
    const { first_name, last_name } = data;

    props.closeStudentPopup();
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Teacher Student  Event`,
        action: isEditMode
          ? `Teacher edited student ${last_name} ${first_name}`
          : `Teacher added student ${last_name} ${first_name} `,
        label: "Teacher Dashboard",
      });
    }
  };

  const loading = addNewStudentLoading || editUserDetailsLoading;

  // const [autoTimeOutOptions, setAutoTimeOutOptions] = useState(
  //   autoTimeoutSecList,
  // );

  // #static
  // const [selectedAutoTime, setSelectAutoTime] = useState("");

  // const [selectedRetryCount, setSelectRetryCount] = useState(
  //   retryCountList[0].value,
  // );
  const [selectedMaxTimeout, setSelectMaxTimeout] = useState(
    maxTimeoutAnswerCountList[2].value,
  );

  const [selectedLearningMode, setSelectLearningMode] = useState(
    studentLearningModeList[0].value,
  );
  const [selectedMulSubLevel, setSelectMulSubLevel] = useState(
    mulSubLevelList[0].value,
  );
  const [selectedAddSubLevel, setSelectAddSubLevel] = useState(
    addSubLevelList[0].value,
  );

  const [isEnabledLevelLifter, setIsEnabledLevelLifter] = useState(
    booleanOptionsList[1].value,
  );

  const [isEnabledSuperLevelLifter, setIsEnabledSuperLevelLifter] = useState(0);

  const handleSubmitLoginForm = data => {
    if (isShowError) return;
    if (!selectedClassCode) {
      setShowErrorSelectedClassCode(true);
      return;
    }

    if (isEditMode) {
      const { first_name, last_name, user_name, password } = data;

      const body = {
        ...(activeUser.user_name !== user_name && { user_name }),
        ...(activeUser.profile.password !== password && { password }),
        ...(activeUser.class_code !== selectedClassCode && {
          class_code: selectedClassCode,
        }),

        ...(activeUser.profile.first_name !== first_name && { first_name }),

        ...(activeUser.profile.last_name !== last_name && { last_name }),
        ...(activeUser.profile.class_code !== selectedClassCode && {
          class_code: selectedClassCode,
        }),
        ...(activeUser.profile.student_learning_mode_id !==
          selectedLearningMode && {
          student_learning_mode_id: selectedLearningMode,
        }),
        ...(activeUser.profile.add_sub_level_id !== selectedAddSubLevel && {
          add_sub_level_id: selectedAddSubLevel,
        }),
        ...(activeUser.profile.mul_div_level_id !== selectedMulSubLevel && {
          mul_div_level_id: selectedMulSubLevel,
        }),
        ...(activeUser.profile.max_timeout_correct_ans_secs !==
          selectedMaxTimeout && {
          max_timeout_correct_ans_secs: selectedMaxTimeout,
        }),
        ...(activeUser.profile.session_time_limit !==
          selectedSessionTimeLimit && {
          session_time_limit: selectedSessionTimeLimit,
        }),
        ...(activeUser.profile.max_timeout_correct_ans_secs !==
          selectedMaxTimeout && {
          auto_timeout_for_question: selectedMaxTimeout * 6,
        }),
        ...(activeUser.profile.allowed_level_lifter_whoopsies !==
          selectedLevelLifterWhoopsiesLimit && {
          allowed_level_lifter_whoopsies: selectedLevelLifterWhoopsiesLimit,
        }),

        ...(activeUser.profile.is_level_lifter_lock !==
          isEnabledLevelLifter && {
          is_level_lifter_lock: isEnabledLevelLifter,
        }),
        ...(activeUser.profile.is_super_level_lifter_lock !==
          isEnabledSuperLevelLifter && {
          is_super_level_lifter_lock: isEnabledSuperLevelLifter + "",
        }),
      };
      // auto_timeout_for_question: "",
      // first_name: "",
      // last_name: "",
      // max_retry_count_to_attempt_question: "",
      // password: "",
      // user_name: "",
      // autoTimeoutSec: null,
      dispatch(editUser(activeUser.id, body, handleSuccess(data)));
    } else {
      const { first_name, last_name, password, user_name } = data;

      const body = {
        user_name,
        password,
        role_id: userRole.STUDENT.role_id,
        profile: {
          first_name,
          last_name,
          class_code: selectedClassCode,
          student_learning_mode_id: selectedLearningMode,
          auto_timeout_for_question: selectedMaxTimeout * 6,
          // by default  max retry count 1
          max_retry_count_to_attempt_question: 1,
          session_time_limit: selectedSessionTimeLimit,
          allowed_level_lifter_whoopsies: selectedLevelLifterWhoopsiesLimit,

          max_timeout_correct_ans_secs: selectedMaxTimeout,
          // add_sub_level_id: selectedAddSubLevel,
          // mul_div_level_id: selectedMulSubLevel,
        },
      };

      dispatch(addNewUser(body, handleSuccess(data)));
    }
  };

  //FOR JUST TESTING NOW ASSIGN DEV LIST

  let sessionTimeLimitList =
    process.env.REACT_APP_ENV === "development"
      ? devSessionTimeLimitList
      : studentSessionTimeLimitList;
  const [selectedSessionTimeLimit, setSelectedSessionTimeLimit] = useState(
    sessionTimeLimitList[3].value,
  );

  // const handleChangeTimeOut = e => {
  //   setSelectAutoTime(e.target.value);
  // };

  const handleChangeClassCode = e => {
    setSelectClassCode(e.target.value);
    setShowErrorSelectedClassCode(false);
  };

  // const handleChangeRetryCount = e => {
  //   setSelectRetryCount(e.target.value);
  // };
  const handleChangeMaxTimeout = e => {
    // if (e.target.value >= selectedAutoTime) {
    //   let updatedAutoTimeoutSecOptionsList = [];
    //   updatedAutoTimeoutSecOptionsList = autoTimeoutSecList.filter(
    //     option => option.value >= e.target.value,
    //   );
    //   setAutoTimeOutOptions(updatedAutoTimeoutSecOptionsList);

    //   setSelectAutoTime(updatedAutoTimeoutSecOptionsList[0].value);
    // }

    setSelectMaxTimeout(e.target.value);
  };
  const handleChangeLearningMode = e => {
    setSelectLearningMode(e.target.value);
  };

  const handleChangeSessionTimeLimit = e => {
    setSelectedSessionTimeLimit(e.target.value);
  };

  const handleChangeLevelLifterWhoopsiesLimit = e => {
    setSelectedLevelLifterWhoopsiesLimit(e.target.value);
  };

  const handleChangeMulSubLevel = e => {
    setIsShowConfirmationDailog(true);
    setIsActiveMathOpration(2);
    setActiveSelectedLevel(e.target.value);
    // setSelectMulSubLevel(e.target.value);
  };
  const handleChangeAddSubLevel = e => {
    setIsShowConfirmationDailog(true);
    setIsActiveMathOpration(1);
    setActiveSelectedLevel(e.target.value);

    // setSelectAddSubLevel(e.target.value);
  };

  Math.floor(Math.random() * 10);

  // useEffect(() => {
  //   if (!isEditMode) {
  //     const rendomValue = Math.floor(
  //       Math.random() * (studentPasswordList.length - 0 + 1) + 0,
  //     );
  //     setValue(
  //       "password",
  //       studentPasswordList[rendomValue] + (Math.random() * 100).toFixed(0),
  //     );
  //   }
  // }, []);

  // useEffect(() => {}, [watch("first_name"), watch("last_name")]);

  const handleSetUserNamePassword = () => {
    if (
      watch("first_name") &&
      watch("last_name") &&
      !watch("user_name") &&
      !isEditMode
    ) {
      let updatedUserNameByFnameLname =
        watch("first_name")
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .charAt(0)
          .toLowerCase() +
        watch("last_name")
          .replace(/[^a-zA-Z0-9 ]/g, "")
          .replaceAll(" ", "")
          .toLowerCase();

      const sameUserNameList = studentList.filter(user =>
        user.user_name.startsWith(updatedUserNameByFnameLname),
      );

      let maxNum = 0;
      sameUserNameList.forEach(user => {
        if (+user.user_name.replace(/^\D+/g, "") > +maxNum) {
          maxNum = +user.user_name.replace(/^\D+/g, "");
        }
      });

      let user_name = maxNum
        ? `${updatedUserNameByFnameLname}${maxNum + 1}`
        : sameUserNameList.length
        ? `${updatedUserNameByFnameLname}${sameUserNameList.length}`
        : updatedUserNameByFnameLname;

      setValue("user_name", user_name);
      clearErrors("user_name");
    }

    if (
      watch("first_name") &&
      watch("last_name") &&
      !watch("password") &&
      !isEditMode
    ) {
      const randomValue = Math.floor(
        Math.random() * (studentPasswordList.length - 0 + 1) + 0,
      );
      setValue(
        "password",
        studentPasswordList[randomValue] + randomTwoDigitNumberGeneratior(),
      );
      clearErrors("password");
    }
  };

  // useEffect(() => {
  //   if (
  //     watch("First_name") &&
  //     activeUser.first_name !== watch("first_name") &&
  //     studentList.find(
  //       student =>
  //         student.first_name === watch("first_name") &&
  //         student.profile.class_code === selectedClassCode,
  //     )
  //   ) {
  //     setShowError(true);
  //   } else {
  //     setShowError(false);
  //   }
  // }, [watch("first_name"), selectedClassCode]); // eslint-disable-line

  useEffect(() => {
    console.log("isEditMode", isEditMode);
    if (isEditMode) {
      console.log("useEffect called", activeUser);
      setValue("first_name", activeUser.profile.first_name);
      setValue("last_name", activeUser.profile.last_name);
      setValue("user_name", activeUser.user_name);
      setValue("password", activeUser.profile.password);
    }
  }, []);
  const handleCloseConfirmationDailog = () => {
    setIsShowConfirmationDailog(false);
  };

  const handleSetActiveSelectedLevel = () => {
    if (isActiveMathOpration === 1) {
      setSelectAddSubLevel(activeSelectedLevel);
      setIsShowConfirmationDailog(false);
    } else {
      setSelectMulSubLevel(activeSelectedLevel);

      setIsShowConfirmationDailog(false);
    }
  };

  const handleSuperLevelLifterLock = change => {
    setIsEnabledSuperLevelLifter(change ? 1 : 0);
  };
  return (
    <div>
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
      {/* <div className="custom-popup open"> */}
      <Drawer
        closable={false}
        className="student-drawer-wrapper"
        title={isEditMode ? "Edit Student " : "New Student"}
        footer={null}
        visible={true}
        width={700}
        onClose={handleCloseStudentDailog}
        extra={
          <>
            <Space>
              <Button
                size="small"
                onClick={() => handleCloseStudentDailog()}
                disabled={loading}
              >
                Cancel
              </Button>

              {isEditMode ? (
                <Button
                  type="primary"
                  size="small"
                  htmlType="submit"
                  disabled={loading}
                  form="student-form"
                >
                  Save
                </Button>
              ) : (
                <Button
                  type="primary"
                  htmlType="submit"
                  form="student-form"
                  size="small"
                  disabled={loading}
                >
                  Add student
                </Button>
              )}
            </Space>
          </>
        }
      >
        <form
          className="edit-student-form"
          id="student-form"
          onSubmit={handleSubmit(handleSubmitLoginForm)}
        >
          {/* <div className="popup-header">
              <h3 className="popup-title">
                {isEditMode ? "Edit Student " : "New Student"}
              </h3>
              <span
                className="close"
                onClick={() => handleCloseStudentDailog()}
              >
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div> */}

          <div className="popup-content">
            <Divider
              orientation="left"
              orientationMargin="0"
              style={{ fontWeight: "bold" }}
            >
              Profile
            </Divider>
            <div className="form-group">
              <div
                className={
                  (errors.last_name && errors.last_name.type === "required") ||
                  (errors.last_name && errors.last_name.type === "pattern")
                    ? "form-input input-error"
                    : "form-input "
                }
              >
                <label className="input-label" htmlFor="lname">
                  Last name
                </label>
                <input
                  type="text"
                  id="lname"
                  className={
                    watch("last_name") &&
                    errors.last_name &&
                    errors.last_name.type !== "pattern"
                      ? "form-control"
                      : "form-control input-error"
                  }
                  // style={{ textTransform: "uppercase" }}
                  // placeholder="Please enter last name"
                  autoFocus
                  style={{
                    textTransform: "capitalize",
                  }}
                  name="last_name"
                  ref={register({
                    required: true,
                    setValueAs: value => capitalizeFirstLetter(value),
                    pattern: /^[a-zA-Z0-9'-]*$/,
                  })}
                  onBlur={() => handleSetUserNamePassword()}
                />
                {errors.last_name && errors.last_name.type === "required" && (
                  <span className="error">Please enter last name.</span>
                )}
                {errors.last_name && errors.last_name.type === "pattern" && (
                  <span className="error">
                    Please enter alphabetic and numeric characters only.
                  </span>
                )}
              </div>
              <div
                className={
                  (errors.first_name &&
                    errors.first_name.type === "required") ||
                  (errors.first_name && errors.first_name.type === "pattern")
                    ? "form-input input-error"
                    : "form-input "
                }
              >
                <label className="input-label" htmlFor="fname">
                  First name
                </label>
                <input
                  type="text"
                  id="fname"
                  className={
                    watch("first_name") &&
                    errors.first_name &&
                    errors.first_name.type !== "pattern"
                      ? "form-control"
                      : "form-control input-error"
                  }
                  style={{
                    textTransform: "capitalize",
                  }}
                  // placeholder="Please enter first name"
                  name="first_name"
                  ref={register({
                    required: true,
                    setValueAs: value => capitalizeFirstLetter(value),
                    pattern: /^[a-zA-Z0-9'-]*$/,
                  })}
                  onBlur={() => handleSetUserNamePassword()}
                />
                {errors.first_name && errors.first_name.type === "required" && (
                  <span className="error">Please enter first name.</span>
                )}
                {errors.first_name && errors.first_name.type === "pattern" && (
                  <span className="error">
                    Please enter alphabetic and numeric characters only.
                  </span>
                )}
              </div>
            </div>

            <div className="form-group">
              <div
                className={
                  (errors.user_name && errors.user_name.type === "required") ||
                  isShowError
                    ? "form-input input-error"
                    : "form-input "
                }
              >
                <label className="input-label" htmlFor="user_name">
                  Username
                </label>
                <input
                  type="text"
                  id="user_name"
                  className={
                    watch("user_name") || isShowError
                      ? "form-control"
                      : "form-control input-error"
                  }
                  placeholder="Please enter username"
                  name="user_name"
                  ref={register({
                    required: true,
                    pattern: /^[a-zA-Z0-9]*$/,
                  })}
                />
                {errors.user_name && errors.user_name.type === "required" && (
                  <span className="error">Please enter username.</span>
                )}
                {errors.user_name && errors.user_name.type === "pattern" && (
                  <span className="error">
                    Please enter alphabetic and numeric characters only.
                  </span>
                )}
                {isShowError && (
                  <span className="error">
                    Username is already assigned to another student.
                  </span>
                )}
              </div>
              <div
                className={
                  errors.password && errors.password.type === "required"
                    ? "form-input input-error"
                    : errors.password && errors.password.type === "minLength"
                    ? "form-input input-error-without-shake"
                    : "form-input"
                }
              >
                <label className="input-label" htmlFor="fpass">
                  Password
                </label>
                <input
                  type="text"
                  id="fpass"
                  className={
                    watch("password")
                      ? "form-control"
                      : "form-control input-error"
                  }
                  placeholder="Please enter password"
                  name="password"
                  ref={register({
                    required: true,
                    minLength: 5,
                  })}
                />

                {errors.password && errors.password.type === "required" && (
                  <span className="error">Please enter password.</span>
                )}
                {errors.password && errors.password.type === "minLength" && (
                  <span className="error">
                    Student passwords must be at least five characters.
                  </span>
                )}
              </div>
            </div>

            <Divider
              orientation="left"
              style={{ fontWeight: "bold", marginTop: "40px" }}
              orientationMargin="0"
            >
              Settings
            </Divider>
            {/* {isEditMode && ( */}
            <div className="form-group">
              <div className="form-input">
                <label className="input-label" htmlFor="selectedClassCode">
                  Class code
                </label>

                <Select
                  name="selectedClassCode"
                  value={selectedClassCode && selectedClassCode}
                  options={classCodeListOption}
                  onChange={handleChangeClassCode}
                  placeholder="Select class code..."
                />

                {isShowErrorSelectedClassCode && !selectedClassCode && (
                  <span className="error">Please select class code.</span>
                )}
              </div>
              <div className="form-input">
                <label
                  className="input-label"
                  htmlFor="student_learning_mode_id"
                >
                  Student learning mode
                  <Tooltip
                    overlayClassName="ant-tooltip-right-input"
                    title="In MathFactLab, students learn addition and subtraction together or multiplication and division together.  We call these ‘learning modes’.  Select the mode you would like this student to work on currently.  Learning modes can be switched at any time without loss of data."
                  >
                    <b>?</b>
                  </Tooltip>
                </label>

                <Select
                  name="learningMode"
                  value={selectedLearningMode}
                  options={studentLearningModeList}
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
            {/* )} */}

            {isEditMode && (
              <div className="form-group">
                {selectedAddSubLevel !== null &&
                selectedAddSubLevel !== "null" &&
                selectedAddSubLevel !== "" ? (
                  <div className="form-input">
                    <label className="input-label" htmlFor="add_sub_level_id">
                      +/- Level
                      <Tooltip
                        overlayClassName="ant-tooltip-reset-counter"
                        title="Select this option if you wish to override the student’s current placement in the addition/subtraction mode."
                      >
                        <b>?</b>
                      </Tooltip>
                    </label>

                    <Select
                      name="learningMode"
                      value={selectedAddSubLevel}
                      options={addSubLevelListOption}
                      onChange={handleChangeAddSubLevel}
                      placeholder="+/- Level"
                    />
                    {selectedAddSubLevel && !selectedAddSubLevel && (
                      <span className="error">Please enter +/- level.</span>
                    )}
                  </div>
                ) : (
                  ""
                )}
                {selectedMulSubLevel !== null &&
                selectedMulSubLevel !== "null" &&
                selectedMulSubLevel !== "" ? (
                  <div className="form-input">
                    <label className="input-label" htmlFor="fname">
                      x/÷ Level
                      <Tooltip
                        overlayClassName="ant-tooltip-right-input"
                        title="Select this option if you wish to override the student’s current placement in the multiplication/division mode."
                      >
                        <b>?</b>
                      </Tooltip>
                    </label>

                    <Select
                      name="learningMode"
                      value={selectedMulSubLevel}
                      options={mulDivLevelListOption}
                      onChange={handleChangeMulSubLevel}
                      placeholder="x/÷ Level"
                    />
                    {selectedMulSubLevel && !selectedMulSubLevel && (
                      <span className="error">Please enter x/÷ level.</span>
                    )}
                  </div>
                ) : (
                  ""
                )}
              </div>
            )}
            {isEditMode && (
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
                    options={maxTimeoutAnswerCountList}
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
                        classes={{
                          tooltip: classes.tooltip,
                        }}
                      >
                        <b>?</b>
                      </Tooltip>
                    </label>

                    <Select
                      name="autoTimeoutSecList"
                      value={selectedAutoTime}
                      options={autoTimeOutOptions}
                      onChange={handleChangeTimeOut}
                      placeholder="Auto Timeout..."
                    />

                    {!!selectedAutoTime && !selectedAutoTime && (
                      <span className="error">
                        Please enter available time.
                      </span>
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
            )}

            {isEditMode && (
              <div className="form-group">
                <div className="form-input">
                  <label
                    className="input-label"
                    htmlFor="max_timeout_correct_ans_secs"
                  >
                    Session length
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
                    options={sessionTimeLimitList}
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
                            A ‘whoopsie’ is an error on a Level Lifter.
                            <span style={{ marginRight: "2px" }}></span> A late
                            response counts as 1 whoopsie, while an incorrect
                            response counts as 2 whoopsies.
                            <span style={{ marginRight: "4px" }}></span>
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
                      overlayClassName="ant-tooltip-whoopsies"
                    >
                      <b>?</b>
                    </Tooltip>
                  </label>

                  <Select
                    name="allowed_whoopsies"
                    value={selectedLevelLifterWhoopsiesLimit}
                    options={levelLifterWhoopsiesList}
                    onChange={handleChangeLevelLifterWhoopsiesLimit}
                    placeholder="Select Whoopsies..."
                  />

                  {!!selectedLevelLifterWhoopsiesLimit &&
                    !selectedLevelLifterWhoopsiesLimit && (
                      <span className="error">
                        Please select whoopsies limit.
                      </span>
                    )}
                </div>
              </div>
            )}
            {(process.env.REACT_APP_ENV === "development" ||
              process.env.REACT_APP_ENV === "staging") &&
              isEditMode && (
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
        </form>
      </Drawer>
      {/* </div>
        <div className="popup-backface open"></div> */}

      {isShowConfirmationDailog && (
        <ConfirmationDailog
          closeConfirmationDailog={handleCloseConfirmationDailog}
          setActiveSelectedLevel={handleSetActiveSelectedLevel}
          user={activeUser}
          activeMathOpration={isActiveMathOpration}
        />
      )}
    </div>
  );
}

export default StudentDialog;
