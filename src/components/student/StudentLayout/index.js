import React from "react";
import AuthHeader from "components/student/StudentHeader";
const StudentLayout = props => {
  return (
    <>
      <AuthHeader />
      {props.children}
    </>
  );
};

export default StudentLayout;
