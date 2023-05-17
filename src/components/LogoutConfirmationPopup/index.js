import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "components/Button";
import { endSession, logout } from "store/action";
import { QuestionCircleOutlined } from "@ant-design/icons";
import { studentSessionTimeLimitList } from "config/const";

// close session dialog
const LogoutConfirmationPopup = props => {
  const { counter } = props;

  let history = useHistory();
  let location = useLocation();
  const { pathname } = location;
  const dispatch = useDispatch();

  const authLogoutSuccess = () => {
    localStorage.removeItem("practice_test_submissions_id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("isSessionStarted");
    sessionStorage.clear();
    history.push("/student/login");
  };

  const handleCallBackEndSession = () => {
    dispatch(logout(authLogoutSuccess, "LogoutConfirmation"));
  };
  const maxSessionLimit = studentSessionTimeLimitList.find(
    (limit, index) => index + 1 === studentSessionTimeLimitList.length,
  ).value;
  const handleEndSession = async () => {
    let sessionID = sessionStorage.getItem("session_id");

    if (sessionID) {
      const body = {
        status: "1",
        time_taken_in_min:
          counter > maxSessionLimit ? maxSessionLimit : counter,
      };
      dispatch(endSession(sessionID, body));
    }
    await handleCallBackEndSession();
    props.close();
  };
  const handleClose = () => {
    props.close();
  };
  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open " style={{ zIndex: "1555555" }}>
          <div className="popup" style={{ maxWidth: "500px", padding: "12PX" }}>
            <div className="modal-content-text">
              {/* <img src={congratulationImg} alt="bubbles" /> */}
              <h4 className="" style={{ marginBottom: "40px" }}>
                <QuestionCircleOutlined
                  style={{ color: "#faad14", marginRight: "6px" }}
                />{" "}
                Are you sure you want to log off?
              </h4>

              {pathname === "/student/practice-test" ? (
                <p className="font-18" style={{ marginBottom: "40px" }}>
                  If you log off, your Level Lifter results will not be saved.
                  You will need to complete the steps to unlock the Level Lifter
                  again.
                </p>
              ) : (
                ""
              )}
            </div>{" "}
            <div className="popup-footer" style={{ paddingTop: "0px" }}>
              <div
                className="button-wrap"
                style={{ justifyContent: "flex-end" }}
              >
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-secondary-outline"
                    name={"Cancel"}
                    onClick={() => handleClose()}
                  ></Button>
                </div>
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    name={"Logout"}
                    onClick={() => handleEndSession()}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="popup-backface open" style={{ zIndex: "999" }}></div>
      </>
    </>
  );
};

export default LogoutConfirmationPopup;
