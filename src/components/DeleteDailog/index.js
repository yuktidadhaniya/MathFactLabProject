import React from "react";
import { removeUser, removeMultipleUser } from "store/action";
import { useDispatch } from "react-redux";
import Button from "components/Button";
import { Modal } from "antd";
import "assets/sass/components/button-ant.scss";

function DeleteDailog(props) {
  const { user, selectedStudentIDList, closeDeleteDailog } = props;
  const dispatch = useDispatch();

  const handleCloseStudentDeleteDailog = () => {
    closeDeleteDailog();
  };

  //Delete User Api Call
  const handleDeleteUser = () => {
    if (selectedStudentIDList.length) {
      dispatch(
        removeMultipleUser(
          selectedStudentIDList,
          handleCloseStudentDeleteDailog,
        ),
      );
    } else {
      dispatch(removeUser(user, handleCloseStudentDeleteDailog));
    }
  };

  return (
    <>
      <>
        {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
        {/* <div className="custom-popup open">
          <div className="popup"> */}
        <Modal
          title="Delete Student Account"
          footer={null}
          visible={true}
          onCancel={handleCloseStudentDeleteDailog}
        >
          {/* <div className="popup-header">
              <h3 className="popup-title">Delete Student Account</h3>
              <span
                className="close"
                onClick={() => handleCloseStudentDeleteDailog()}
              >
                <i className="icon-close" aria-hidden="true"></i>
              </span>
            </div> */}

          <div className="popup-content">
            {selectedStudentIDList.length ? (
              <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
                Are you sure you wish to delete selected{" "}
                <b>{` ${selectedStudentIDList.length} Student's `}</b>
                account? Students data will be erased. Once deleted, this cannot
                be undone.
              </h4>
            ) : (
              <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
                Are you sure you wish to delete
                <b>{` ${user.profile.first_name} ${user.profile.last_name}'s `}</b>
                account? Student data will be erased. Once deleted, this cannot
                be undone.
              </h4>
            )}
          </div>
          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <Button
                  type="button"
                  className="button"
                  name={"Cancel"}
                  onClick={() => handleCloseStudentDeleteDailog()}
                ></Button>
              </div>
              <div className="button-cols">
                <Button
                  onClick={handleDeleteUser}
                  type="submit"
                  className="button-secondary"
                  name={" Delete"}
                ></Button>
              </div>
            </div>
          </div>
        </Modal>
        {/* </div>
        </div>
        <div className="popup-backface open"></div> */}
      </>
    </>
  );
}

export default DeleteDailog;
