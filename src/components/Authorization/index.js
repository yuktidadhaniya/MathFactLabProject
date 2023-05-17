import React, { Component } from "react";
import { hasPermission } from "utils/helpers";
import { matchRoutes } from "react-router-config";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import AppContext from "AppContext";
import { getUserDetails } from "toolkit/slice/auth";
import Loader from "../Loader";
import AccessDeniedPage from "components/AccessDeniedPage";

class Authorization extends Component {
  constructor(props, context) {
    super(props);
    const { routes } = context;
    this.state = {
      accessGranted: false,
      routes,
      redirectUrl: "",
    };
  }

  componentDidMount() {
    if (
      !Object.keys(this.props.userDetails).length &&
      localStorage.getItem("user-token")
    ) {
      console.log(11111);
      this.props.getUserDetails();
    }
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }

  componentDidUpdate() {
    if (!this.state.accessGranted) {
      this.redirectRoute();
    }
  }
  redirectRoute() {
    const { location, history, userDetails } = this.props;
    const { pathname, state } = location;
    const matched = matchRoutes(this.state.routes, pathname)[0];
    const redirectUrl =
      state && state.redirectUrl && userDetails ? state.redirectUrl : pathname;

    if (matched) {
      if (matched.route.isAuth && !localStorage.getItem("user-token")) {
        history.push({
          pathname: "/teacher/login",
        });
      }

      if (!matched.route.isAuth) {
        if (localStorage.getItem("user-token")) {
          history.push({
            pathname: "/teacher/students",
          });
        }
      }
    } else {
      history.push({
        pathname: redirectUrl,
      });
    }
  }
  static getDerivedStateFromProps(props, state) {
    const { location, userPermissions } = props;
    const { pathname } = location;

    const matched = matchRoutes(state.routes, pathname)[0];

    return {
      accessGranted: matched
        ? hasPermission(matched.route.auth, userPermissions)
        : true,
    };
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextState.accessGranted !== this.state.accessGranted ||
      this.props.fetchingUserDetailsLoading !==
        nextProps.fetchingUserDetailsLoading
    );
  }

  render() {
    return this.props.fetchingUserDetailsLoading ? (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100%",
        }}
      >
        <Loader />
      </div>
    ) : this.state.accessGranted ? (
      <React.Fragment>{this.props.children}</React.Fragment>
    ) : (
      <AccessDeniedPage />
      // {/* <h1>No page for you!</h1> */}
    );
  }
}

function mapStateToProps({ auth }) {
  console.log("auth", auth);
  return {
    userDetails: auth.userDetails,
    fetchingUserDetailsLoading: auth.fetchingUserDetailsLoading,
    userPermissions: auth.userPermissions || [],
  };
}

Authorization.contextType = AppContext;

export default withRouter(
  connect(mapStateToProps, {
    getUserDetails,
  })(Authorization),
);
