import React from "react";
import AuthHeader from "components/DashboardLayout/Header";
import ErrorBoundary from "components/ErrorBoundary";

function StudentLayout(props) {
  return (
    <>
      <ErrorBoundary>
        <AuthHeader />
      </ErrorBoundary>
      {props.children}
    </>
  );
}

export default StudentLayout;
