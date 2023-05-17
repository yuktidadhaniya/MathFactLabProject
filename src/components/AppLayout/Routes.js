import React from "react";
import { withRouter, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactGA from "react-ga";
import TagManager from "react-gtm-module";
import history from "../../@history";
import Socket from "components/Socket";
import CookieBanner from "components/CookieBanner";
import ClassLink from "components/ClassLink";
import Clever from "components/Clever";
import { StudentConfig } from "pages/student/studentConfig";
import { StudentAuthConfig } from "pages/student/studentConfig";
import { TeacherConfig } from "pages/teacher/teacherConfig";
import { TeacherAuthConfig } from "pages/teacher/teacherConfig";
import { PublicRoute } from "./PublicRoute";
import { PrivateRoute } from "./PrivateRoute";
import { TeacherPrivateRoute } from "./TeacherPrivateRoute";
import { Route, Redirect } from "react-router-dom";
import useOnlineStatus from "@rehooks/online-status";
import InternetConnectionErrorPopup from "components/InternetConnectionErrorPopup";

// common layout  component for all role user
const Routes = props => {
  let location = useLocation();
  const isOnline = useOnlineStatus();
  const { routes: teacherAuthRoute } = TeacherAuthConfig;
  const { routes: teacherRoute } = TeacherConfig;
  const { routes: studentAuthRoute } = StudentAuthConfig;
  const { routes: studentRoute } = StudentConfig;
  const {
    userDetails,
    userDetails: { role_name },
  } = useSelector(({ auth }) => auth);

  console.log("role_name", userDetails, role_name);

  // google analytics integration

  const tagManagerArgs = {
    gtmId: "GTM-MGV4G4P",
  };
  if (
    process.env.REACT_APP_ENV !== "development" ||
    process.env.REACT_APP_ENV !== "staging"
  ) {
    // google analytics
    ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID, {
      // debug: true,
      debug: false,
      titleCase: false,
      gaOptions: {
        userId: userDetails.id,
        // name : `${userDetails.profile.last_name} ${userDetails.profile.first_name} `
      },
    });
    // ReactGA.pageview(window.location.pathname);

    // Initialize google analytics page view tracking
    history.listen(location => {
      ReactGA.set({ page: location.pathname }); // Update the user's current page
      ReactGA.pageview(location.pathname); // Record a pageview for the given page
    });

    // google tag manager

    TagManager.initialize(tagManagerArgs);

    window.dataLayer.push({
      event: "pageview",
      page: {
        url: location.pathname,
      },
    });
  }

  const layoutRender = userType => {
    console.log("userType", userType);

    switch (userType) {
      case "super_admin": {
        return (
          <>
            {teacherAuthRoute
              .filter(route => route.isShowAppLayout)
              .map(route => {
                return (
                  <TeacherPrivateRoute
                    key={route.path}
                    component={route.component}
                    exact
                    path={route.path}
                  />
                );
              })}
            {teacherAuthRoute
              .filter(route => !route.isShowAppLayout)
              .map(route => {
                return (
                  <PrivateRoute
                    key={route.path}
                    component={route.component}
                    exact
                    path={route.path}
                  />
                );
              })}
          </>
        );
      }
      case "parent": {
        return (
          <>
            {teacherAuthRoute
              .filter(
                route =>
                  route.isShowAppLayout && route.path !== "/teacher/classes",
              )
              .map(route => {
                return (
                  <TeacherPrivateRoute
                    key={route.path}
                    component={route.component}
                    exact
                    path={route.path}
                  />
                );
              })}
            {teacherAuthRoute
              .filter(route => !route.isShowAppLayout)
              .map(route => {
                return (
                  <PrivateRoute
                    key={route.path}
                    component={route.component}
                    exact
                    path={route.path}
                  />
                );
              })}
            <Route
              exact
              path="*"
              render={props => <Redirect to="/teacher/students" {...props} />}
            />
          </>
        );
      }
      case "student": {
        return (
          <>
            {studentAuthRoute.map(route => {
              return (
                <PrivateRoute
                  key={route.path}
                  component={route.component}
                  exact
                  path={route.path}
                />
              );
            })}
          </>
        );
      }
      default:
        return (
          <>
            {teacherRoute.map(route => {
              return (
                <PublicRoute
                  key={route.path}
                  component={route.component}
                  exact
                  path={route.path}
                />
              );
            })}
            {studentRoute.map(route => {
              return (
                <PublicRoute
                  key={route.path}
                  component={route.component}
                  exact
                  path={route.path}
                />
              );
            })}
            <Route
              exact
              path="/"
              render={props => <Redirect to="/teacher/login" {...props} />}
            />
            <Route path="/class-link" component={ClassLink} />
            <Route path="/clever" component={Clever} />
          </>
        );
    }
  };

  return (
    <>
      {/* Cookie consent */}
      <CookieBanner />
      {/* Socket disable in local  */}
      {process.env.REACT_APP_IS_SOCKET_DISABLE !== "YES" && <Socket />}

      <div className="app">{layoutRender(role_name)}</div>
      {!isOnline && <InternetConnectionErrorPopup />}
    </>
  );
};

export default withRouter(React.memo(Routes));
