import React from "react";

import AuthHeader from "components/student/StudentHeader";
import ErrorBoundary from "components/ErrorBoundary";

import PlacementTest from "./PlacementTest";

function StudentPlacementPage(props) {
  //student placement test page
  return (
    <>
      <ErrorBoundary>
        <AuthHeader />
      </ErrorBoundary>
      <ErrorBoundary>
        <PlacementTest />
      </ErrorBoundary>
    </>
  );
}

export default StudentPlacementPage;
