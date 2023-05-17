import {
  AUTH_LOGIN_STUDENT,
  AUTH_LOGIN_STUDENT_SUCCESS,
  AUTH_LOGIN_STUDENT_FAILURE,
  AUTH_LOGIN_TEACHER,
  AUTH_LOGIN_TEACHER_SUCCESS,
  AUTH_LOGIN_TEACHER_FAILURE,
  AUTH_FORGOT_PASSWORD,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
  AUTH_USER_LOGOUT,
  AUTH_USER_LOGOUT_SUCCESS,
  AUTH_USER_LOGOUT_FAILURE,
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  DELETE_USER_DETAILS,
  DELETE_USER_DETAILS_SUCCESS,
  DELETE_USER_DETAILS_FAILURE,
  AUTH_TEACHER_SIGN_UP,
  AUTH_TEACHER_SIGN_UP_SUCCESS,
  AUTH_TEACHER_SIGN_UP_FAILURE,
  UPDATE_USER_LEVEL_ID,
  UPDATE_USER_DETAILS,
  UPDATE_CURRENT_SUBMISSION_USER_LEVEL_ID,
  AUTH_MAIL_CONFIRM,
  AUTH_MAIL_CONFIRM_SUCCESS,
  AUTH_MAIL_CONFIRM_FAILURE,
  AUTH_RESEND_VERIFICATION_MAIL,
  AUTH_RESEND_VERIFICATION_MAIL_SUCCESS,
  AUTH_RESEND_VERIFICATION_MAIL_FAILURE,
  UPDATE_USER_LEVEL_LIFTER_COUNT,
  UPDATE_TEACHER_PROFILE,
  UPDATE_TEACHER_PROFILE_SUCCESS,
  UPDATE_TEACHER_PROFILE_FAILURE,
  UPDATE_TEACHER_PROFILE_PASSWORD,
  UPDATE_TEACHER_PROFILE_PASSWORD_SUCCESS,
  UPDATE_TEACHER_PROFILE_PASSWORD_FAILURE,
} from "./actionType";
import ReactGA from "react-ga";

import axios from "config/axios";
import { gaErrorLogger } from "utils/helpers";

//TEACHER LOGIN

export const authTeacherSignup = payload => {
  return {
    type: AUTH_TEACHER_SIGN_UP,
    payload: payload,
  };
};

export const authTeacherSignupSuccess = payload => {
  return {
    type: AUTH_TEACHER_SIGN_UP_SUCCESS,
    payload: payload,
  };
};

export const authTeacherSignupFailure = payload => {
  return {
    type: AUTH_TEACHER_SIGN_UP_FAILURE,
    payload: payload,
  };
};

export const teacherSignup = (
  body,
  handleSignUpSuccess,
  handleLoginFailure,
) => async dispatch => {
  dispatch(authTeacherSignup());
  axios
    .post(`/register`, body)
    .then(res => {
      dispatch(authTeacherSignupSuccess(res.data));

      // localStorage.setItem("user-token", res.data.data.token);
      handleSignUpSuccess && handleSignUpSuccess();
    })
    .catch(error => {
      handleLoginFailure && handleLoginFailure();
      dispatch(
        authTeacherSignupFailure({ error: error.response.data.message }),
      );
    });
};

export const teacherSingupWithGoogle = (
  body,
  handleSignUpSuccess,
) => async dispatch => {
  dispatch(authTeacherSignup());
  axios
    .post(`/sign-in-with-google`, body)
    .then(res => {
      dispatch(authTeacherSignupSuccess(res.data.data));
      localStorage.setItem("user-token", res.data.data.token);
      handleSignUpSuccess && handleSignUpSuccess();
    })
    .catch(error => {
      dispatch(
        authTeacherSignupFailure({ error: error.response.data.message }),
      );
    });
};
//STUDENT LOGIN

export const authStudentLogin = payload => {
  return {
    type: AUTH_LOGIN_STUDENT,
    payload: payload,
  };
};

export const authStudentLoginSuccess = payload => {
  return {
    type: AUTH_LOGIN_STUDENT_SUCCESS,
    payload: payload,
  };
};

