import React from "react";
import { Redirect } from "react-router-dom";
import { generateRoutesFromConfigs } from "utils/helpers";
import { StudentConfig } from "pages/student/studentConfig";
import { StudentAuthConfig } from "pages/student/studentConfig";
import { TeacherConfig } from "pages/teacher/teacherConfig";
import { TeacherAuthConfig } from "pages/teacher/teacherConfig";

const routeConfigs = [
  StudentAuthConfig,
  StudentConfig,
  TeacherConfig,
  TeacherAuthConfig,
];

const routes = [
  {
    path: "/practice-select-activity",
    exact: true,
    component: () => <Redirect to="/practice-test" />,
  },
  ...generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    exact: true,
    component: () => <Redirect to="/student/login" />,
  },

  {
    component: () => <Redirect to="/error-404" />,
  },
];

export default routes;
