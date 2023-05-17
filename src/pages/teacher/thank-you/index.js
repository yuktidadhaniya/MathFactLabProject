import React, { useState } from "react";
import Layout from "components/Layout";
import thankyouImg from "assets/images/login/thankyou.svg";
import thankyouSuccessImg from "assets/images/login/thankyou-success.svg";
import homePageBanner from "assets/images/home-banner-inner.png";
import { useDispatch } from "react-redux";
import { resendVerificationMail } from "store/action";

import { Link, useLocation } from "react-router-dom";

const Thankyou = props => {
  let location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);

  const isLoginUser = query.get("login") === "true";

  const mail = sessionStorage.getItem("user-mail");

  const [resendMailSuccessMessage, setResendMailSuccessMessage] = useState("");
  const [resendMailErrorMessage, setResendMailErrorMessage] = useState("");

  const handleEmailSendSuccess = () => {
    setResendMailSuccessMessage("Resend email verification sent successfully.");
  };

  const handleEmailSendFailure = message => {
    setResendMailErrorMessage(message);
  };

  const handleResentVerificationEmail = () => {
    const body = {
      email: mail,
    };
    dispatch(
      resendVerificationMail(
        body,
        handleEmailSendSuccess,
        handleEmailSendFailure,
      ),
    );
  };

  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector">
                <img
                  src={isLoginUser ? homePageBanner : thankyouImg}
                  className="vector-img"
                  alt="thankyouImg"
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
            <div className="login-cols-inner confirmation-wrap text-center">
              <div className="sign-vector">
                <img
                  src={thankyouSuccessImg}
                  alt="thankyouSuccessImg"
                  className="signtop-img"
                />
              </div>

              {isLoginUser ? (
                <>
                  <h2 className="login-title">Email verification sent</h2>
                  <div className="form-group">
                    <span className="font-24 login-subtext">
                      An email has been sent to <b>{mail}</b> to confirm your
                      account.
                    </span>
                  </div>
                  <div className="form-group">
                    <span className="font-24 login-subtext">
                      {" "}
                      Please check your email and verify to login.
                    </span>
                  </div>

                  <div className="form-group">
                    {resendMailSuccessMessage ? (
                      <span className="font-24 mail-resend-success">
                        {" "}
                        {resendMailSuccessMessage}
                      </span>
                    ) : resendMailErrorMessage ? (
                      <span className="font-24 mail-resend-failure">
                        {" "}
                        {resendMailErrorMessage}
                      </span>
                    ) : (
                      <span
                        className="font-24 link"
                        onClick={() => handleResentVerificationEmail()}
                      >
                        {" "}
                        Click here to resend verification email.
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <div className="form-group">
                    <span className="font-24 login-subtext">
                      {" "}
                      Your password has been reset successfully.
                    </span>
                  </div>
                  <div className="form-group">
                    <span className="font-24 login-subtext">
                      {" "}
                      Please log in again using your new password.
                    </span>
                  </div>
                </>
              )}

              <div className="wrap">
                <span className="font-24">
                  <Link to="/teacher/login" className="link">
                    Click Here to Login
                  </Link>
                </span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export default Thankyou;
