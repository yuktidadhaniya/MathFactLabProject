import React from "react";
import Button from "components/Button";
import { googleLoginScope, googleScopeClassroom } from "config/const";
import { Modal } from "antd";

function ClassroomSyncErrorPopup(props) {
  let googleScope = [...googleLoginScope, ...googleScopeClassroom];
  return (
    <Modal visible={true} footer={null} closable={false} width={650}>
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}

      <div className="custom-popup open custom-poppup-body">
        <div className="popup">
          <div className="content-wrapper">
            {/* <img src={congratulationImg} alt="bubbles" /> */}
            <h4 className="mb-10">
              Importing/updating Google Classroom failed.
            </h4>
            <h4 className="title-text">
              Please try reconnecting your account.
            </h4>
          </div>
          <div className="popup-footer">
            <div
              className="button-wrap"
              style={{ justifyContent: "center", marginBottom: "24px" }}
            >
              <div className="button-cols">
                <a
                  // className="search with-button btn-google-classroom js-sync-google-classrooms"
                  // href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${process.env.REACT_APP_GOOGLE_SCOPE}&include_granted_scopes=true&redirect_uri=${process.env.REACT_APP_FRONTEND_REDIRECT_URL}/teacher/login&client_id=${process.env.REACT_APP_GOOGLE_CLIENT_ID}&response_type=code`}
                  href={`https://accounts.google.com/o/oauth2/v2/auth?scope=${googleScope.join(
                    "%20",
                  )}&include_granted_scopes=true&redirect_uri=${
                    process.env.REACT_APP_FRONTEND_REDIRECT_URL
                  }/teacher/classes&client_id=${
                    process.env.REACT_APP_GOOGLE_CLIENT_ID
                  }&response_type=code&access_type=offline&prompt=consent`}
                  style={{ height: "44px" }}
                >
                  <Button
                    type="button"
                    className="button-secondary"
                    name={"Reconnect Google Classroom account"}
                    // onClick={() => handleEndSession()}
                  ></Button>{" "}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default ClassroomSyncErrorPopup;
