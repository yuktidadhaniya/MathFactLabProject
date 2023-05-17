import React, { useEffect } from "react";
import Layout from "components/Layout";

import resetLinkImg from "assets/images/reset-link.svg";
import { Link } from "react-router-dom";
import teacherLoginImg from "assets/images/teacher-login.svg";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { confirmMail } from "store/action";

function Confirmation(props) {
  const dispatch = useDispatch();

  let location = useLocation();
  const query = new URLSearchParams(location.search);

  const emailTokenId = query.get("token");

  const { emailVerificationError } = useSelector(({ auth }) => auth);

  useEffect(() => {
    emailTokenId && dispatch(confirmMail(emailTokenId));
  }, [emailTokenId]); // eslint-disable-line

  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols inner-background">
            <div className="login-vector-wrap">
              <div className="login-vector sm-vector">
                <img
                  src={teacherLoginImg}
                  className="vector-img"
                  alt="loginPasswordImage"
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
            <div className="login-cols-inner confirmation-wrap text-center">
              {emailVerificationError ? (
                <div className="sign-vector">
                  <img
                    src={resetLinkImg}
                    alt="resetLinkImg"
                    className="signtop-img"
                  ></img>
                  <h2 className="login-title">Thank you!</h2>
                  <p className="font-18 text-center login-subtext">
                    {emailVerificationError}
                  </p>

                  <div className="wrap text-center pt-10">
                    <p className="font-18">
                      <Link to="/teacher/login" className="link">
                        Back to login
                      </Link>
                    </p>
                  </div>
                </div>
              ) : (
                <div className="sign-vector">
                  <img
                    src={resetLinkImg}
                    alt="resetLinkImg"
                    className="signtop-img"
                  ></img>
                  <h2 className="login-title">Thank you!</h2>
                  <p className="font-18 text-center login-subtext">
                    {emailVerificationError
                      ? emailVerificationError
                      : "Your email has been verified successfully."}
                  </p>

                  <div className="wrap text-center pt-10">
                    <p className="font-18">
                      <Link to="/teacher/login" className="link">
                        Back to login
                      </Link>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}

export default Confirmation;
