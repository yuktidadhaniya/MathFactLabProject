import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Select from "components/ReactSelect";
import { useSelector, useDispatch } from "react-redux";
import Joyride from "react-joyride";

import { Layout, Dropdown, Avatar, Button, Space, Menu, Tag } from "antd";
import UserMenu from "./user-menu";
import { MenuOutlined, UserOutlined, DownOutlined } from "@ant-design/icons";
import { useHistory } from "react-router-dom";
import { headerSearchText, headerSearchClassCode } from "store/action";
import TeacherWelcomePopup from "components/TeacherWelcomePopup";
import TutorialVideoPopup from "components/TutorialVideoPopup";
import { userRole } from "config/const";

import "assets/sass/components/header.scss";

const Header = ({ onMenuClick }) => {
  let location = useLocation();
  const dispatch = useDispatch();

  const query = new URLSearchParams(location.search);
  let history = useHistory();
  const teacherClassCode = +query.get("class_code");
  const { userDetails } = useSelector(({ auth }) => auth);

  const isShowJoyrideDemo = process.env.REACT_APP_ENV === "local";

  const [run, setRun] = useState(true);
  const [isShowTutorialPopup, setIsShowTutorialPopup] = useState(false);
  const [tutorialKey, setTuTorialKey] = useState(1);

  const [stepIndex, setIndex] = useState(
    +localStorage.getItem("joyride-step-index") || 0,
  );

  const steps = [
    {
      content: (
        <div>
          <h6>
            Welcome to MathFactLab. To get started, you’ll first need to add a
            class. Click the "Classes" tab.
          </h6>
        </div>
      ),
      styles: {
        options: {
          width: 350,
        },
      },
      placement: "left",
      target: ".joyride-1",
    },

    {
      content: (
        <div>
          <h6>
            Click here to add your first class. Or, if you use Google Classroom
            with your students, click "Sync with Classroom" to import your
            students from Google Classroom.
          </h6>
        </div>
      ),
      styles: {
        options: {
          width: 350,
        },
        buttonNext: {
          background: "#2b95f9",
        },
      },
      placement: "right",
      target: ".joyride-2",
    },

    {
      content: (
        <div>
          <h6>Let's move to the "Students" tab.</h6>
        </div>
      ),
      styles: {
        options: {
          width: 350,
        },
        buttonNext: {
          background: "#2b95f9",
        },
      },
      placement: "right",
      target: ".joyride-3",
    },

    {
      content: (
        <div>
          <h6>If you need to add students, click here.</h6>
        </div>
      ),
      placement: "bottom",
      styles: {
        options: {
          width: 300,
        },
        buttonNext: {
          background: "#2b95f9",
        },
      },
      target: ".joyride-4",
    },
  ];

  const handleCallback = CallBackProps => {
    const { index, type, action } = CallBackProps;

    if (type === "step:after" && index === 0 /* or step.target === '#home' */) {
      history.push("/teacher/classes");
      setIndex(1);
      localStorage.setItem("joyride-step-index", 1);
    } else if (type === "step:after" && index === 1) {
      if (action === "next") {
        history.push("/teacher/students");
        setIndex(2);
        localStorage.setItem("joyride-step-index", 2);
      } else {
        setIndex(0);
        localStorage.setItem("joyride-step-index", 0);
      }
    } else if (type === "step:after" && index === 2) {
      if (action === "next") {
        setIndex(3);
        localStorage.setItem("joyride-step-index", 3);
      } else {
        history.push("/teacher/classes");
        setIndex(1);
        localStorage.setItem("joyride-step-index", 1);
      }
    } else if (type === "step:after" && index === 3) {
      if (action === "next") {
        setRun(false);
        setIndex(0);
        localStorage.setItem("joyride-step-index", 0);
      } else {
        setIndex(2);
        localStorage.setItem("joyride-step-index", 2);
      }
    }

    if (action === "skip") {
      setRun(false);
      setIndex(0);
      localStorage.setItem("joyride-step-index", 0);
    }

    // if (type === "step:after" && index === 0 /* or step.target === '#home' */) {
    //   history.push("/teacher/classes");
    //   setIndex(2);
    // } else if (type === "step:after" && index === 1) {
    //   if (action === "next") {
    //     setRun(false);
    //     history.push("/teacher/students");
    //   } else {
    //     history.push("/teacher/students");
    //     setRun(false);
    //     setIndex(0);
    //   }
    // } else if (type === "step:after" && action === "prev" && index === 2) {
    //   setRun(false);

    //   history.push("/teacher/classes");
    // } else if (action === "reset" || lifecycle === "complete") {
    //   setRun(false);
    //   setIndex(0);
    // }
  };

  const {
    userDetails: {
      email = "",
      profile: { first_name = "", last_name = "" },
      role_name,
    },
  } = useSelector(({ auth }) => auth);

  const [isShowTeacherWelcomePopup, setIsShowTeacherWelcomePopup] = useState(
    false,
  );

  useEffect(() => {
    if (!location.pathname.includes("teaching-tools")) {
      setIsShowTeacherWelcomePopup(true);
    }
  }, []); // eslint-disable-line
  useEffect(() => {
    // remove condition for implement in all env
    if (
      role_name === "teacher" &&
      process.env.REACT_APP_IS_HELP_SCOUT_DISABLE !== "yes"
    ) {
      document.getElementById("beacon-container") &&
        (document.getElementById("beacon-container").style.display = "block");
      return (
        <>
          <script type="text/javascript">
            {
              !(function(e, t, n) {
                function a() {
                  var e = t.getElementsByTagName("script")[0],
                    n = t.createElement("script");
                  // eslint-disable-next-line no-unused-expressions, no-sequences
                  (n.type = "text/javascript"),
                    (n.async = !0),
                    (n.src = "https://beacon-v2.helpscout.net"),
                    e.parentNode.insertBefore(n, e);
                }
                if (
                  ((e.Beacon = n = function(t, n, a) {
                    e.Beacon.readyQueue.push({
                      method: t,
                      options: n,
                      data: a,
                    });
                  }),
                  (n.readyQueue = []),
                  "complete" === t.readyState)
                )
                  return a();
                e.attachEvent
                  ? e.attachEvent("onload", a)
                  : e.addEventListener("load", a, !1);
              })(window, document, window.Beacon || function() {})
            }
          </script>
          <script type="text/javascript">
            {window.Beacon("init", "b97acca9-dc14-4acb-ab9e-d9a7d0aee418")}
          </script>
        </>
      );
    } else {
      document.getElementById("beacon-container") &&
        (document.getElementById("beacon-container").style.display = "none");
    }

    return () => {
      document.getElementById("beacon-container") &&
        (document.getElementById("beacon-container").style.display = "none");
    };
  }, [role_name]);

  // useEffect(() => {
  //   if (role_name === "teacher") {
  //     return (
  //       <script type="text/javascript">
  //         {(function() {
  //           var script = document.createElement("script");
  //           script.setAttribute(
  //             "driftly-api",
  //             "HbmkyV1VhWWC5AlIU9BHuvZYiqy1D4MoKvhnwbmSauroS",
  //           );
  //           script.src =
  //             "https://storage.googleapis.com/driftly-cdn/driftly-loader.umd.js";
  //           document.head.appendChild(script);
  //         })()}
  //       </script>
  //     );
  //   }
  // }, [role_name]);

  useEffect(() => {
    if (
      process.env.REACT_APP_ENV === "staging" ||
      process.env.REACT_APP_ENV === "alpha" ||
      process.env.REACT_APP_ENV === "development" ||
      process.env.REACT_APP_ENV === "production"
    ) {
      return (
        <>
          <script>
            {
              (window.usetifulTags = {
                userId: userDetails.id,
                userFirstName: userDetails.profile.first_name,
                signInCount: userDetails.login_count + "",
                isShowCheckList:
                  userDetails.profile.is_welcome_close === 1 ? "ON" : "OFF",
              })
            }
          </script>
          <script type="text/javascript">
            {(function(w, d, s) {
              var a = d.getElementsByTagName("head")[0];
              var r = d.createElement("script");
              r.async = 1;
              r.src = s;
              r.setAttribute("id", "usetifulScript");
              r.dataset.token = "363ec99b027cc7ea1798856b918f1ab8";
              a.appendChild(r);
            })(window, document, "https://www.usetiful.com/dist/usetiful.js")}
          </script>
        </>
      );
    }
  }, [role_name]); // eslint-disable-line

  const [visibleUserMenu, setVisibleUserMenu] = React.useState(false);

  const classCodeList = [];

  const searchClassCode = "";

  const [selectedClassCode, setSelectClassCode] = useState(
    teacherClassCode ? teacherClassCode : "",
  );

  useEffect(() => {
    if (!searchClassCode) {
      setSelectClassCode("");
    }
  }, [searchClassCode]); // eslint-disable-line

  useEffect(() => {
    if (teacherClassCode) {
      setSelectClassCode(teacherClassCode);
      dispatch(headerSearchClassCode(teacherClassCode));
    }
  }, [teacherClassCode]); // eslint-disable-line

  const classCodeListOption = [
    {
      label: "All Classes",
      value: "",
    },

    ...classCodeList.map(classCode => {
      return {
        label: `${classCode.name} - ${classCode.class_code}`,
        value: classCode.class_code,
      };
    }),
  ];

  const handleChangeClassCode = e => {
    setSelectClassCode(e.target.value);

    dispatch(headerSearchClassCode(e.target.value));
    history.push(`/teacher/students`);
  };

  const handleChangeSearchText = e => {
    dispatch(headerSearchText(e.target.value));
  };

  const handleCloseTeacherWelcomePopup = () => {
    // localStorage.setItem("is_show_welcome_popup", true);

    setIsShowTeacherWelcomePopup(false);
  };

  const tutorialsObj = {
    1: {
      itemTitle: "MathFactLab 101: Getting Started",
      tutorialIframeTitle: "MathFactLab 101: Getting Started",
      tutorialIframeURL:
        "https://player.vimeo.com/video/793753544?h=69ed5603ed",
    },
    2: {
      itemTitle: "The Placement Test",
      tutorialIframeTitle: "The Placement Test",
      tutorialIframeURL:
        "https://player.vimeo.com/video/803991930?h=0100772466",
    },
    3: {
      itemTitle: "The Student Experience",
      tutorialIframeTitle: "The Student Experience",
      tutorialIframeURL:
        "https://player.vimeo.com/video/800363534?h=2eee64595f",
    },
    4: {
      itemTitle: "Using Ipads and Tablets",
      tutorialIframeTitle: "Using Ipads and Tablets",
      tutorialIframeURL:
        "https://player.vimeo.com/video/809561434?h=64b5a19366",
    },
  };
  const handleShowTutorialPopup = key => {
    setTuTorialKey(key);
    setIsShowTutorialPopup(true);
  };

  return (
    <>
      {isShowJoyrideDemo && (
        <Joyride
          // callback={handleJoyrideCallback}
          continuous
          run={run}
          stepIndex={stepIndex}
          steps={steps}
          showProgress
          showSkipButton
          hideCloseButton
          callback={handleCallback}
          styles={{
            options: {
              zIndex: 10000,
            },
          }}
        />
      )}
      <Layout.Header className="dashboard-header">
        <MenuOutlined className="drawerToggle" onClick={onMenuClick} />

        <div className="tutorial">
          <Dropdown
            overlay={
              <Menu>
                {Object.keys(tutorialsObj).map(tutorialItem => {
                  return (
                    <Menu.Item
                      key={tutorialItem}
                      onClick={() => handleShowTutorialPopup(tutorialItem)}
                    >
                      {tutorialsObj[tutorialItem].itemTitle}
                    </Menu.Item>
                  );
                })}
              </Menu>
            }
          >
            <Button size="medium">
              <Space>
                Tutorials
                <DownOutlined />
              </Space>
            </Button>
          </Dropdown>
        </div>

        {process.env.REACT_APP_ENV === "alpha" && (
          <div className="login-count-show">
            <Tag className="ml-30">
              Login count : <b>{userDetails.login_count}</b>
            </Tag>
          </div>
        )}
        <div style={{ flex: 1 }} className="class-code-dropdown" />
        {location.pathname === "/teacher/students" && role_name !== "parent" && (
          <Select
            name="learningMode"
            className="form-control"
            value={selectedClassCode}
            options={classCodeListOption}
            onChange={handleChangeClassCode}
            style={{ width: 260 }}
          >
            {classCodeListOption}
          </Select>
        )}
        {location.pathname === "/teacher/classes" && (
          <div className="search with-button">
            <input
              type="text"
              className="form-control search with-button header-searchbar"
              placeholder="Search"
              onChange={e => handleChangeSearchText(e)}
              name="search"
            />
            <div className="btn-icon-trans">
              <i className="icon-search" aria-hidden="true"></i>
            </div>
          </div>
        )}
        {location.pathname === "/teacher/students" && (
          <div className="search with-button">
            <input
              type="text"
              className="form-control search with-button header-searchbar"
              placeholder="Search"
              onChange={e => handleChangeSearchText(e)}
              name="search"
            />
            <div className="btn-icon-trans">
              <i className="icon-search" aria-hidden="true"></i>
            </div>
          </div>
        )}
        <div className="user-profile-menu">
          <Dropdown
            trigger="click"
            overlay={<UserMenu closeMenu={() => setVisibleUserMenu(false)} />}
            visible={visibleUserMenu}
            onVisibleChange={setVisibleUserMenu}
          >
            <div className="user-menu-wrapper">
              {/* <Badge dot className="avatar"> */}
              <Avatar
                size={40}
                style={{ backgroundColor: "#2dca89" }}
                icon={<UserOutlined />}
              />
              {/* </Badge> */}

              {first_name && last_name && (
                <div className="user-profile-short ml-10">
                  <strong className="title-text font-14 font-semibold">
                    {`${first_name.charAt(0).toUpperCase() +
                      first_name.slice(1)} ${last_name.charAt(0).toUpperCase() +
                      last_name.slice(1)}`}
                  </strong>
                  <span className="font-small">{email}</span>{" "}
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </Layout.Header>
      {location.pathname === "/teacher/classes" &&
      false && ( //temp false
          <TeacherWelcomePopup
            close={handleCloseTeacherWelcomePopup}
            open={
              userDetails.role_id === userRole.TEACHER.role_id &&
              userDetails &&
              !userDetails.profile.is_disabled_welcome_banner &&
              isShowTeacherWelcomePopup
            }
          />
        )}
      {isShowTutorialPopup && (
        <TutorialVideoPopup
          isOpenPopup={isShowTutorialPopup}
          closePopup={setIsShowTutorialPopup}
          tutorial={tutorialsObj[tutorialKey]}
        />
      )}
    </>
  );
};

export default Header;
