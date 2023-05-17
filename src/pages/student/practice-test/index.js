import React from "react";
import AuthHeader from "components/student/StudentHeader";
import ErrorBoundary from "components/ErrorBoundary";
import PracticeTest from "./PracticeTest";

function StudentLevelLifterPage(props) {
  //student placement test page
  return (
    <>
      <ErrorBoundary>
        <AuthHeader />
      </ErrorBoundary>
      <ErrorBoundary>
        <PracticeTest />
      </ErrorBoundary>
    </>
  );
}

export default StudentLevelLifterPage;
