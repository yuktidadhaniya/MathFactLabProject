import React, { useState } from "react";
import { useEffect } from "react";
import { Layout } from "antd";
import Header from "./header";
import Sidebar from "./sidebar";
import { useLocation } from "react-router-dom";
import "assets/sass/components/teacher-layout.scss";

const { Content } = Layout;

const MainLayout = ({ children, ...props }) => {
  const { pathname } = useLocation();
  const [isSidebarVisible, setIsSidebarVisible] = useState(
    localStorage.getItem("is-full-sidebar-visible") === "true",
  );

  const setIsSidebarVisibleWithLocalStorageUpdate = status => {
    setIsSidebarVisible(status);
    localStorage.setItem("is-full-sidebar-visible", status + "");
  };

  useEffect(() => {
    setTimeout(() => window.scrollTo(0, 0), 2);
  }, [pathname]);

  return (
    <Layout style={{ minHeight: "100vh" }} className="teacher-layout-wrapper">
      <Sidebar
        isSidebarVisible={isSidebarVisible}
        setIsSidebarVisible={value =>
          setIsSidebarVisibleWithLocalStorageUpdate(value)
        }
      />
      <div className="rightPanel">
        <Header
          {...props}
          onMenuClick={() =>
            setIsSidebarVisibleWithLocalStorageUpdate(!isSidebarVisible)
          }
        />
        <Content className="content">{children}</Content>
      </div>
    </Layout>
  );
};

export default MainLayout;
