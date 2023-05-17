import React, { useState } from "react";
import Layout from "components/Layout";
import { useForm } from "react-hook-form";
import { Link, useParams, useHistory } from "react-router-dom";
import loginPasswordImage from "assets/images/login/password.svg";
import { resetPassword } from "store/action";
import { useDispatch, useSelector } from "react-redux";
import ImageFadeIn from "react-image-fade-in";
import Button from "components/Button";

function TeacherResetPassword(props) {
  let { id } = useParams();
  const dispatch = useDispatch();
  let history = useHistory();

  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");
  const { resetPasswordLoading, resetPasswordError } = useSelector(
    ({ auth }) => auth,
  );

  const { register, handleSubmit, watch, errors } = useForm();

  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };

  //After reset password sucess redirect to thank you page
  const handleResetPasswordSuccess = () => {
    history.push("/thank-you");
  };

  //Reset Password  api call

  const handleSubmitResetPasswordForm = data => {
    const { resetcpassword } = data;
    const body = {
      token: id,
      new_password: resetcpassword,
    };
    if (resetPasswordLoading) return;

    dispatch(resetPassword(body, handleResetPasswordSuccess));
  };

  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector sm-vector">
                <ImageFadeIn
                  src={loginPasswordImage}
                  className="vector-img"
                  alt=""
                />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">
                  Effective and straight-forward strategies for math fact
                  mastery.
                </h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div className="login-cols-inner">
              <h2 className="login-title">Reset Password</h2>
              <form
                name="student-login"
                onSubmit={handleSubmit(handleSubmitResetPasswordForm)}
              >
                <div className="form-group">
                  <div
                    className={
                      errors.resetpassword &&
                      errors.resetpassword.type === "required"
                        ? "input-wrap extra-text input-error"
                        : errors.resetpassword &&
                          errors.resetpassword.type === "pattern"
                        ? "input-wrap extra-text input-error-without-shake"
                        : "input-wrap extra-text"
                    }
                  >
                    <label htmlFor="resetpassword" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>New
                      password
                    </label>
                    <input
                      type={
                        showPassword && activeInputFieldID === "resetpassword"
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter new password"
                      // className="input-field"
                      name="resetpassword"
                      id="resetpassword"
                      className={
                        watch("resetpassword")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      })}
                    />
                    <i
                      className={
                        showPassword && activeInputFieldID === "resetpassword"
                          ? "icon-hide show-password-icon"
                          : "icon-view show-password-icon"
                      }
                      aria-hidden="true"
                      onClick={() => handleToggleShowPassword("resetpassword")}
                    ></i>
                    {errors.resetpassword &&
                      errors.resetpassword.type === "required" && (
                        <span className="error">Please enter password.</span>
                      )}
                    {errors.resetpassword &&
                      errors.resetpassword.type === "pattern" && (
                        <span className="error">
                          Required: 8 characters, including UPPER/lowercase and
                          numeric.
                        </span>
                      )}
                  </div>
                </div>
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      (errors.resetcpassword &&
                        errors.resetcpassword.type === "required") ||
                      (errors &&
                        watch("resetpassword") &&
                        watch("resetcpassword") &&
                        !watch("resetpassword").startsWith(
                          watch("resetcpassword"),
                        ) &&
                        watch("resetpassword") !== watch("resetcpassword"))
                        ? "input-wrap extra-text input-error"
                        : "input-wrap extra-text"
                    }
                  >
                    <label htmlFor="resetcpassword" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>Confirm
                      password
                    </label>
                    <input
                      type={
                        showPassword && activeInputFieldID === "resetcpassword"
                          ? "text"
                          : "password"
                      }
                      placeholder="Re-enter new password"
                      name="resetcpassword"
                      id="resetcpassword"
                      ref={register({
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      })}
                      className={
                        watch("resetcpassword")
                          ? "input-field"
                          : "input-field input-error"
                      }
                    />
                    <i
                      className={
                        showPassword && activeInputFieldID === "resetcpassword"
                          ? "icon-hide show-password-icon"
                          : "icon-view show-password-icon"
                      }
                      aria-hidden="true"
                      onClick={() => handleToggleShowPassword("resetcpassword")}
                    ></i>
                    {errors.resetcpassword && (
                      <p>{errors.resetcpassword.message}</p>
                    )}
                    {errors.resetcpassword &&
                      errors.resetcpassword.type === "required" && (
                        <span className="error">
                          Please confirm your new password.
                        </span>
                      )}
                    {errors &&
                      watch("resetpassword") &&
                      watch("resetcpassword") &&
                      !watch("resetpassword").startsWith(
                        watch("resetcpassword") &&
                          watch("resetpassword") !== watch("resetcpassword"),
                      ) && (
                        <span className="error">
                          Please make sure the passwords match.
                        </span>
                      )}
                  </div>
                </div>
                {resetPasswordError && (
                  <div className="error-text">
                    <span>{resetPasswordError}</span>
                  </div>
                )}
                <div className="form-group pt-10">
                  <Button
                    name={"Reset"}
                    className="btn btn-primary button-full"
                    type="submit"
                  />
                </div>
                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    <Link to="/teacher/login" className="link">
                      Return to Teacher Login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default TeacherResetPassword;