export const authStudentLoginFailure = payload => {
  return {
    type: AUTH_LOGIN_STUDENT_FAILURE,
    payload: payload,
  };
};

export const studentLogin = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authStudentLogin());

  axios
    .post(`/student-login`, body)
    .then(res => {
      dispatch(authStudentLoginSuccess(res.data.data));

      sessionStorage.setItem("user-token", res.data.data.token);
      sessionStorage.setItem("user-role", res.data.data.user.role_name);
      sessionStorage.setItem("isSessionStarted", false);
      handleLoginSuccess && handleLoginSuccess(res.data.data.user);
    })
    .catch(error => {
      dispatch(
        authStudentLoginFailure({
          error:
            error?.response?.data?.message ||
            "Something went wrong.Please contact admin for support.",
        }),
      );
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Student Login Failed`,
        action:
          error?.response?.data?.message ||
          "Something went wrong.Please contact admin for support.",
        label: "Student login failed",
      });
    });
};
//LOGIN

export const authLogin = payload => {
  return {
    type: AUTH_LOGIN_TEACHER,
    payload: payload,
  };
};

export const authLoginSuccess = payload => {
  return {
    type: AUTH_LOGIN_TEACHER_SUCCESS,
    payload: payload,
  };
};

export const authLoginFailure = payload => {
  return {
    type: AUTH_LOGIN_TEACHER_FAILURE,
    payload: payload,
  };
};

export const teacherLogin = (
  body,
  handleLoginSuccess,
  handleLoginFailure,
) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/login`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_name);
      handleLoginSuccess && handleLoginSuccess();
    })
    .catch(error => {
      handleLoginFailure && handleLoginFailure();
      dispatch(
        authLoginFailure({
          error: error.response.data.message,
          statusCode: error.response.status,
        }),
      );
    });
};

export const teacherLoginWithGoogle = (
  body,
  handleLoginSuccess,
) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/sign-in-with-google`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_name);
      handleLoginSuccess && handleLoginSuccess();
    })
    .catch(error => {
      dispatch(authLoginFailure({ error: error.response.data.message }));
    });
};

export const teacherLoginClassLink = (
  body,
  handleLoginSuccess,
  handleFailed,
) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/class-link/login`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data));
      handleLoginSuccess && handleLoginSuccess(res.data.data);
    })
    .catch(error => {
      console.log("🚀 ~ file: auth.action.js:252 ~ error:", error);
      dispatch(authLoginFailure({ error: error.response.data.message }));
      handleFailed && handleFailed();
    });
};

// Clever login
export const teacherLoginClever = (
  body,
  handleLoginSuccess,
  handleFailed,
) => async dispatch => {
  dispatch(authLogin());

  axios
    .post(`/clever/login`, body)
    .then(res => {
      dispatch(authLoginSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_name);
      handleLoginSuccess && handleLoginSuccess();
    })
    .catch(error => {
      dispatch(authLoginFailure({ error: error.response.data.message }));
      handleFailed && handleFailed();
    });
};

//LOGOUT

export const authLogout = payload => {
  return {
    type: AUTH_USER_LOGOUT,
    payload: payload,
  };
};

export const authLogoutSuccess = payload => {
  return {
    type: AUTH_USER_LOGOUT_SUCCESS,
    payload: payload,
  };
};

export const authLogoutFailure = payload => {
  return {
    type: AUTH_USER_LOGOUT_FAILURE,
    payload: payload,
  };
};

export const logout = (handleLogoutSuccess, fromWhere) => async dispatch => {
  console.log("🚀 ~ file: auth.action.js:301 ~ logout ~ fromWhere:", fromWhere);
  dispatch(authLogout());
  axios.get(`/logout`).then(res => {
    if (!res.data.error) {
      dispatch(authLogoutSuccess());

      handleLogoutSuccess && handleLogoutSuccess();
    }
  });
};
//FETCH USER DETAILS

export const fetchUserDetails = payload => {
  return {
    type: FETCH_USER_DETAILS,
    payload: payload,
  };
};

