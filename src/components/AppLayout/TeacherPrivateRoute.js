import React from "react";
import { Route } from "react-router-dom";
import TeacherLayout from "components/TeacherLayout";

export const TeacherPrivateRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => (
        <TeacherLayout>
          <Component {...props} />
        </TeacherLayout>
      )}
    />
  );
};
