// import LoginPage from "pages/teacher"
import StudentLoginPage from "./login";
import StudentLabPage from "./placement-test";
import StudentPracticeTestPage from "./practice-test";
import StudentPracticeSessionPage from "./practice-session";
import StudentPracticeSelectActivityPage from "./practice-select-activity";
import authRoles from "config/const/authRoles";

const StudentConfig = {
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/student/login",
      component: StudentLoginPage,
      isAuth: false,
    },
  ],
};

const StudentAuthConfig = {
  auth: authRoles.student,
  routes: [
    {
      path: "/student/placement-test",
      component: StudentLabPage,
      isAuth: true,
    },
    {
      path: "/student/practice-test",
      component: StudentPracticeTestPage,
      isAuth: true,
    },
    {
      path: "/student/practice-session",
      component: StudentPracticeSessionPage,
      isAuth: true,
    },
    {
      path: "/student/practice-select-activity",
      component: StudentPracticeSelectActivityPage,
      isAuth: true,
    },
  ],
};
export { StudentAuthConfig, StudentConfig };
