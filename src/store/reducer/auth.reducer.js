import {
  AUTH_LOGIN_STUDENT,
  AUTH_LOGIN_STUDENT_SUCCESS,
  AUTH_LOGIN_STUDENT_FAILURE,
  AUTH_LOGIN_TEACHER,
  AUTH_LOGIN_TEACHER_SUCCESS,
  AUTH_LOGIN_TEACHER_FAILURE,
  AUTH_USER_LOGOUT,
  AUTH_USER_LOGOUT_SUCCESS,
  AUTH_USER_LOGOUT_FAILURE,
  FETCH_USER_DETAILS,
  FETCH_USER_DETAILS_SUCCESS,
  FETCH_USER_DETAILS_FAILURE,
  DELETE_USER_DETAILS,
  DELETE_USER_DETAILS_SUCCESS,
  DELETE_USER_DETAILS_FAILURE,
  AUTH_FORGOT_PASSWORD,
  AUTH_FORGOT_PASSWORD_SUCCESS,
  AUTH_FORGOT_PASSWORD_FAILURE,
  AUTH_RESET_PASSWORD,
  AUTH_RESET_PASSWORD_SUCCESS,
  AUTH_RESET_PASSWORD_FAILURE,
  AUTH_TEACHER_SIGN_UP,
  AUTH_TEACHER_SIGN_UP_SUCCESS,
  AUTH_TEACHER_SIGN_UP_FAILURE,
  UPDATE_USER_LEVEL_ID,
  UPDATE_USER_DETAILS,
  UPDATE_USER_LEVEL_LIFTER_COUNT,
  UPDATE_CURRENT_SUBMISSION_USER_LEVEL_ID,
  AUTH_MAIL_CONFIRM,
  AUTH_MAIL_CONFIRM_SUCCESS,
  AUTH_MAIL_CONFIRM_FAILURE,
  AUTH_RESEND_VERIFICATION_MAIL,
  AUTH_RESEND_VERIFICATION_MAIL_SUCCESS,
  AUTH_RESEND_VERIFICATION_MAIL_FAILURE,
  UPDATE_TEACHER_PROFILE,
  UPDATE_TEACHER_PROFILE_SUCCESS,
  UPDATE_TEACHER_PROFILE_FAILURE,
  UPDATE_TEACHER_PROFILE_PASSWORD,
  UPDATE_TEACHER_PROFILE_PASSWORD_SUCCESS,
  UPDATE_TEACHER_PROFILE_PASSWORD_FAILURE,
} from "../action/actionType";

