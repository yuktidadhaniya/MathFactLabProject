import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import ImageFadeIn from "react-image-fade-in";
import Button from "components/Button";
import Layout from "components/Layout";
import { userRole } from "config/const";
import teacherLoginImg from "assets/images/teacher-login.svg";
import { adminSignIn } from "toolkit/slice/auth";

const TeacherLogin = props => {
  let history = useHistory();
  const dispatch = useDispatch();

  const recaptchaRef = React.useRef();

  const { loginLoading, loginError } = useSelector(({ auth }) => auth);
  const [isShowReCaptchaError, setIsShowReCaptchaError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [activeInputFieldID, setActiveInputFieldID] = useState("");
  const { register, handleSubmit, watch, errors } = useForm();
  //After login success redirection to student page
  function handleLoginSuccess() {
    history.push("/teacher/students");
  }
  const handleLoginFailure = () => {
    recaptchaRef.current.reset();
  };

  //Login page api call
  const handleSubmitLoginForm = async data => {
    // const token = await recaptchaRef.current.executeAsync();
    const token = "123";

    if (loginLoading) return;
    if (token) {
      const { temail, tpassword } = data;
      const body = {
        email: temail,
        password: tpassword,
        role_id: userRole.ADMIN.role_id,
      };
      setIsShowReCaptchaError(false);
      dispatch(adminSignIn(body))
        .then(res => {
          handleLoginSuccess();
        })
        .catch(er => {
          handleLoginFailure();
        });
    } else {
      setIsShowReCaptchaError(true);
    }
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
            <div className={`login-cols-inner`}>
              <h2 className="login-title">Admin Login</h2>

              <form
                name="student-login"
                onSubmit={handleSubmit(handleSubmitLoginForm)}
              >
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      (errors.temail && errors.temail.type === "required") ||
                      (errors.temail && errors.temail.type === "pattern")
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="temail" className="input-label">
                      <i className="icon-envelope" aria-hidden="true"></i>Email
                    </label>
                    <input
                      placeholder="Enter your email ID"
                      name="temail"
                      id="temail"
                      className={
                        watch("temail")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      })}
                      disabled={loginLoading}
                    />
                    {errors.temail && errors.temail.type === "required" && (
                      <span className="error">Please enter email.</span>
                    )}
                    {errors.temail && errors.temail.type === "pattern" && (
                      <span className="error">Please enter valid email.</span>
                    )}
                  </div>
                </div>
                <div className="form-group">
                  <div
                    className={
                      errors.tpassword && errors.tpassword.type === "required"
                        ? "input-wrap input-error"
                        : errors.tpassword &&
                          errors.tpassword.type === "pattern"
                        ? "input-wrap input-error-without-shake"
                        : "input-wrap"
                    }
                  >
                    <label htmlFor="tpassword" className="input-label">
                      <i className="icon-lock" aria-hidden="true"></i>Password
                    </label>
                    <input
                      type={
                        showPassword && activeInputFieldID === "tpassword"
                          ? "text"
                          : "password"
                      }
                      placeholder="Enter your password"
                      name="tpassword"
                      id="tpassword"
                      className={
                        watch("tpassword")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({
                        required: true,
                        pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/, ///^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/
                      })}
                      disabled={loginLoading}
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
                    {errors.tpassword &&
                      errors.tpassword.type === "required" && (
                        <span className="error">Please enter password.</span>
                      )}
                    {errors.tpassword &&
                      errors.tpassword.type === "pattern" && (
                        <span className="error">
                          Required: 8 characters, including UPPER/lowercase and
                          numeric.
                        </span>
                      )}
                  </div>
                </div>
                {loginError && (
                  <div className="error-text">
                    <span>{loginError}</span>
                  </div>
                )}
                {/* //recaptcha error */}
                {isShowReCaptchaError && (
                  <div className="error-text">
                    <span>Something went wrong!</span>
                  </div>
                )}
                <div className="form-group pt-10">
                  <Button
                    name={"Login"}
                    className="btn btn-primary button-full"
                    type="submit"
                    disabled={loginLoading}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default TeacherLogin;
