import React from "react";
import { editUser } from "store/action";
import { useDispatch } from "react-redux";
import Button from "components/Button";

function StudentLevelLifterLockDailog(props) {
  const { user } = props;
  const dispatch = useDispatch();

  const handleCloseStudentLevelLifterLockDailog = () => {
    props.closeStudentLevelLifterLockDailog();
  };

  const handleStudentLevelLifterLock = () => {
    let body = {
      is_level_lifter_lock: (1 - user.profile.is_level_lifter_lock).toString(),
    };

    dispatch(editUser(user.id, body));
    props.closeStudentLevelLifterLockDailog();
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        <div className="custom-popup open">
          <div className="popup">
            <div className="popup-header">
              <h3 className="popup-title">Level Lifter Lock</h3>
              <span
                className="close"
                onClick={() => handleCloseStudentLevelLifterLockDailog()}
              >
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div>

            <div className="popup-content">
              <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
                {`Are you sure you want to ${
                  !user.profile.is_level_lifter_lock ? "unlock" : "lock"
                }?`}
              </h4>
            </div>
            <div className="popup-footer">
              <div className="button-wrap">
                <div className="button-cols">
                  <Button
                    className="btn btn-gray"
                    name={"No, cancel"}
                    onClick={() => handleCloseStudentLevelLifterLockDailog()}
                  ></Button>
                </div>
                <div className="button-cols">
                  <Button
                    className="btn btn-secondary"
                    name={`Yes, ${
                      !user.profile.is_level_lifter_lock ? "unlock" : "lock"
                    }`}
                    onClick={() => handleStudentLevelLifterLock()}
                  ></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="popup-backface open"></div>
      </>
    </>
  );
}

export default StudentLevelLifterLockDailog;
