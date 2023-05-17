import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Button from "components/Button";
import { endSession, logout } from "store/action";
import { studentSessionTimeLimitList } from "config/const";

// close session dialog
const AbortSessionDialog = props => {
  const { counter } = props;

  let history = useHistory();

  const dispatch = useDispatch();

  const authLogoutSuccess = () => {
    localStorage.removeItem("practice_test_submissions_id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("isSessionStarted");
    sessionStorage.clear();
    history.push("/student/login");
  };

  const handleCallBackEndSession = () => {
    dispatch(logout(authLogoutSuccess, "AbortSessionDialog"));
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
      await dispatch(endSession(sessionID, body));
    }
    handleCallBackEndSession();
    props.close();
  };
  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open " style={{ zIndex: "14444" }}>
          <div className="popup">
            <div className="popup-header" style={{ borderBottom: "none" }}>
              <h3 className="popup-title">{null}</h3>
            </div>{" "}
            <div style={{ padding: "0px 24px 24px 24px", textAlign: "center" }}>
              {/* <img src={congratulationImg} alt="bubbles" /> */}
              <h4 className="mb-10">
                Well done. That’s it for today’s session.
              </h4>
              <h5>Remember, regular practice is the key to success.</h5>
              <span>
                Keep up the good work and login again to MathFactLab soon!
              </span>
            </div>{" "}
            <div className="popup-footer">
              <div
                className="button-wrap"
                style={{ justifyContent: "center", marginBottom: "24px" }}
              >
                <div className="button-cols">
                  <Button
                    type="button"
                    className="btn btn-secondary"
                    name={"See you tomorrow!!"}
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

export default AbortSessionDialog;
