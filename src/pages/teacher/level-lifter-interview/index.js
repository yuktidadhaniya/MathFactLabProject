import React from "react";
import AuthHeader from "components/DashboardLayout/Header";
import ErrorBoundary from "components/ErrorBoundary";
import PracticeTest from "./PracticeTest";

function LevelLifterInterviewPage(props) {
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

export default LevelLifterInterviewPage;
