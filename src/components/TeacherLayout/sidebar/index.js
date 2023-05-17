import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Layout, Menu } from "antd";
import LogoIcon from "assets/images/beaker-icon.svg";
import logoImg from "assets/images/logo.svg";
import "assets/sass/components/siderbar.scss";
import { FormOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import StudentsReport from "components/StudentsReport";
import GrowthGauge from "components/GrowthGauge";

const { SubMenu } = Menu;
const menus = [
  // {
  //   path: "/teacher/dashboard",
  //   label: "Home",
  //   icon: <HomeOutlined style={{ fontSize: "25px" }} />,
  //   isDisable: false,
  // },
  {
    path: "/teacher/classes",
    label: "Classes",
    icon: <i className="icon-class-Active joyride-1" aria-hidden="true"></i>,
    isDisable: false,
    isShow: true,
    id: "sidebarListItemClasses",
  },
  {
    path: "/teacher/students",
    label: "Students",
    icon: <i className="icon-students joyride-3" aria-hidden="true"></i>,
    isDisable: false,
    isShow: true,
    id: "sidebarListItemStudents",
  },
  {
    path: "/teacher/teaching-tools",
    label: "Teaching Tools",
    id: "sidebarListItemTeachingTools",

    icon: <i className="icon-teaching-tools" aria-hidden="true"></i>,
    isDisable: false,
    isShow: true,
  },
  {
    label: "Reports",
    icon: <i className="icon-reports" aria-hidden="true"></i>,
    isDisable: false,
    isShow: process.env.REACT_APP_ENV === "production" ? false : true,
    id: "sidebarListItemReports",
  },
  {
    path: "/teacher/classroom-implementation",
    label: (
      <p className="long-lable-sidebar pt-15 mb-0">
        Classroom<br></br>
        Implementation
      </p>
    ),
    labelText: "Classroom Implementation",
    icon: <i className="icon-classroom" aria-hidden="true"></i>,
    isDisable: false,
    isShow: true,
    id: "sidebarListItemClassroom",
  },
  {
    path: "/teacher/faqs",
    label: "FAQs",
    icon: <i className="icon-faqs" aria-hidden="true"></i>,
    isDisable: false,
    isShow: true,
    id: "sidebarListItemFaq",
  },
  // {
  //   path: "/teacher/settings",
  //   label: "Settings",
  //   icon: <SettingOutlined style={{ fontSize: "25px" }} />,
  //   isDisable: false,
  // },
  {
    path: "/teacher/feedback",
    label: "Feedback",
    icon: <FormOutlined style={{ fontSize: "25px" }} />,
    isDisable: false,
    isShow: true,
    id: "sidebarListItemFeedback",
  },
];

const SideBar = ({
  // className,
  onClose,
  isSidebarVisible,
  // setIsSidebarVisible,
}) => {
  const { pathname } = useLocation();
  const {
    userDetails: { role_name },
  } = useSelector(({ auth }) => auth);

  const [isShowLogo, setShowLogo] = useState(false);
  const [isShowStudentReports, setIsShowStudentReports] = useState(false);
  const [isShowGrowthGaugePopup, setIsShowGrowthGaugePopup] = useState(false);

  let menuList = menus;

  if (role_name === "parent") {
    menuList = menuList.filter(
      menu =>
        ![
          "/teacher/classes",
          "/teacher/teaching-tools",
          "/teacher/classroom-implementation",
        ].includes(menu.path),
    );
  }

  const selectedIndex = menuList
    .filter(menu => menu.isShow)
    .findIndex(menu => menu.path === pathname);

  return (
    <>
      <div>
        <Layout.Sider
          width={260}
          className={isSidebarVisible ? `sider-open sider-show` : `sider`}
          onMouseOver={() => {
            !isSidebarVisible && setShowLogo(true);
          }}
          onMouseLeave={() => {
            setShowLogo(false);
          }}
        >
          <div className="logo">
            <Link to="/">
              {!isSidebarVisible && !isShowLogo ? (
                <img
                  src={LogoIcon}
                  className="login-logo sm"
                  alt="Math Fact Lab"
                  key="logo-small"
                />
              ) : (
                <img
                  src={logoImg}
                  className="login-logo"
                  alt="Math Fact Lab"
                  key="logo-main"
                />
              )}
            </Link>
          </div>

          <Menu
            mode="inline"
            selectedKeys={[`${selectedIndex}`]}
            className="menu"
          >
            {menuList
              .filter(menu => menu.isShow)
              .map((menu, index) => {
                return menu.label === "Reports" ? (
                  <SubMenu
                    key="sub1"
                    title={menu.label}
                    className="ant-menu-sub-title"
                    icon={<span className="sidebar-icon ">{menu.icon}</span>}
                  >
                    <Menu.Item
                      key="sub2"
                      onClick={() => setIsShowGrowthGaugePopup(true)}
                      icon={
                        <span className="sidebar-icon ">
                          <i
                            className="icon-growth-gauge"
                            aria-hidden="true"
                          ></i>
                        </span>
                      }
                    >
                      Growth Gauge
                    </Menu.Item>
                    <Menu.Item
                      onClick={() => setIsShowStudentReports(true)}
                      key="sub3"
                      icon={
                        <span className="sidebar-icon ">
                          <i
                            className="icon-report-generator"
                            aria-hidden="true"
                          ></i>
                        </span>
                      }
                    >
                      Report Generator
                    </Menu.Item>
                  </SubMenu>
                ) : (
                  <Menu.Item
                    key={index}
                    id={menu.id}
                    // eslint-disable-next-line react/no-unknown-property
                    useful={menu.id}
                    icon={<span className="sidebar-icon ">{menu.icon}</span>}
                    onClick={onClose}
                    className={` ${menu.isDisable ? "link-disabled" : ""}`}
                  >
                    {!isSidebarVisible ? (
                      <div
                        // placement="left"
                        // title={menu.labelText || menu.label}
                        key={index}
                      >
                        {menu.path ? (
                          <Link to={menu.path}> {menu.label}</Link>
                        ) : (
                          menu.label
                        )}
                      </div>
                    ) : menu.path ? (
                      <Link to={menu.path}> {menu.label}</Link>
                    ) : (
                      menu.label
                    )}
                  </Menu.Item>
                );
              })}
          </Menu>
        </Layout.Sider>
      </div>
      {isShowStudentReports && (
        <StudentsReport
          isOpenPopup={isShowStudentReports}
          closePopup={setIsShowStudentReports}
        />
      )}
      {isShowGrowthGaugePopup && (
        <GrowthGauge
          user={""}
          close={setIsShowGrowthGaugePopup}
          isShowProgressTablePopup={isShowGrowthGaugePopup}
        />
      )}
    </>
  );
};

export default SideBar;
