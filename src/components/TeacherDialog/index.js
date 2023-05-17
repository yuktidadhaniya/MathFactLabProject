import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ReactGA from "react-ga";
import { handleClassCodeError } from "store/action";
import { useSelector, useDispatch } from "react-redux";
import { addNewClassCode } from "store/action";
import { editTeachers } from "toolkit/slice/teachers";
import {
  teacherLearningModeList,
  teacherLearningAdminModeList,
} from "config/const";
// import Button from "components/Button";
import { capitalizeFirstLetter } from "utils/helpers";
import { Modal, Button, Select } from "antd";
import "assets/sass/components/button-ant.scss";

const TeacherDialog = props => {
  //Set Value for Edit Student
  const dispatch = useDispatch();

  const {
    open,
    isEditMode,
    loading,

    activeTeacherList,
  } = props;

  const defaultValues = {
    last_name: "",
    first_name: "",
    is_admin_verified: "",
    is_email_verified: "",
  };

  const handleCloseTeacherDialog = () => {
    props.closeClassCodePopup();
  };

  const { register, handleSubmit, watch, errors, setValue } = useForm({
    defaultValues,
  });
  const [selectedTeacherLearningMode, setSelectTeacherLearningMode] = useState(
    teacherLearningModeList.value,
  );

  const [selectedAdminLearningMode, setSelectedAdminLearningMode] = useState(
    teacherLearningModeList.value,
  );

  useEffect(() => {
    if (isEditMode) {
      console.log("useEffect called", activeTeacherList);
      setValue("last_name", activeTeacherList.profile.last_name);
      setValue("first_name", activeTeacherList.profile.first_name);
    }
  }, []);

  useEffect(() => {
    if (isEditMode) {
      setSelectTeacherLearningMode(+activeTeacherList.is_email_verified);
      setSelectedAdminLearningMode(+activeTeacherList.is_admin_verified);
    }
  }, []);

  useEffect(() => {
    dispatch(handleClassCodeError());
  }, []); // eslint-disable-line

  const handleSuccess = data => {
    props.closeClassCodePopup();
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Teacher Class Event`,
        action: isEditMode
          ? `Teacher edited  class ${data.last_name},${data.first_name}`
          : `Teacher added class ${data.last_name},${data.first_name}`,
        label: "Teacher Dashboard",
      });
    }
  };
  const handleChangeLearningMode = value => {
    setSelectTeacherLearningMode(value);
  };
  const handleChangeAdminMode = value => {
    console.log("value", value);
    setSelectedAdminLearningMode(value);
  };

  const handleSubmitLoginForm = data => {
    const {
      first_name,
      last_name,
      is_admin_verified,
      is_email_verified,
    } = data;
    if (isEditMode) {
      const body = {
        is_admin_verified: selectedAdminLearningMode,
        is_email_verified: selectedTeacherLearningMode,
        profile: {
          first_name: first_name,
          last_name: last_name,
        },
      };

      dispatch(editTeachers(activeTeacherList.id, body, handleSuccess(data)));
    } else {
      const body = {
        classes: [
          {
            first_name: first_name,
            last_name: last_name,
            is_admin_verified: selectedAdminLearningMode,
            is_email_verified: selectedTeacherLearningMode,
          },
        ],
      };

      dispatch(addNewClassCode(body, handleSuccess(data)));
    }
  };

  return (
    <>
      <Modal
        className="class-code-popup"
        visible={open}
        title={isEditMode ? "Edit Teacher " : "New Teacher"}
        // destroyOnClose={true}
        onCancel={() => handleCloseTeacherDialog()}
        // closable={false}

        footer={null}
        key="modal"
      >
        <form
          // className="popup"
          onSubmit={handleSubmit(handleSubmitLoginForm)}
        >
          <div className="popup-content">
            <div className="form-group">
              <div
                className={
                  errors.last_name && errors.last_name.type === "required"
                    ? "form-input input-error"
                    : "form-input "
                }
              >
                <label className="input-label" htmlFor="fname">
                  First name
                </label>
                <input
                  type="text"
                  id="last_name"
                  className={
                    watch("first_name") &&
                    errors.first_name &&
                    errors.first_name.type !== "pattern"
                      ? "form-control"
                      : "form-control input-error"
                  }
                  // style={{ textTransform: "uppercase" }}
                  placeholder="Please enter first name"
                  autoFocus
                  style={{
                    textTransform: "capitalize",
                  }}
                  name="first_name"
                  ref={register({
                    required: true,
                    setValueAs: value => capitalizeFirstLetter(value),
                    pattern: /^[a-zA-Z0-9'-]*$/,
                  })}
                  // onBlur={() => handleSetUserNamePassword()}
                />
                {errors.first_name && errors.first_name.type === "required" && (
                  <span className="error">Please enter First name.</span>
                )}
                <div>
                  <label className="input-label" htmlFor="lname">
                    Last name
                  </label>
                  <input
                    type="text"
                    id="first_name"
                    className={
                      watch("last_name") &&
                      errors.last_name &&
                      errors.last_name.type !== "pattern"
                        ? "form-control"
                        : "form-control input-error"
                    }
                    style={{
                      textTransform: "capitalize",
                    }}
                    placeholder="Please enter last name"
                    name="last_name"
                    ref={register({
                      required: true,
                      setValueAs: value => capitalizeFirstLetter(value),
                      pattern: /^[a-zA-Z0-9'-]*$/,
                    })}
                    // onBlur={() => handleSetUserNamePassword()}
                  />
                  {errors.last_name && errors.last_name.type === "required" && (
                    <span className="error">Please enter First name.</span>
                  )}
                </div>

                <div>
                  <div className="form-group">
                    <div className="form-input">
                      <label
                        className="input-label"
                        htmlFor="  is_email_verified"
                      >
                        is_email_verified
                      </label>

                      <Select
                        name=" is_email_verified"
                        value={selectedTeacherLearningMode}
                        options={teacherLearningModeList}
                        onChange={handleChangeLearningMode}
                        placeholder="Select is_email_verified..."
                      />

                      {setSelectTeacherLearningMode &&
                        !setSelectTeacherLearningMode && (
                          <span className="error">
                            Please enter is_email_verified.
                          </span>
                        )}
                    </div>
                  </div>
                  <div className="form-group">
                    <div className="form-input">
                      <label
                        className="input-label"
                        htmlFor="  is_admin_verified"
                      >
                        is_admin_verified
                      </label>

                      <Select
                        name=" is_admin_verified"
                        value={selectedAdminLearningMode}
                        options={teacherLearningAdminModeList}
                        onChange={handleChangeAdminMode}
                        placeholder="Select is_admin_verified..."
                      />

                      {setSelectTeacherLearningMode &&
                        !setSelectTeacherLearningMode && (
                          <span className="error">
                            Please enter is_admin_verified.
                          </span>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div style={{ height: "24px" }}></div>
          <div
            style={{
              position: "absolute",
              width: "100%",
              right: "0",
              borderBottom: "1px solid #f0f0f0",
            }}
          ></div>
          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <div className="button-cols">
                  <Button
                    size="small"
                    onClick={() => handleCloseTeacherDialog()}
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
              {isEditMode ? (
                <div className="button-cols">
                  <Button
                    type="primary"
                    size="small"
                    htmlType="submit"
                    disabled={loading}
                  >
                    Save
                  </Button>
                </div>
              ) : (
                <div className="button-cols">
                  <Button
                    type="primary"
                    htmlType="submit"
                    size="small"
                    disabled={loading}
                  >
                    Create
                  </Button>
                </div>
              )}
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default TeacherDialog;