let initialState = {
  fetchingUserDetailsLoading: false,
  signupLoading: false,
  signupError: "",

  userDetails: {},
  updateUserProfileLoading: false,
  deleteUserDetailsLoading: false,
  userPermissions: [],

  loginLoading: false,
  loginError: "",

  studentLoginLoading: false,
  studentLoginError: "",

  forgotPasswordError: "",
  forgotPasswordLoading: false,

  emailVerificationLoading: false,
  emailVerificationError: "",

  changePasswordError: "",
  changePasswordLoading: false,

  resetPasswordError: "",
  resetPasswordLoading: false,

  resendVerificationEmailLoading: false,
  resendVerificationEmailError: "",
};
const authenticationPermission = {
  admin: ["admin"],
  teacher: ["teacher"],
  student: ["student"],
  parent: ["parent"],
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TEACHER_SIGN_UP:
      return {
        ...state,
        teacherSignupLoading: true,
        teacherSignupError: "",
      };
    case AUTH_TEACHER_SIGN_UP_SUCCESS:
      return {
        ...state,
        teacherSignupLoading: false,
        teacherSignupSuccessMessage: action.payload.message,
        // userDetails: action.payload.user,
        // userPermissions:
        // authenticationPermission[action.payload.user.role_name],
      };
    case AUTH_TEACHER_SIGN_UP_FAILURE:
      return {
        ...state,
        teacherSignupLoading: false,
        teacherSignupError: action.payload.error,
      };

    case AUTH_LOGIN_STUDENT:
      return {
        ...state,
        studentLoginLoading: true,
        studentLoginError: "",
      };
    case AUTH_LOGIN_STUDENT_SUCCESS:
      return {
        ...state,
        studentLoginLoading: false,
        userDetails: action.payload.user,
        userPermissions:
          authenticationPermission[action.payload.user.role_name],
      };
    case AUTH_LOGIN_STUDENT_FAILURE:
      return {
        ...state,
        studentLoginLoading: false,
        studentLoginError: action.payload.error,
      };

    case AUTH_LOGIN_TEACHER:
      return {
        ...state,
        loginLoading: true,
        loginError: "",
        errorType: "",
      };
    case AUTH_LOGIN_TEACHER_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        userDetails: action.payload.data.user,
        userPermissions:
          authenticationPermission[action.payload.data.user.role_name],
      };
    case AUTH_LOGIN_TEACHER_FAILURE:
      return {
        ...state,
        loginLoading: false,
        loginError: action.payload.error,
        errorType: action.payload.error_type,
      };

    case AUTH_USER_LOGOUT:
      return {
        ...state,
        logoutLoading: true,
      };
    case AUTH_USER_LOGOUT_SUCCESS:
      return {
        ...state,
        userDetails: {},
      };
    case AUTH_USER_LOGOUT_FAILURE:
      return {
        ...state,
        logoutLoading: false,
        logoutLoadingError: action.payload.error,
      };
    case FETCH_USER_DETAILS:
      return {
        ...state,
        fetchingUserDetailsLoading: true,

        updateUserProfileError: "",
      };
    case FETCH_USER_DETAILS_SUCCESS:
      return {
        ...state,
        fetchingUserDetailsLoading: false,
        userDetails: action.payload,
        userPermissions: authenticationPermission[action.payload.role_name],
      };
    case FETCH_USER_DETAILS_FAILURE:
      return {
        ...state,
        fetchingUserDetailsLoading: false,
        fetchingUserDetailsError: action.payload.error,
      };

    case DELETE_USER_DETAILS:
      return {
        ...state,
        deleteUserDetailsLoading: true,

        deleteUserProfileError: "",
      };
    case DELETE_USER_DETAILS_SUCCESS:
      return {
        ...state,
        userDetails: {},
        userPermissions: [],
        deleteUserDetailsLoading: false,
      };
    case DELETE_USER_DETAILS_FAILURE:
      return {
        ...state,
        deleteUserDetailsLoading: false,
        deleteUserProfileError: action.payload.error,
      };
    case AUTH_FORGOT_PASSWORD:
      return {
        ...state,
        forgotPasswordLoading: true,

        forgotPasswordError: "",
      };
    case AUTH_FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        forgotPasswordLoading: false,
      };
    case AUTH_FORGOT_PASSWORD_FAILURE:
      return {
        ...state,
        forgotPasswordLoading: false,
        forgotPasswordError: action.payload.error,
      };

    case AUTH_RESET_PASSWORD:
      return {
        ...state,
        resetPasswordLoading: true,

        resetPasswordError: "",
      };
    case AUTH_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        resetPasswordLoading: false,
      };
    case AUTH_RESET_PASSWORD_FAILURE:
      return {
        ...state,
        resetPasswordLoading: false,
        resetPasswordError: action.payload.error,
      };
    case UPDATE_USER_LEVEL_ID:
      // #lastlevel

      // static passed 0 as level lifter lock for any level lifter submission
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            add_sub_level_id:
              action.payload.student_learning_mode_id === 1
                ? +state.userDetails.profile.add_sub_level_id === 17
                  ? +state.userDetails.profile.add_sub_level_id + 9
                  : +state.userDetails.profile.add_sub_level_id + 1 + ""
                : state.userDetails.profile.add_sub_level_id,
            mul_div_level_id:
              action.payload.student_learning_mode_id === 2
                ? +state.userDetails.profile.mul_div_level_id + 1 + ""
                : state.userDetails.profile.mul_div_level_id,
            is_level_lifter_lock: 0,
          },
        },
      };
    case UPDATE_USER_DETAILS:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,

            is_level_lifter_lock: 0,
          },
        },
      };
    case UPDATE_USER_LEVEL_LIFTER_COUNT:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            is_add_sub_level_lifter:
              action.payload.student_learning_mode_id === 1
                ? +state.userDetails.profile.is_add_sub_level_lifter + 1
                : state.userDetails.profile.is_add_sub_level_lifter,

            is_mul_div_level_lifter:
              action.payload.student_learning_mode_id === 2
                ? +state.userDetails.profile.is_mul_div_level_lifter + 1
                : state.userDetails.profile.is_mul_div_level_lifter,
          },
        },
      };
    case UPDATE_CURRENT_SUBMISSION_USER_LEVEL_ID:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          profile: {
            ...state.userDetails.profile,
            ...action.payload,
          },
        },
      };

    case AUTH_MAIL_CONFIRM:
      return {
        ...state,
        emailVerificationLoading: true,
      };
    case AUTH_MAIL_CONFIRM_SUCCESS:
      return {
        ...state,
        emailVerificationLoading: false,
      };
    case AUTH_MAIL_CONFIRM_FAILURE:
      return {
        ...state,
        emailVerificationLoading: false,
        emailVerificationErrorCode: action.payload.errorStatus,
        emailVerificationError: action.payload.error,
      };

    case AUTH_RESEND_VERIFICATION_MAIL:
      return {
        ...state,
        resendVerificationEmailLoading: true,
        resendVerificationEmailError: "",
      };
    case AUTH_RESEND_VERIFICATION_MAIL_SUCCESS:
      return {
        ...state,
        resendVerificationEmailLoading: false,
      };
    case AUTH_RESEND_VERIFICATION_MAIL_FAILURE:
      return {
        ...state,
        resendVerificationEmailLoading: false,

        resendVerificationEmailError: action.payload.error,
      };
    case UPDATE_TEACHER_PROFILE:
      return {
        ...state,
        updateUserProfileLoading: true,
        updateUserProfileError: "",
      };
    case UPDATE_TEACHER_PROFILE_SUCCESS:
      return {
        ...state,
        updateUserProfileLoading: false,
        userDetails: Object.assign(state.userDetails, action.payload),
      };
    case UPDATE_TEACHER_PROFILE_FAILURE:
      return {
        ...state,
        updateUserProfileLoading: false,

        updateUserProfileError: action.payload.error,
      };

    case UPDATE_TEACHER_PROFILE_PASSWORD:
      return {
        ...state,
        changePasswordLoading: true,
        changePasswordError: "",
      };
    case UPDATE_TEACHER_PROFILE_PASSWORD_SUCCESS:
      return {
        ...state,
        changePasswordLoading: false,
      };
    case UPDATE_TEACHER_PROFILE_PASSWORD_FAILURE:
      return {
        ...state,
        changePasswordLoading: false,
        changePasswordError: action.payload.error,
      };

    default:
      return state;
  }
};

export default authReducer;
