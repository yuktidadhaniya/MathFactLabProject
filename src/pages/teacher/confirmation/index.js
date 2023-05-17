import React from "react";
import Layout from "components/Layout";
import loginPasswordImage from "assets/images/login/password.svg";
import resetLinkImg from "assets/images/reset-link.svg";
import { Link } from "react-router-dom";

function Confirmation(props) {
  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector sm-vector">
                <img
                  src={loginPasswordImage}
                  className="vector-img"
                  alt="loginPasswordImage"
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
                  src={resetLinkImg}
                  alt="resetLinkImg"
                  className="signtop-img"
                ></img>
                <h2 className="login-title">We’ve sent you a reset link.</h2>
                <p className="font-18 text-center login-subtext">
                  {" "}
                  If the email address you entered was registered with us, you
                  will receive a password reset link shortly.
                </p>
                <p>
                  If you don’t receive the email, please contact{" "}
                  <a
                    href="mailto:support@mathfactlab.com"
                    className="link-blue"
                  >
                    support@mathfactlab.com
                  </a>{" "}
                  and we’ll take care of it.
                </p>
                <div className="wrap text-center pt-10">
                  <p className="font-18">
                    <Link to="/teacher/login" className="link">
                      Back to login
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Confirmation;
