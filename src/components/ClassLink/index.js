import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import moment from "moment";
import Loader from "components/Loader";
import { useLocation, useHistory } from "react-router-dom";
import {} from "react-router-dom";
import { startSession } from "store/action";
import { teacherLoginClassLink } from "store/action";

const ClassLink = props => {
  let location = useLocation();
  let history = useHistory();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);

  const code = query.get("code");

  const handleSuccess = response => {
    if (response.user.role_name === "student") {
      const {
        profile: {
          student_learning_mode_id,
          add_sub_level_id,
          mul_div_level_id,
        },
      } = response.user;
      sessionStorage.setItem("user-token", response.token);
      sessionStorage.setItem("user-role", response.user.role_name);
      dispatch(startSession());
      sessionStorage.setItem("isSessionStarted", true);
      sessionStorage.setItem(
        "session_start_date",
        moment().format("YYYY-MM-DD HH:mm"),
      );
      if (
        (student_learning_mode_id === 1 && !!add_sub_level_id) ||
        (student_learning_mode_id === 2 && !!mul_div_level_id)
      ) {
        history.replace("/student/practice-select-activity");
      } else {
        history.replace("/student/placement-test");
      }
    } else {
      localStorage.setItem("user-token", response.token);
      localStorage.setItem("user-role", response.user.role_name);
      history.push("/teacher/student");
    }
  };
  const handleFailed = () => {
    history.push("/teacher/login");
  };
  useEffect(() => {
    if (code) {
      const body = { code: code };
      dispatch(teacherLoginClassLink(body, handleSuccess, handleFailed));
    }
  }, [code]); // eslint-disable-line

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "calc(100vh - 244px)",
          width: "100%",
        }}
      >
        <Loader />
      </div>
    </>
  );
};

export default ClassLink;