export const fetchUserDetailsSuccess = payload => {
  return {
    type: FETCH_USER_DETAILS_SUCCESS,
    payload: payload,
  };
};

export const fetchUserDetailsFailure = payload => {
  return {
    type: FETCH_USER_DETAILS_FAILURE,
    payload: payload,
  };
};

export const getUserDetails = () => async dispatch => {
  dispatch(fetchUserDetails());
  axios
    .get(`/user-profile`)

    .then(res => {
      dispatch(fetchUserDetailsSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchUserDetailsFailure({ error: error?.response?.data?.message }),
      );
      gaErrorLogger(error, "getStrategies");
    });
};

//DELETE USER DETAILS

export const deleteUserDetails = payload => {
  return {
    type: DELETE_USER_DETAILS,
    payload: payload,
  };
};

export const deleteUserDetailsSuccess = payload => {
  return {
    type: DELETE_USER_DETAILS_SUCCESS,
    payload: payload,
  };
};

export const deleteUserDetailsFailure = payload => {
  return {
    type: DELETE_USER_DETAILS_FAILURE,
    payload: payload,
  };
};

export const removeUserDetails = handleRemoveAccountSuccess => async dispatch => {
  dispatch(deleteUserDetails());
  axios
    .delete(`/user-profile`)

    .then(res => {
      dispatch(deleteUserDetailsSuccess(res.data.data));
      handleRemoveAccountSuccess && handleRemoveAccountSuccess();
    })
    .catch(error => {
      dispatch(
        deleteUserDetailsFailure({ error: error.response.data.message }),
      );
    });
};
//FORGOT PASSWORD

export const authForgotPassword = payload => {
  return {
    type: AUTH_FORGOT_PASSWORD,
    payload: payload,
  };
};

export const authForgotPasswordSuccess = payload => {
  return {
    type: AUTH_FORGOT_PASSWORD_SUCCESS,
    payload: payload,
  };
};

export const authForgotPasswordPassword = payload => {
  return {
    type: AUTH_FORGOT_PASSWORD_FAILURE,
    payload: payload,
  };
};

export const forgotPassword = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authForgotPassword());

  axios
    .post(`/forgot-password`, body)
    .then(res => {
      dispatch(authForgotPasswordSuccess(res.data));
      handleLoginSuccess && handleLoginSuccess();
    })
    .catch(error => {
      dispatch(
        authForgotPasswordPassword({ error: error.response.data.message }),
      );
    });
};

//Reset Password

export const authResetPassword = payload => {
  return {
    type: AUTH_RESET_PASSWORD,
    payload: payload,
  };
};

export const authResetPasswordSuccess = payload => {
  return {
    type: AUTH_RESET_PASSWORD_SUCCESS,
    payload: payload,
  };
};

export const authResetPasswordPassword = payload => {
  return {
    type: AUTH_RESET_PASSWORD_FAILURE,
    payload: payload,
  };
};

export const resetPassword = (body, handleLoginSuccess) => async dispatch => {
  dispatch(authResetPassword());

  axios
    .post(`/reset-password`, body)
    .then(res => {
      dispatch(authResetPasswordSuccess());
      handleLoginSuccess && handleLoginSuccess();
    })
    .catch(error => {
      // dispatch(
      //   authResetPasswordPassword({
      //     error: error.response.data.errors.message,
      //   }),
      // );
    });
};

export const updateUserLevelIdSuccess = payload => {
  return {
    type: UPDATE_USER_LEVEL_ID,
    payload: payload,
  };
};

export const updateUserLevelId = (
  learningMode,
  handleSuccess,
) => async dispatch => {
  dispatch(updateUserLevelIdSuccess(learningMode));
  handleSuccess && handleSuccess();
};

export const updateUserDetails = payload => {
  return {
    type: UPDATE_USER_DETAILS,
    payload: payload,
  };
};

export const updateLevelLifterCount = payload => {
  return {
    type: UPDATE_USER_LEVEL_LIFTER_COUNT,
    payload: payload,
  };
};

