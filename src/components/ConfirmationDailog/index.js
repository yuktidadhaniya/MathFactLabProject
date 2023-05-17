import React from "react";
import Button from "components/Button";
import { Modal } from "antd";

function ConfirmationDailog(props) {
  const { user, activeMathOpration } = props;

  const handleCloseStudentDeleteDailog = () => {
    props.closeConfirmationDailog();
  };

  //Delete User Api Call
  const handleDeleteUser = () => {
    props.setActiveSelectedLevel();
  };

  return (
    <>
      <>
        <Modal
          visible={true}
          title="Are you sure?"
          onCancel={() => handleCloseStudentDeleteDailog()}
          footer={null}
          key="modal"
        >
          <div className="popup-content">
            <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
              Are you sure you wish to change ?
              <b>{` ${user.profile.first_name} ${user.profile.last_name}'s `}</b>
              level in the{" "}
              {`${
                activeMathOpration === 1
                  ? "Addition/Subtraction"
                  : "Multiplication/Division"
              }`}{" "}
              mode?
            </h4>
          </div>

          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <Button
                  type="button"
                  className="button"
                  name={"No, cancel"}
                  onClick={() => handleCloseStudentDeleteDailog()}
                ></Button>
              </div>
              <div className="button-cols">
                <Button
                  type="button"
                  className="button-secondary"
                  name={"Yes, change"}
                  onClick={() => handleDeleteUser()}
                ></Button>
              </div>
            </div>
          </div>
        </Modal>
      </>
    </>
  );
}

export default ConfirmationDailog;
