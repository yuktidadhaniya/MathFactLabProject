import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Avatar,
  Menu,
  //  Modal
} from "antd";
// import moment from "moment";
import {
  UserOutlined,
  PoweroffOutlined,
  // QuestionCircleOutlined,
} from "@ant-design/icons";
import { logout } from "toolkit/slice/auth";

import "assets/sass/components/user-menu.scss";

const menus = [
  { path: "/account", label: "Update Profile", icon: UserOutlined },
];

const UserMenu = ({ closeMenu }) => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  let history = useHistory();
  let location = useLocation();

  const selectedIndex = menus.findIndex(menu => menu.path === pathname);

  const { userDetails } = useSelector(({ auth }) => auth);

  const {
    email = "",
    profile: { first_name = "", last_name = "" },
  } = userDetails;

  const onClickLogOut = () => {
    closeMenu();
    handleLogoutUser();

    // Modal.confirm({
    //   title: "Are you sure you want to logout now?",
    //   icon: <QuestionCircleOutlined />,
    //   okText: "Log Out",
    //   onOk() {
    //     handleLogoutUser();
    //   },
    // });
  };

  //Logout success redirection to login page
  const authLogoutSuccess = () => {
    localStorage.clear();
    history.push("/teacher/login");
  };
  // const handleLogout = () => {
  //   dispatch(logout(authLogoutSuccess, "Teacher Layout"));
  // };
  // Logout user
  const handleLogoutUser = () => {
    dispatch(logout(authLogoutSuccess));
  };
  // const handleRemoveAccountSuccess = () => {
  //   //  Not clearing all storage for class code
  //   localStorage.removeItem("user-token");

  //   sessionStorage.clear();
  //   history.push("/teacher/login");
  // };
  // const handleRemoveUserAccount = () => {
  //   dispatch(removeUserDetails(handleRemoveAccountSuccess));
  // };
  // const handleRemoveAccount = () => {
  //   closeMenu();
  //   Modal.confirm({
  //     title: (
  //       <>
  //         <div>Are you sure you want to cancel your account?</div>
  //         <div className="mt-10">
  //           This will permanently delete your teacher/parent account and all
  //           associated student accounts. Once selected, this cannot be undone.{" "}
  //         </div>
  //       </>
  //     ),
  //     icon: <QuestionCircleOutlined />,
  //     okText: "Permanently delete account",
  //     width: 500,
  //     okButtonProps: {
  //       danger: true,
  //     },
  //     onOk() {
  //       handleRemoveUserAccount();
  //     },
  //   });
  // };

  return (
    <div className="card">
      <div className="header-user-menu">
        {/**  {first_name && last_name && (
          <Avatar>{`${first_name.charAt(0).toUpperCase()} ${last_name
            .charAt(0)
            .toUpperCase()}`}</Avatar>
        )}*/}
        <Avatar size={40} icon={<UserOutlined />} />

        <div className="textEllipsis">
          <h4 className="textEllipsis">
            {`${first_name.charAt(0).toUpperCase() +
              first_name.slice(1)} ${last_name.charAt(0).toUpperCase() +
              last_name.slice(1)}`}
          </h4>

          <span className="textEllipsis" type="secondary">
            {email}
          </span>
        </div>
      </div>
      <Menu selectedKeys={[`${selectedIndex}`]} className="menu">
        {menus.map((menu, index) => (
          <Menu.Item key={index} icon={<menu.icon />}>
            <Link to={menu.path}> {menu.label}</Link>
          </Menu.Item>
        ))}
        {/* {(process.env.REACT_APP_ENV === "development" ||
          process.env.REACT_APP_ENV === "staging") && (
          <Menu.Item icon={<PoweroffOutlined />} onClick={handleRemoveAccount}>
            <Link to={location.pathname}>Remove Account</Link>
          </Menu.Item>
        )} */}
        <Menu.Item icon={<PoweroffOutlined />} onClick={onClickLogOut}>
          <Link to={location.pathname}> Log Out</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default UserMenu;
