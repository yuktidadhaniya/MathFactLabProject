import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ReactGA from "react-ga";
import { teacherSignup } from "store/action";
import Layout from "components/Layout";
import teacherLoginImg from "assets/images/login/teacher-login.svg";
import ImageFadeIn from "react-image-fade-in";
import { capitalizeFirstLetter } from "utils/helpers";
import { userRole } from "config/const";
import Button from "components/Button";
import GoogleLogin from "components/GoogleLogin";
import { Switch } from "antd";
import StopUserSignupPopup from "components/StopUserSignupPopup";

function TeacherSignup(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  const recaptchaRef = React.useRef();

  const [isShowReCaptchaError, setIsShowReCaptchaError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isTeacherLogin, setIsTeacherLogin] = useState(true);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");

  const { register, handleSubmit, watch, errors } = useForm();

  const { teacherSignupLoading, teacherSignupError } = useSelector(
    ({ auth }) => auth,
  );

  //after sign up page success redirect to students page
  const handleGoogleTeacherSignUpSuccess = () => {
    history.push("/teacher/students");
    ReactGA.event({
      category: "Teacher Register",
      action: `Teacher clicked to Signup`,
      label: "Teacher Dashboard",
    });
  };

  const handleTeacherSignUpSuccess = () => {
    history.push("/thank-you?login=true");
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}:Teacher Register`,
        action: `Teacher clicked to Signup`,
        label: "Teacher Dashboard",
      });

      window.gtag("event", "conversion", {
        send_to: "AW-299468019/HvUgCLDkv-MDEPOJ5o4B",
      });
    }
  };

  const handleLoginFailure = () => {
    recaptchaRef.current.reset();
  };

  //signup page api call
  const handleSubmitLoginForm = async data => {
    const token = await recaptchaRef.current.executeAsync();
    if (teacherSignupLoading) return;
    const { tsemail, tsname, tspassword, tslname, confirmpassword } = data;
    if (tspassword !== confirmpassword) return;

    if (token) {
      const body = {
        email: tsemail,
        user_name: tsemail,
        password: tspassword,
        role_id: isTeacherLogin
          ? userRole.TEACHER.role_id
          : userRole.PARENT.role_id,
        profile: {
          email: tsemail,
          first_name: tsname,
          last_name: tslname,
        },
      };
      setIsShowReCaptchaError(false);
      dispatch(
        teacherSignup(body, handleTeacherSignUpSuccess, handleLoginFailure),
      );
    } else {
      setIsShowReCaptchaError(true);
    }

    sessionStorage.setItem("user-mail", tsemail);
  };

  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };

  const onChangeSelectTeacherLogin = checked => {
    setIsTeacherLogin(checked);
    localStorage.setItem("is_teacher_login", checked);
  };

  return (
    <>
      <Layout>
        <ReCAPTCHA
          size={"invisible"}
          sitekey={process.env.REACT_APP_GOOGLE_SITE_KEY}
          ref={recaptchaRef}
        />
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector">
                <ImageFadeIn
                  src={teacherLoginImg}
                  className="vector-img"
                  alt=""
                />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">
                  Help your students master the basic math facts with this
                  strategy-based approach.
                </h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div
              className={`login-cols-inner ${
                isTeacherLogin ? "teacher-switch" : "parent-switch"
              }`}
            >
              <h2 className="login-title">
                {isTeacherLogin
                  ? "Create Teacher Account"
                  : "Create Parent Account"}
              </h2>
              <p className="font-18 text-center login-subtext">
                Parent{" "}
                <Switch defaultChecked onChange={onChangeSelectTeacherLogin} />{" "}
                Teacher
              </p>
              <form
                name="student-login"
                onSubmit={handleSubmit(handleSubmitLoginForm)}
              >
                <div className="social-group">
                  <GoogleLogin
                    handleSuccess={handleGoogleTeacherSignUpSuccess}
                  />
                </div>
                <div className="text-separator">
                  <span className="txt-sep">or</span>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.tslname && errors.tslname.type === "required"
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="tslname" className="input-label">
                      <i className="icon-user" aria-hidden="true"></i>Last name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your last name"
                      name="tslname"
                      id="tslname"
                      className={
                        watch("tslname")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      style={{ textTransform: "capitalize" }}
                      ref={register({
                        required: true,
                        setValueAs: value => capitalizeFirstLetter(value),
                      })}
                      disabled={teacherSignupLoading}
                    />
                    {errors.tslname && errors.tslname.type === "required" && (
                      <span className="error">
                        Please enter your last name.
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.tsname && errors.tsname.type === "required"
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="tsname" className="input-label">
                      <i className="icon-user" aria-hidden="true"></i>First name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your first name"
                      name="tsname"
                      id="tsname"
                      style={{ textTransform: "capitalize" }}
                      className={
                        watch("tsname")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({
                        required: true,
                        setValueAs: value => capitalizeFirstLetter(value),
                      })}
                      disabled={teacherSignupLoading}
                    />
                    {errors.tsname && errors.tsname.type === "required" && (
                      <span className="error">
                        Please enter your first name.
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      (errors.tsemail && errors.tsemail.type === "required") ||
                      (errors.tsemail && errors.tsemail.type === "pattern")
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="tsemail" className="input-label">
                      <i className="icon-envelope" aria-hidden="true"></i>Email
                    </label>
                    <input
                      // type="email"
                      placeholder="Enter your email address"
                      name="tsemail"
                      id="tsemail"
                      className={
                        watch("tsemail")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      })}
                      disabled={teacherSignupLoading}
                    />
                    {errors.tsemail && errors.tsemail.type === "required" && (
                      <span className="error">Please enter email.</span>
                    )}
                    {errors.tsemail && errors.tsemail.type === "pattern" && (
                      <span className="error">
                        Please enter a valid email address.
                      </span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.tspassword && errors.tspassword.type === "required"
                        ? "input-wrap input-error"
                        : errors.tspassword &&
                          errors.tspassword.type === "pattern"
                        ? "input-wrap input-error-without-shake"
                        : "input-wrap"
                    }
                  >
                    <label htmlFor="tspassword" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>Password
                    </label>

                    <input
                      type={
                        showPassword && activeInputFieldID === "tspassword"
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      name="tspassword"
                      id="tspassword"
                      className={
                        watch("tspassword")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      disabled={teacherSignupLoading}
                      ref={register({
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      })}
                    />
                    <i
                      className={
                        showPassword && activeInputFieldID === "tspassword"
                          ? "icon-hide show-password-icon"
                          : "icon-view show-password-icon"
                      }
                      aria-hidden="true"
                      onClick={() => handleToggleShowPassword("tspassword")}
                    ></i>
                    {errors.tspassword &&
                      errors.tspassword.type === "required" && (
                        <span className="error">Please enter password.</span>
                      )}
                    {errors.tspassword &&
                      errors.tspassword.type === "pattern" && (
                        <span className="error">
                          Required: 8 characters, including UPPER/lowercase and
                          numeric.
                        </span>
                      )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      (errors.confirmpassword &&
                        errors.confirmpassword.type === "required") ||
                      (watch("tspassword") &&
                        watch("confirmpassword") &&
                        !watch("tspassword").startsWith(
                          watch("confirmpassword"),
                        ) &&
                        watch("tspassword") !== watch("confirmpassword"))
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="confirmpassword" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>Confirm
                    </label>
                    <input
                      type={
                        showPassword && activeInputFieldID === "confirmpassword"
                          ? "text"
                          : "password"
                      }
                      placeholder="Confirm password"
                      name="confirmpassword"
                      id="confirmpassword"
                      className={
                        watch("confirmpassword")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      })}
                      disabled={teacherSignupLoading}
                    />
                    <i
                      className={
                        showPassword && activeInputFieldID === "confirmpassword"
                          ? "icon-hide show-password-icon"
                          : "icon-view show-password-icon"
                      }
                      aria-hidden="true"
                      onClick={() =>
                        handleToggleShowPassword("confirmpassword")
                      }
                    ></i>
                    {errors.confirmpassword &&
                      errors.confirmpassword.type === "required" && (
                        <span className="error">
                          Please confirm your new password.
                        </span>
                      )}

                    {errors &&
                      watch("tspassword") &&
                      watch("confirmpassword") &&
                      !watch("tspassword").startsWith(
                        watch("confirmpassword") &&
                          watch("tspassword") !== watch("confirmpassword"),
                      ) && (
                        <span className="error">
                          Please make sure the passwords match.
                        </span>
                      )}
                  </div>
                </div>
                <div className="form-group">
                  <span className="agreement-text">
                    By signing up I agree to the{" "}
                    <a
                      href="https://www.mathfactlab.com/terms-of-service/"
                      className="link"
                    >
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="https://www.mathfactlab.com/privacy-policy/"
                      className="link"
                    >
                      Privacy Policy.
                    </a>
                  </span>
                </div>
                {teacherSignupError && (
                  <div className="error-text">
                    <span>{teacherSignupError}</span>
                  </div>
                )}

                {isShowReCaptchaError && (
                  <div className="error-text">
                    <span>Something went wrong!</span>
                  </div>
                )}
                <div className="form-group pt-10">
                  <Button
                    name={"Signup"}
                    className="btn btn-primary button-full"
                    type="submit"
                    disabled={
                      teacherSignupLoading ||
                      process.env.REACT_APP_IS_DISABLE_SIGNUP === "YES"
                    }
                  />
                </div>
                <div className="form-group text-center">
                  <p className="font-18">
                    <Link to="/teacher/login" className="link">
                      {" "}
                      Already have an account?
                    </Link>
                  </p>
                </div>
                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    Not a teacher?{" "}
                    <Link to="/student/login" className="link">
                      {" "}
                      Student login
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>

      {process.env.REACT_APP_IS_DISABLE_SIGNUP === "YES" && (
        <>
          <StopUserSignupPopup />
        </>
      )}
    </>
  );
}

export default TeacherSignup;
