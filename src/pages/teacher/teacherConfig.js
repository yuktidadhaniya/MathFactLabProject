import authRoles from "config/const/authRoles";
import TeacherLoginPage from "./login";
import TeacherSignupPage from "./signup";
import TeacherForgotPasswordPage from "./forgot-password";
import TeacherResetPasswordPage from "./reset-password";
import TeacherStudentListPage from "./students";
import TeacherClassesListPage from "./classes";
import TeacherFAQsPage from "./faqs";
import TeacherTeachingToolsPage from "./teaching-tools";
import TeacherSelectActivityPage from "./practice-select-activity";
import TeacherPracticeSessionPage from "./practice-session";
import ThankyouPage from "./thank-you";
import ConfirmationPage from "./confirmation";
import TeacherClassroomImplementationPage from "./classroom-implementation";
import EmailVerificationPage from "./email-verify";
import ResendEmailPage from "./resend-email";
import LevelLifterInterviewPage from "./level-lifter-interview";
import Feedback from "./feedback";
import Settings from "./settings";
import Dashboard from "./home";
import UpdateProfile from "./update-profile";

const TeacherAuthConfig = {
  auth: [...authRoles.teacher, ...authRoles.parent, ...authRoles.superAdmin],
  routes: [
    {
      path: "/teacher/dashboard",
      component: Dashboard,
      isAuth: true,
      isShowAppLayout: true,
    },
    {
      path: "/teacher/classes",
      component: TeacherClassesListPage,
      isAuth: true,
      isShowAppLayout: true,
    },
    {
      path: "/teacher/students",
      component: TeacherStudentListPage,
      isAuth: true,
      isShowAppLayout: true,
    },

    {
      path: "/teacher/teaching-tools",
      component: TeacherTeachingToolsPage,
      isAuth: true,
      isShowAppLayout: true,
    },
    {
      path: "/teacher/practice-session",
      component: TeacherPracticeSessionPage,
      isAuth: true,
      isShowAppLayout: false,
    },
    {
      path: "/teacher/practice-select-activity",
      component: TeacherSelectActivityPage,
      isAuth: true,
      isShowAppLayout: false,
    },
    {
      path: "/teacher/level-lifter-interview",
      component: LevelLifterInterviewPage,
      isAuth: true,
      isShowAppLayout: false,
    },
    {
      path: "/teacher/faqs",
      component: TeacherFAQsPage,
      isAuth: true,
      isShowAppLayout: true,
    },
    {
      path: "/teacher/feedback",
      component: Feedback,
      isAuth: true,
      isShowAppLayout: true,
    },
    {
      path: "/teacher/classroom-implementation",
      component: TeacherClassroomImplementationPage,
      isAuth: true,
      isShowAppLayout: true,
    },
    {
      path: "/teacher/settings",
      component: Settings,
      isAuth: true,
      isShowAppLayout: true,
    },
    {
      path: "/account",
      component: UpdateProfile,
      isAuth: true,
      isShowAppLayout: true,
    },
  ],
};

const TeacherConfig = {
  auth: authRoles.onlyGuest,
  routes: [
    {
      path: "/teacher/login",
      component: TeacherLoginPage,
      isAuth: false,
    },

    {
      path: "/teacher/signup",
      component: TeacherSignupPage,
      isAuth: false,
    },
    {
      path: "/teacher/forgot-password",
      component: TeacherForgotPasswordPage,
      isAuth: false,
    },
    {
      path: "/reset-password/:id",
      component: TeacherResetPasswordPage,
      isAuth: false,
    },

    {
      path: "/thank-you",
      component: ThankyouPage,
      isAuth: false,
    },
    {
      path: "/resend-email",
      component: ResendEmailPage,
      isAuth: false,
    },

    {
      path: "/confirmation",
      component: ConfirmationPage,
      isAuth: false,
    },
    {
      path: "/email-verify",
      component: EmailVerificationPage,
      isAuth: false,
    },
  ],
};
export { TeacherConfig, TeacherAuthConfig };
