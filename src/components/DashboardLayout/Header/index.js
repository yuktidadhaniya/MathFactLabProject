import React, { useState, useEffect } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import moment from "moment";
// import useOnClickOutside from "components/Backdrop";
import { logout, getLevelsList, endSession } from "store/action";

import TeacherProfileDailog from "components/TeacherProfileDailog";
import LogoutConfirmationPopup from "components/LogoutConfirmationPopup";

import Button from "components/Button";
import logoImg from "assets/images/logo.svg";
import { mulSubLevelList, addSubLevelList } from "config/const";
import { Popover } from "antd";

function Header(props) {
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const query = new URLSearchParams(location.search);
  const level_index = query.get("level_index");
  const learning_mode_id = query.get("learning_mode_id");

  const { pathname } = location;
  // State for our modal
  // const [isShowUserMenu, setIsShowUserMenu] = useState(false);
  const [isShowUserLevel, setShowUserLevel] = useState(false);

  const [isShowTeacherProfileDailog, setIsShowTeacherProfileDailog] = useState(
    false,
  );

  const [
    isShowLogoutConfirmationPopup,
    setIsShowLogoutConfirmationPopup,
  ] = useState(false);

  const { userDetails } = useSelector(({ auth }) => auth);
  const { levelList } = useSelector(({ quiz }) => quiz);

  const {
    profile: { student_learning_mode_id, mul_div_level_id, add_sub_level_id },
  } = userDetails;

  // const handleShowUserMenu = () => {
  //   setIsShowUserMenu(true);
  // };

  //Get Level List
  useEffect(() => {
    if (!levelList.length) {
      dispatch(getLevelsList());
    }
  }, [levelList.length]); // eslint-disable-line

  // Create a ref that we add to the element for which we want to detect outside clicks
  // const ref = useRef();

  // Call hook passing in the ref and a function to call on outside click
  // useOnClickOutside(ref, () => setIsShowUserMenu(false));

  //Logout success redirection to login page
  const authLogoutSuccess = () => {
    //  Not clearing all storage for class code
    localStorage.removeItem("practice_test_submissions_id");
    localStorage.removeItem("user-token");
    localStorage.removeItem("isSessionStarted");
    localStorage.removeItem("session_id");
    localStorage.removeItem("is_show_welcome_popup");
    localStorage.removeItem("is_teacher_login");
    localStorage.removeItem("is_show_student_step_popup");

    sessionStorage.clear();
    if (userDetails.role_name === "super_admin") {
      history.push("/teacher/login");
    } else {
      history.push("/student/login");
    }
  };
  const handleLogout = () => {
    dispatch(logout(authLogoutSuccess, "DashboardLayout"));
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

      dispatch(
        endSession(sessionStorage.getItem("session_id"), body, handleLogout),
      );
    } else {
      //only logout
      handleLogout();
    }
  };

  const handleCloseProfileDailog = () => {
    setIsShowTeacherProfileDailog(false);
  };

  //Logo click redirection
  const handleRedirection = () => {
    if (userDetails.role_name === "super_admin") {
      return "/teacher/students";
    } else {
      if (
        (student_learning_mode_id === 1 && !!add_sub_level_id) ||
        (student_learning_mode_id === 2 && !!mul_div_level_id)
      ) {
        return "/student/practice-select-activity";
      } else {
        return "/student/placement-test";
      }
    }
  };

  let updatedUserLevel =
    localStorage.getItem("user-role") === "teacher"
      ? learning_mode_id === "1"
        ? addSubLevelList[level_index]
        : mulSubLevelList[level_index]
      : student_learning_mode_id === 1
      ? addSubLevelList[add_sub_level_id]
      : mulSubLevelList[mul_div_level_id];

  let isShowUserLevelByPath = pathname.includes("practice-select-activity");

  const handleToggleLogoutConfirmationDailog = () => {
    setIsShowLogoutConfirmationPopup(!isShowLogoutConfirmationPopup);
  };

  return (
    <>
      {/* <!-- Main Wrapper --> */}

      {/* socket connection  */}

      <header className="alt-header">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="header-flex">
                <div className="header-cols">
                  <Link to={() => handleRedirection()}>
                    <img
                      src={logoImg}
                      className="login-logo"
                      alt="Math Fact Lab"
                    />
                  </Link>
                </div>

                {/* {isShowUserLevelByPath && (
                  <div className="header-cols">Select your next activity</div>
                )} */}
                <div className="header-cols">
                  <div className="user-menu">
                    {isShowUserLevelByPath && updatedUserLevel && (
                      <>
                        <div
                          className={"user-level-wrapper"}
                          onClick={() => setShowUserLevel(!isShowUserLevel)}
                        >
                          <div className="user-level bg-green">
                            <span>
                              {`${updatedUserLevel.label}
                              ${updatedUserLevel.descriptors}`}
                            </span>
                          </div>
                          <div
                            className={
                              isShowUserLevel
                                ? "user-level bg-blue show"
                                : "user-level bg-blue "
                            }
                          >
                            <span>See Your Level</span>
                          </div>
                        </div>
                      </>
                    )}

                    <Popover
                      style={{ padding: "12px 10px" }}
                      placement="bottom"
                      overlayClassName="student-logout-wrapper"
                      title={""}
                      content={
                        <li className="submenu-item">
                          <div
                            className="sublink"
                            onClick={
                              pathname === "/student/practice-test"
                                ? () => handleToggleLogoutConfirmationDailog()
                                : () => handleLogoutUser()
                            }
                          >
                            {/* <img
                              src={powerButtonImg}
                              alt="powerButtonImg"
                              style={{ width: "18px", marginRight: "10px" }}
                            />{" "} */}
                            <div>Log out</div>
                          </div>
                        </li>
                      }
                      trigger="click"
                    >
                      {/* <div
                        className="user-wrap font-14"
                        // onClick={() => handleShowUserMenu()}
                      >
                        {Object.keys(userDetails).length > 0 && (
                          <Button
                            className="user-profile-link mr-10"
                            name={`${userDetails.profile.first_name
                              .charAt(0)
                              .toUpperCase()} ${userDetails.profile.last_name
                              .charAt(0)
                              .toUpperCase()}`}
                          />
                        )}

                        {Object.keys(userDetails).length > 0 && (
                          <div className="user-profile-short-info">
                            <div>{`${userDetails.profile.first_name} ${userDetails.profile.last_name}`}</div>
                            <div>{userDetails.email}</div>{" "}
                          </div>
                        )}
                      </div> */}

                      <div className="user-account">
                        <Button
                          className="user-acc-img "
                          name={`${userDetails.profile.first_name
                            .charAt(0)
                            .toUpperCase()} ${userDetails.profile.last_name
                            .charAt(0)
                            .toUpperCase()}`}
                        />

                        {Object.keys(userDetails).length > 0 && (
                          <div className="user-profile-short-info">
                            <div>{`${userDetails.profile.first_name} ${userDetails.profile.last_name}`}</div>
                            <div>{userDetails.email}</div>{" "}
                          </div>
                        )}
                      </div>
                    </Popover>

                    {/* <!-- Add or remove " open " className for toggle submenu  --> */}
                    {/* <div
                      ref={ref}
                      className={
                        isShowUserMenu ? "user-profile open" : "user-profile "
                      }
                    >
                      <ul className="submenu">
                        <li className="submenu-item">
                          <div
                            className="sublink"
                            onClick={() => handleLogoutUser()}
                          >
                            <img
                              src={powerButtonImg}
                              alt="powerButtonImg"
                              style={{ width: "18px", marginRight: "10px" }}
                            />
                            <div>Log out</div>
                          </div>
                        </li>
                      </ul>
                    </div> */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {isShowTeacherProfileDailog && (
        <TeacherProfileDailog closeProfileDailog={handleCloseProfileDailog} />
      )}

      {isShowLogoutConfirmationPopup && (
        <LogoutConfirmationPopup
          close={handleToggleLogoutConfirmationDailog}
          open={isShowLogoutConfirmationPopup}
        />
      )}
    </>
  );
}

export default Header;
