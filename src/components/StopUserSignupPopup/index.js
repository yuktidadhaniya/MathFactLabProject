import React from "react";

import teacherLoginImg from "assets/images/login/teacher-login.svg";

// close session dialog
const StopUserSignupPopup = props => {
  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open " style={{ zIndex: "1555555" }}>
          <div className="popup" style={{ maxWidth: "700px" }}>
            <div className="popup-header" style={{ borderBottom: "none" }}>
              <h3 className="popup-title">{null}</h3>
            </div>{" "}
            <div style={{ padding: "0px 24px 24px 24px", textAlign: "center" }}>
              <img
                src={teacherLoginImg}
                alt="bubbles"
                style={{ width: "200px" }}
                className="mb-20"
              />
              <h5 className="mb-30">
                Thank you for your interest in MathFactLab, but we have paused
                new user signups until December 17th.
              </h5>
              <h5 className="mb-30">
                We believe that we have resolved the technical issues that we
                have been experiencing recently due to our rapid growth.
                However, our developers would like one more week to make sure
                everything is running smoothly before we begin taking on more
                users.
              </h5>
              <h5>
                Thank you for your patience, and we look forward to welcoming
                you back to MathFactLab soon.
              </h5>
            </div>{" "}
          </div>
        </div>

        <div className="popup-backface open" style={{ zIndex: "999" }}></div>
      </>
    </>
  );
};

export default StopUserSignupPopup;
