import React from "react";
import { editUser } from "store/action";
import { useDispatch } from "react-redux";
import Button from "components/Button";
import { Modal } from "antd";
import "assets/sass/components/button-ant.scss";

function StudentResetLevelDailog(props) {
  const { user } = props;
  const dispatch = useDispatch();

  const handleCloseStudentReserLevelDailog = () => {
    props.closeResetStudentDailog();
  };

  const handleResetStudentLevel = () => {
    let body;
    if (user.profile.student_learning_mode_id === 1) {
      body = {
        role_id: 3,
        profile: {
          add_sub_level_id: "",
          mul_div_level_id: user.profile.mul_div_level_id,
          class_code: user.profile.class_code,
          student_learning_mode_id: user.profile.student_learning_mode_id,
        },
        // mul_div_level_id: user.profile.mul_div_level_id,
        // class_code: user.profile.class_code,
        // student_learning_mode_id: user.profile.student_learning_mode_id,
      };
    } else {
      body = {
        role_id: 3,
        // add_sub_level_id: user.add_sub_level_id,
        profile: {
          mul_div_level_id: "",
          add_sub_level_id: user.add_sub_level_id,
          class_code: user.profile.class_code,
          student_learning_mode_id: user.profile.student_learning_mode_id,
        },
        // class_code: user.profile.class_code,
        // student_learning_mode_id: user.profile.student_learning_mode_id,
      };
    }

    dispatch(editUser(user.id, body));
    props.closeResetStudentDailog();
  };

  return (
    <Modal
      title={"Reassess"}
      visible={true}
      footer={null}
      width={610}
      onCancel={handleCloseStudentReserLevelDailog}
    >
      {/* <!-- Add " open " className in backdrop and custom-popup while open  --> */}
      <div className="custom-popup open custom-poppup-body">
        <div>
          <div className="popup-content">
            <h4 style={{ marginLeft: "15px" }} className="popup-sub-title">
              {`Are you sure you want to reassess ${user.profile.first_name} ${
                user.profile.last_name
              } in ${
                user.profile.student_learning_mode_id === 1
                  ? "Addition/Subtraction"
                  : "Multiplication/Division"
              }?  If so, all ${
                user.profile.student_learning_mode_id === 1
                  ? "addition/subtraction"
                  : "multiplication/division"
              } performance data for this student will be erased.`}
            </h4>
          </div>
          <div className="popup-footer">
            <div className="button-wrap">
              <div className="button-cols">
                <Button
                  type="primary"
                  className="button"
                  name={"No, cancel"}
                  onClick={() => handleCloseStudentReserLevelDailog()}
                ></Button>
              </div>
              <div className="button-cols">
                <Button
                  type="primary"
                  className="button-secondary"
                  name={" Yes, reassess"}
                  onClick={() => handleResetStudentLevel()}
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default StudentResetLevelDailog;
