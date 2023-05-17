import React, { useState } from "react";
import { Row, Col, Typography, message, Empty, Card, Modal } from "antd";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Section from "components/Section";
import Container from "components/Container";
import {
  updateTeacher,
  updateTeacherPassword,
  removeUserDetails,
} from "store/action";
import Button from "components/Button";
import "assets/sass/components/button-ant.scss";
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Title } = Typography;

const UpdateProfile = () => {
  const dispatch = useDispatch();
  let history = useHistory();

  const { userDetails } = useSelector(({ auth }) => auth);

  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");

  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };

  const { first_name, last_name, email } = userDetails?.profile;

  const defaultValues = {
    first_name,
    last_name,
    email,
    password: "",
  };

  const { register, watch, errors, handleSubmit } = useForm({
    defaultValues,
  });

  const {
    register: passwordRegister,
    watch: passwordWatch,
    errors: passwordErrors,
    handleSubmit: passwordHandleSubmit,
    reset,
  } = useForm({
    defaultValues,
  });

  const handleSubmitUpdateForm = data => {
    const { first_name, last_name } = data;

    const body = {
      profile: {
        first_name,
        last_name,
      },
    };
    dispatch(updateTeacher(body))
      .then(() => {
        message.success("Your profile has been updated successfully.");
      })
      .catch(() => {
        message.error("Something went wrong!");
      });
  };

  const handleUpdatePasswordForm = data => {
    const { new_password, old_password } = data;

    const body = {
      old_password,
      new_password,
    };

    dispatch(updateTeacherPassword(body))
      .then(() => {
        message.success("Your password change successfully.");
      })
      .catch(() => {
        message.error("Old password is not valid.");
      });
    reset();
  };

  const handleRemoveAccount = () => {
    Modal.confirm({
      title: (
        <>
          <div>Are you sure you want to cancel your account?</div>
          <div className="mt-10">
            This will permanently delete your teacher/parent account and all
            associated student accounts. Once selected, this cannot be undone.{" "}
          </div>
        </>
      ),
      icon: <QuestionCircleOutlined />,
      okText: "Permanently delete account",
      width: 500,
      okButtonProps: {
        danger: true,
      },
      onOk() {
        handleRemoveUserAccount();
      },
    });
  };

  const handleRemoveAccountSuccess = () => {
    //  Not clearing all storage for class code
    localStorage.removeItem("user-token");

    sessionStorage.clear();
    history.push("/teacher/login");
  };
  const handleRemoveUserAccount = () => {
    dispatch(removeUserDetails(handleRemoveAccountSuccess));
  };

  const isGoogleUser = userDetails && !!userDetails.is_google_user;

  return (
    <>
      <Row gutter={30}>
        <Col
          lg={isGoogleUser ? 12 : 10}
          xs={24}
          style={{ marginBottom: "30px" }}
        >
          <Container fluid>
            <Section
              title={
                <>
                  <Title level={4} className={"tab-heading"}>
                    Update profile
                  </Title>
                </>
              }
            >
              <form
                name="update-profile-form"
                // className="edit-student-form"
                onSubmit={handleSubmit(handleSubmitUpdateForm)}
                className="user-profile-wrapper"
              >
                <div className="popup-content">
                  <div>
                    <Row gutter={30}>
                      <Col lg={12} xs={12}>
                        <div className="form-group">
                          <div
                            className={
                              (errors.first_name &&
                                errors.first_name.type === "required") ||
                              (errors.first_name &&
                                errors.first_name.type === "pattern")
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
                              autoFocus
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
                              placeholder="Please enter first name"
                              name="first_name"
                              ref={register({
                                required: true,
                                // setValueAs: value => capitalizeFirstLetter(value),
                                pattern: /^[a-zA-Z0-9]*$/,
                              })}
                              // onBlur={() => handleSetUserNamePassword()}
                            />
                            {errors.first_name &&
                              errors.first_name.type === "required" && (
                                <span className="error">
                                  Please enter first name.
                                </span>
                              )}
                            {errors.first_name &&
                              errors.first_name.type === "pattern" && (
                                <span className="error">
                                  Please enter alphabetic and numeric characters
                                  only.
                                </span>
                              )}
                          </div>
                        </div>
                      </Col>
                      <Col lg={12} xs={12}>
                        <div className="form-group">
                          <div
                            className={
                              (errors.last_name &&
                                errors.last_name.type === "required") ||
                              (errors.last_name &&
                                errors.last_name.type === "pattern")
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
                              placeholder="Please enter last name"
                              style={{
                                textTransform: "capitalize",
                              }}
                              name="last_name"
                              ref={register({
                                required: true,
                                // setValueAs: value => capitalizeFirstLetter(value),
                                pattern: /^[a-zA-Z0-9]*$/,
                              })}
                              // onBlur={() => handleSetUserNamePassword()}
                            />
                            {errors.last_name &&
                              errors.last_name.type === "required" && (
                                <span className="error">
                                  Please enter last name.
                                </span>
                              )}
                            {errors.last_name &&
                              errors.last_name.type === "pattern" && (
                                <span className="error">
                                  Please enter alphabetic and numeric characters
                                  only.
                                </span>
                              )}
                          </div>
                        </div>
                      </Col>
                    </Row>

                    <div className="form-group">
                      <div
                        className={
                          (errors.email && errors.email.type === "required") ||
                          (errors.email && errors.email.type === "pattern")
                            ? "form-input input-error"
                            : "form-input "
                        }
                      >
                        <label className="input-label" htmlFor="email">
                          Email
                        </label>
                        <input
                          type="text"
                          id="email"
                          disabled
                          className={
                            watch("email") &&
                            errors.email &&
                            errors.email.type !== "pattern"
                              ? "form-control"
                              : "form-control input-error"
                          }
                          // style={{ textTransform: "uppercase" }}
                          // placeholder="Please enter email"
                          // autoFocus
                          // style={{
                          //   textTransform: "capitalize",
                          // }}
                          name="email"
                          ref={register({
                            required: true,
                            // setValueAs: value => capitalizeFirstLetter(value),
                            // pattern: /^[a-zA-Z]*$/,
                          })}
                          // onBlur={() => handleSetUserNamePassword()}
                        />
                        {errors.email && errors.email.type === "required" && (
                          <span className="error">Please enter email.</span>
                        )}
                        {errors.email && errors.email.type === "pattern" && (
                          <span className="error">
                            Please enter correct email.
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/** <div className="form-group">
            <div
              className={
                (errors.user_name && errors.user_name.type === "required") ||
                isShowError
                  ? "form-input input-error"
                  : "form-input "
              }
            >
              <label className="input-label" htmlFor="Mobile_number">
                Mobile number
              </label>
              <input
                type="text"
                id="Mobile_number"
                className={
                  watch("Mobile_number") || isShowError
                    ? "form-control"
                    : "form-control input-error"
                }
                placeholder="Please enter mobile number"
                name="Mobile_number"
                ref={register({
                  required: true,
                  pattern: /^[0-9]*$/,
                })}
              />
              {errors.Mobile_number &&
                errors.Mobile_number.type === "required" && (
                  <span className="error">Please enter mobile number.</span>
                )}
              {errors.Mobile_number &&
                errors.Mobile_number.type === "pattern" && (
                  <span className="error">
                    Please enter numeric characters only.
                  </span>
                )}
            </div>
          </div>*/}
                </div>

                <div className="popup-footer">
                  <div className="button-wrap">
                    <div className="button-cols">
                      <Button
                        type="submit"
                        className="button-secondary"
                        name={"Update"}
                        // disabled={loading}
                      ></Button>
                    </div>
                  </div>
                </div>
              </form>
            </Section>
          </Container>
        </Col>
        {!isGoogleUser && (
          <Col lg={14} xs={24} style={{ marginBottom: "30px" }}>
            <Container fluid>
              <Section
                title={
                  <>
                    {isGoogleUser ? (
                      <Title level={4} className={"tab-heading"}>
                        Other section
                      </Title>
                    ) : (
                      <Title level={4} className={"tab-heading"}>
                        Update password
                      </Title>
                    )}
                  </>
                }
              >
                {isGoogleUser ? (
                  <Empty description="" />
                ) : (
                  <form
                    name="update-password-form"
                    onSubmit={passwordHandleSubmit(handleUpdatePasswordForm)}
                    className="user-profile-wrapper"
                  >
                    <div className="popup-content">
                      <div>
                        <Row gutter={30}>
                          <Col lg={12} xs={12}>
                            <div className="form-group">
                              <div
                                className={
                                  passwordErrors.old_password &&
                                  (passwordErrors.old_password.type ===
                                    "required" ||
                                    passwordErrors.old_password.type ===
                                      "pattern")
                                    ? "form-input input-error"
                                    : "form-input "
                                }
                              >
                                <label
                                  className="input-label"
                                  htmlFor="old_password"
                                >
                                  Old Password
                                </label>
                                <div className="input-wrap">
                                  <input
                                    type={
                                      showPassword &&
                                      activeInputFieldID === "old_password"
                                        ? "text"
                                        : "password"
                                    }
                                    id="old_password"
                                    className={
                                      passwordWatch("old_password") &&
                                      passwordErrors.old_password
                                        ? "form-control"
                                        : "form-control input-error"
                                    }
                                    name="old_password"
                                    placeholder="Enter your old password"
                                    ref={passwordRegister({
                                      required: true,
                                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    })}
                                  />
                                  <i
                                    className={
                                      showPassword &&
                                      activeInputFieldID === "old_password"
                                        ? "icon-hide show-password-icon"
                                        : "icon-view show-password-icon"
                                    }
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleToggleShowPassword("old_password")
                                    }
                                  ></i>
                                </div>
                                {passwordErrors.old_password &&
                                  passwordErrors.old_password.type ===
                                    "required" && (
                                    <span className="error">
                                      Please enter your old password.
                                    </span>
                                  )}
                                {passwordErrors.old_password &&
                                  passwordErrors.old_password.type ===
                                    "pattern" && (
                                    <span className="error">
                                      Required: 8 characters, including
                                      UPPER/lowercase and numeric.
                                    </span>
                                  )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                        <Row gutter={30}>
                          <Col lg={12} xs={12}>
                            <div className="form-group">
                              <div
                                className={
                                  (passwordErrors.new_password &&
                                    passwordErrors.new_password.type ===
                                      "required") ||
                                  (passwordErrors.new_password &&
                                    passwordErrors.new_password.type ===
                                      "pattern")
                                    ? "form-input input-error"
                                    : "form-input "
                                }
                              >
                                <label
                                  className="input-label"
                                  htmlFor="new_password"
                                >
                                  New Password
                                </label>
                                <div className="input-wrap">
                                  <input
                                    type={
                                      showPassword &&
                                      activeInputFieldID === "new_password"
                                        ? "text"
                                        : "password"
                                    }
                                    id="new_password"
                                    className={
                                      passwordWatch("new_password") &&
                                      passwordErrors.new_password &&
                                      passwordErrors.new_password.type !==
                                        "pattern"
                                        ? "form-control"
                                        : "form-control input-error"
                                    }
                                    placeholder="Enter your new password"
                                    name="new_password"
                                    ref={passwordRegister({
                                      required: true,
                                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    })}
                                  />
                                  <i
                                    className={
                                      showPassword &&
                                      activeInputFieldID === "new_password"
                                        ? "icon-hide show-password-icon"
                                        : "icon-view show-password-icon"
                                    }
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleToggleShowPassword("new_password")
                                    }
                                  ></i>
                                </div>
                                {passwordErrors.new_password &&
                                  passwordErrors.new_password.type ===
                                    "required" && (
                                    <span className="error">
                                      Please enter new password.
                                    </span>
                                  )}
                                {passwordErrors.new_password &&
                                  passwordErrors.new_password.type ===
                                    "pattern" && (
                                    <span className="error">
                                      Required: 8 characters, including
                                      UPPER/lowercase and numeric.
                                    </span>
                                  )}
                              </div>
                            </div>
                          </Col>
                          <Col lg={12} xs={12}>
                            <div className="form-group">
                              <div
                                className={
                                  (passwordErrors.confirm_password &&
                                    passwordErrors.confirm_password.type ===
                                      "required") ||
                                  (passwordWatch("new_password") &&
                                    passwordWatch("confirm_password") &&
                                    passwordWatch("new_password") !==
                                      passwordWatch("confirm_password"))
                                    ? "form-input input-error"
                                    : "form-input"
                                }
                              >
                                <label
                                  className="input-label"
                                  htmlFor="confirm_password"
                                >
                                  Confirm Password
                                </label>
                                <div className="input-wrap">
                                  <input
                                    type={
                                      showPassword &&
                                      activeInputFieldID === "confirm_password"
                                        ? "text"
                                        : "password"
                                    }
                                    id="confirm_password"
                                    className={
                                      passwordWatch("confirm_password")
                                        ? "form-control"
                                        : "form-control input-error"
                                    }
                                    placeholder="Confirm password"
                                    name="confirm_password"
                                    ref={passwordRegister({
                                      required: true,
                                      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
                                    })}
                                  />
                                  <i
                                    className={
                                      showPassword &&
                                      activeInputFieldID === "confirm_password"
                                        ? "icon-hide show-password-icon"
                                        : "icon-view show-password-icon"
                                    }
                                    aria-hidden="true"
                                    onClick={() =>
                                      handleToggleShowPassword(
                                        "confirm_password",
                                      )
                                    }
                                  ></i>
                                </div>
                                {passwordErrors.confirm_password &&
                                  passwordErrors.confirm_password.type ===
                                    "required" && (
                                    <span className="error">
                                      Please confirm your new password.
                                    </span>
                                  )}
                                {passwordErrors &&
                                  passwordWatch("new_password") &&
                                  passwordWatch("confirm_password") &&
                                  passwordWatch("new_password") !==
                                    passwordWatch("confirm_password") && (
                                    <span className="error">
                                      Please make sure the passwords match.
                                    </span>
                                  )}
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    </div>

                    <div className="popup-footer">
                      <div className="button-wrap">
                        <div className="button-cols">
                          <Button
                            type="submit"
                            className="button-secondary"
                            name={"Update"}
                            form="update-password-form"
                          ></Button>
                        </div>
                      </div>
                    </div>
                  </form>
                )}
              </Section>
            </Container>
          </Col>
        )}

        <Col lg={isGoogleUser ? 12 : 10} xs={24}>
          <Card title="Delete account" bordered={false}>
            <Col>
              <div
                className="user-profile-remove-text"
                onClick={handleRemoveAccount}
              >
                <div>Delete teacher/parent account </div>
                <div>(and all associated student accounts)</div>
              </div>
            </Col>

            <div className="mt-15">
              This option is permanent and cannot be undone
            </div>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default UpdateProfile;
