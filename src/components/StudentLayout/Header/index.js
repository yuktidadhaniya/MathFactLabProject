import React from "react";
import Header from "./Header";
import { useLocation } from "react-router-dom";
import ErrorBoundary from "components/ErrorBoundary";

function StudentLayout(props) {
  let location = useLocation();

  return (
    <>
      <div className="home">
        {/* <!-- Main Wrapper --> */}
        <main
          className={
            location.pathname.includes("teacher")
              ? "main-wrapper login-main-wrapper background-teacher"
              : "main-wrapper login-main-wrapper background-student"
          }
        >
          <section className="login-wrapper">
            <Header />
            {props.children}
          </section>
        </main>
      </div>
    </>
  );
}

export default StudentLayout;
