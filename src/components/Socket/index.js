import React, { useEffect } from "react";
import { updateUserSuccess } from "store/action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import moment from "moment";
import io from "socket.io-client";
import { logout, endSession } from "store/action";
import { userRole } from "config/const";
let socket;

function Socket(props) {
  const dispatch = useDispatch();
  let history = useHistory();

  const { userDetails } = useSelector(({ auth }) => auth);
  //socket  connection

  const authLogoutSuccess = () => {
    //  Not clearing all storage for class code
    localStorage.removeItem("practice_test_submissions_id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("isSessionStarted");
    localStorage.removeItem("session_id");
    localStorage.removeItem("is_show_welcome_popup");
    localStorage.removeItem("is_teacher_login");
    sessionStorage.clear();
    if (userDetails.role_name === "teacher") {
      history.push("/teacher/login");
    } else {
      history.push("/student/login");
    }
  };
  const handleLogout = () => {
    dispatch(logout(authLogoutSuccess, "Socket"));
  };
  // Logout user
  const handleLogoutUser = () => {
    //check if session started then end and logout user
    let duration = moment.duration(
      moment().diff(sessionStorage.getItem("session_start_date")),
    );
    let sessionTimeRemaining = Math.round(duration.asMinutes());

    if (sessionStorage.getItem("session_id")) {
      const body = {
        status: "1",
        time_taken_in_min: sessionTimeRemaining,
      };

      dispatch(endSession(sessionStorage.getItem("session_id"), body)).then(
        () => {
          handleLogout();
        },
      );
    } else {
      //only logout
      handleLogout();
    }
  };

  useEffect(() => {
    //socket = io.connect(process.env.REACT_APP_BACKEND_URL, { transport: ["websocket"] });
    socket = io.connect(process.env.REACT_APP_SOCKET_URL, {
      secure: true,
      reconnection: true,
      rejectUnauthorized: false,
    });

    socket.on("connect", () => {
      //   axios
      //     .put(`/update-socket`, {
      //       socket_id: socket.id
      //     })
      //     .then(data => {
      //     })
      //     .catch(e => {
      //     });
    });
    socket.on("db_changes", res => {
      const { data, type } = res;

      const isCurrentUser = true;
      // const isCurrentUser = userData.id !== change_by;

      if (isCurrentUser) {
        switch (type) {
          case "SOCKET_UPDATE_STUDENT": {
            if (
              Object.keys(userDetails).length &&
              userDetails.role_name === userRole.TEACHER.role_name
            ) {
              console.log("SOCKET_UPDATE_STUDENT", data);
              //only called reducer
              return dispatch(updateUserSuccess(data));
            }
            return null;
          }
          case "SOCKET_UPDATE_STUDENT_BY_TEACHER": {
            console.log("SOCKET_UPDATE_STUDENT_BY_TEACHER", data);
            data.id === userDetails.id && handleLogoutUser();
            return null;
          }
          default:
            return null;
        }
      }
    });
    socket.on("disconnect", () => {
      console.log("socket disconnected ::", socket.id);
    });
    socket.on("connect_error", err => {
      console.log("socket connect_error ::", err);
    });
  }, [dispatch]); // eslint-disable-line

  return <div></div>;
}

export default Socket;
