import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ReactGA from "react-ga";
import moment from "moment";
import ClassLinkLogin from "components/ClassLinkLogin";
import { studentLogin, startSession } from "store/action";
import Layout from "components/Layout";
import studentLoginImg from "assets/images/student-login.svg";
import ImageFadeIn from "react-image-fade-in";
import Button from "components/Button";

const StudentLogin = props => {
  let history = useHistory();
  const dispatch = useDispatch();

  const { studentLoginError, studentLoginLoading } = useSelector(
    ({ auth }) => auth,
  );

  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");

  const { register, handleSubmit, watch, errors } = useForm({
    defaultValues: { classcode: localStorage.getItem("class_code") || "" },
  });
  //After student login success redirection
  function handleLoginSuccess(userDetails) {
    dispatch(startSession());
    sessionStorage.setItem("isSessionStarted", true);
    sessionStorage.setItem(
      "session_start_date",
      moment().format("YYYY-MM-DD HH:mm"),
    );
    const {
      profile: { student_learning_mode_id, add_sub_level_id, mul_div_level_id },
    } = userDetails;
    //redirection base on level
    // if student has done practice test then redirected to practice session otherwise on placement test
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Student Login`,
        action: `Student clicked to Login`,
        label: "Student page",
      });
    }
    if (
      (student_learning_mode_id === 1 && !!add_sub_level_id) ||
      (student_learning_mode_id === 2 && !!mul_div_level_id)
    ) {
      history.replace("/student/practice-select-activity");
    } else {
      history.replace("/student/placement-test");
    }
  }
  useEffect(() => {
    if (watch("classcode")) {
      localStorage.setItem("class_code", watch("classcode"));
    }
  }, [watch("classcode")]); // eslint-disable-line

  //login api call
  const handleSubmitLoginForm = async data => {
    if (studentLoginLoading) return;

    const { username, password, classcode } = data;

    const body = {
      user_name: username,
      password: password,
      class_code: classcode,
    };

    dispatch(studentLogin(body, handleLoginSuccess));
  };
  const handleToggleShowPassword = inputFieldID => {
    setActiveInputFieldID(inputFieldID);
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    document.getElementById("beacon-container") &&
      (document.getElementById("beacon-container").style.display = "none");
  }, []);

  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector">
                <ImageFadeIn
                  src={studentLoginImg}
                  className="vector-img"
                  alt=""
                />
              </div>
              <div className="login-vector-text">
                <h4 className="h4 text-white font-normal">
                  Master your math facts with this strategy-based approach.
                </h4>
              </div>
            </div>
          </div>
          <div className="login-cols">
            <div className="login-cols-inner">
              <h2 className="login-title">Student Login</h2>
              {/* <p className="font-18 text-center login-subtext">
                Manage, track, and report on student progress quickly and
                easily.
              </p> */}
              <div className="social-group">
                <ClassLinkLogin />
              </div>

              <div className="text-separator">
                <span className="txt-sep">or</span>
              </div>
              <form
                name="student-login"
                onSubmit={handleSubmit(handleSubmitLoginForm)}
              >
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      errors.classcode && errors.classcode.type === "required"
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="classcode" className="input-label">
                      {/* <img src={classcodeImg} alt="classcodeImg" /> */}
                      <i
                        className="icon-code-lock"
                        aria-hidden="true"
                        style={{ fontSize: "22px", opacity: "0.8" }}
                      ></i>
                      Class Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your class code"
                      name="classcode"
                      id="classcode"
                      className={
                        watch("classcode")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({ required: true })}
                    />

                    {errors.classcode &&
                      errors.classcode.type === "required" && (
                        <span className="error">Please enter classcode.</span>
                      )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.username && errors.username.type === "required"
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="username" className="input-label">
                      <i className="icon-user" aria-hidden="true"></i>Username
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your username"
                      className={
                        watch("username")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      name="username"
                      id="username"
                      ref={register({ required: true })}
                    />
                    {errors.username && errors.username.type === "required" && (
                      <span className="error">Please enter username.</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.password && errors.password.type === "required"
                        ? "input-wrap input-error"
                        : errors.password &&
                          errors.password.type === "minLength"
                        ? "input-wrap input-error-without-shake"
                        : "input-wrap"
                    }
                  >
                    <label htmlFor="password" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>Password
                    </label>
                    <input
                      type={
                        showPassword && activeInputFieldID === "tpassword"
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      name="password"
                      id="password"
                      className={
                        watch("password")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({ required: true, minLength: 5 })}
                    />
                    <i
                      className={
                        showPassword && activeInputFieldID === "tpassword"
                          ? "icon-hide show-password-icon"
                          : "icon-view show-password-icon"
                      }
                      aria-hidden="true"
                      onClick={() => handleToggleShowPassword("tpassword")}
                    ></i>
                    {errors.password && errors.password.type === "required" && (
                      <span className="error">Please enter a password.</span>
                    )}
                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <span className="error">
                          Your password is at least 5 characters.
                        </span>
                      )}
                  </div>
                </div>
                {studentLoginError && (
                  <div className="error-text">
                    <span>{studentLoginError}</span>
                  </div>
                )}

                <div className="form-group pt-10">
                  <Button
                    name={studentLoginLoading ? "Logging..." : "Login"}
                    className="btn btn-primary button-full"
                    type="submit"
                    disabled={studentLoginLoading}
                  />
                </div>
                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    Not a student?{" "}
                    <Link to="/teacher/login" className="link">
                      {" "}
                      Teacher / Parent Login
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
};

export default StudentLogin;
