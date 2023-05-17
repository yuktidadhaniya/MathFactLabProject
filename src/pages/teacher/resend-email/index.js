import React from "react";
import { Link, useHistory } from "react-router-dom";
import Layout from "components/Layout";
import { useSelector, useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { resendVerificationMail } from "store/action";

import loginPasswordImage from "assets/images/login/password.svg";
import ImageFadeIn from "react-image-fade-in";
import Button from "components/Button";

function ResendEmailPage(props) {
  let history = useHistory();
  const dispatch = useDispatch();

  const { register, handleSubmit, watch, errors } = useForm();

  //after forgot password success redirect  to confirmation page
  function handleLoginSuccess() {
    history.push("/thank-you");
  }
  const {
    resendVerificationEmailError,
    resendVerificationEmailLoading,
  } = useSelector(({ auth }) => auth);

  //forgot password  api call
  const handleSubmitForgotPassowrdForm = data => {
    const { resetemail } = data;
    if (resendVerificationEmailLoading) return;

    const body = {
      email: resetemail,
    };

    dispatch(resendVerificationMail(body, handleLoginSuccess));
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
              <h2 className="login-title">Resend Verification Email</h2>
              <p className="font-18 text-center login-subtext">
                No worries. Just enter the email you used to signup, and we’ll
                send you a verification link to verify it.
              </p>
              <form
                name="student-login"
                onSubmit={handleSubmit(handleSubmitForgotPassowrdForm)}
              >
                <div className="form-group">
                  {/* <!-- Add className for error red border ===> input-error  --> */}
                  <div
                    className={
                      (errors.resetemail &&
                        errors.resetemail.type === "required") ||
                      (errors.resetemail &&
                        errors.resetemail.type === "pattern")
                        ? "input-wrap input-error"
                        : "input-wrap "
                    }
                  >
                    <label htmlFor="resetemail" className="input-label">
                      <i className="icon-envelope" aria-hidden="true"></i>Email
                    </label>
                    <input
                      placeholder="Enter your email ID"
                      name="resetemail"
                      id="resetemail"
                      className={
                        watch("resetemail")
                          ? "input-field"
                          : "input-field input-error"
                      }
                      ref={register({
                        required: true,
                        pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      })}
                    />
                    {errors.resetemail &&
                      errors.resetemail.type === "required" && (
                        <span className="error">Please enter an email.</span>
                      )}
                    {errors.resetemail &&
                      errors.resetemail.type === "pattern" && (
                        <span className="error">Please enter valid email.</span>
                      )}
                  </div>
                </div>
                {resendVerificationEmailError && (
                  <div className="error-text">
                    <span>{resendVerificationEmailError}</span>
                  </div>
                )}
                <div className="form-group pt-10">
                  <Button
                    name={"Send Reset Password Link"}
                    className="btn btn-primary button-full"
                    type="submit"
                  />
                </div>

                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    <Link to="/teacher/login" className="link">
                      Login instead
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

export default ResendEmailPage;
