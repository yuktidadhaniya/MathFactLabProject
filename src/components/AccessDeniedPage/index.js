import React from "react";
import Layout from "components/Layout";

import { Link } from "react-router-dom";

const AccessDeniedPage = props => {
  return (
    <>
      <Layout>
        <div className="login-flex">
          <div className="login-cols " style={{ width: "100%" }}>
            <div
              className="login-cols-inner confirmation-wrap "
              style={{ width: "430px" }}
            >
              <>
                <h2 className="login-title text-center">
                  Oops! Something went wrong.
                </h2>
                <div className="form-group">
                  <span className="font-24 login-subtext">
                    Refreshing usually does the trick. If that doesn’t work,
                    please try again later, as the issue may just be temporary.
                  </span>
                </div>
                <div className="form-group">
                  <span className="font-24 login-subtext">
                    If the problem continues, please let us know.
                  </span>
                </div>
                <div className="form-group">
                  <span className="font-16 ">
                    Note, if you wish to view a student page while already
                    logged in as a teacher, it’s best do so in an ‘incognito’
                    window.
                  </span>
                </div>
                <div className="form-group">
                  <span className="font-16 ">
                    On Chrome, you can open an incognito window by clicking the
                    top right corner of the browser. On Firefox, click the
                    hamburger icon in the top right corner and select ‘New
                    private window’.
                  </span>
                </div>
              </>

              <div className="wrap text-center">
                <span className="font-20 ">
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

export default AccessDeniedPage;