export const handleUpdateCurrentSubmissionUserLevelId = payload => {
  return {
    type: UPDATE_CURRENT_SUBMISSION_USER_LEVEL_ID,
    payload: payload,
  };
};

//MAIL CONFIRMATION

export const authMailConfirm = payload => {
  return {
    type: AUTH_MAIL_CONFIRM,
    payload: payload,
  };
};
export const authMailConfirmSuccess = payload => {
  return {
    type: AUTH_MAIL_CONFIRM_SUCCESS,
    payload: payload,
  };
};
export const authMailConfirmFailure = payload => {
  return {
    type: AUTH_MAIL_CONFIRM_FAILURE,
    payload: payload,
  };
};
export const confirmMail = (
  tokenId,
  handleRedirectToDashboard,
) => async dispatch => {
  axios
    .get(`/email-verification?token=${tokenId}`)
    .then(res => {
      dispatch(authMailConfirmSuccess());
      // handleRedirectToDashboard && handleRedirectToDashboard()
    })
    .catch(error => {
      dispatch(
        authMailConfirmFailure({
          errorStatus: error.response.status,
          error: error.response.data.message,
        }),
      );
      if (error.response.status === 409) {
        handleRedirectToDashboard && handleRedirectToDashboard();
      }
    });
};

// RESEND VERIFICATION MAIL
export const authResendVerificationMail = payload => {
  return {
    type: AUTH_RESEND_VERIFICATION_MAIL,
    payload: payload,
  };
};
export const authResendVerificationMailSuccess = payload => {
  return {
    type: AUTH_RESEND_VERIFICATION_MAIL_SUCCESS,
    payload: payload,
  };
};
export const authResendVerificationMailFailure = payload => {
  return {
    type: AUTH_RESEND_VERIFICATION_MAIL_FAILURE,
    payload: payload,
  };
};
export const resendVerificationMail = (
  body,
  handleSuccess,
  handleEmailSendFailure,
) => async dispatch => {
  dispatch(authResendVerificationMail());

  axios
    .post(`/resend-verification-email`, body)
    .then(res => {
      dispatch(authResendVerificationMailSuccess());
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        authResendVerificationMailFailure({
          error: error.response.data.errors.message,
        }),
        handleEmailSendFailure &&
          handleEmailSendFailure(error.response.data.errors.message),
      );
    });
};

//Update teacher profile
export const updateTeacherProfile = payload => {
  return {
    type: UPDATE_TEACHER_PROFILE,
    payload: payload,
  };
};
export const updateTeacherProfileSuccess = payload => {
  return {
    type: UPDATE_TEACHER_PROFILE_SUCCESS,
    payload: payload,
  };
};
export const updateTeacherProfileFailure = payload => {
  return {
    type: UPDATE_TEACHER_PROFILE_FAILURE,
    payload: payload,
  };
};
export const updateTeacher = (body, handleSuccess) => async dispatch => {
  dispatch(updateTeacherProfile());
  return axios
    .put(`/user-profile`, body)
    .then(res => {
      dispatch(updateTeacherProfileSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        updateTeacherProfileFailure({
          error: error.response.data.errors.message,
        }),
      );
    });
};

// update teacher password
export const updateTeacherProfilePassword = payload => {
  return {
    type: UPDATE_TEACHER_PROFILE_PASSWORD,
    payload: payload,
  };
};
export const updateTeacherProfilePasswordSuccess = payload => {
  return {
    type: UPDATE_TEACHER_PROFILE_PASSWORD_SUCCESS,
    payload: payload,
  };
};
export const updateTeacherProfilePasswordFailure = payload => {
  return {
    type: UPDATE_TEACHER_PROFILE_PASSWORD_FAILURE,
    payload: payload,
  };
};
export const updateTeacherPassword = body => async dispatch => {
  dispatch(updateTeacherProfilePassword());
  return axios
    .put(`/update-password`, body)
    .then(res => {
      dispatch(updateTeacherProfilePasswordSuccess());
    })
    .catch(error => {
      dispatch(
        updateTeacherProfilePasswordFailure({
          error: error.response.data.errors.message,
        }),
      );
    });
};
