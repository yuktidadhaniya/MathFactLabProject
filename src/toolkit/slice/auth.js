import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";

const initialState = {
  fetchingUserDetailsLoading: false,
  userDetails: {},
  loginError: "",
  userPermissions: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authSignIn: state => {
      state.fetchingUserDetailsLoading = true;
    },
    authSignInSuccess: (state, action) => {
      state.fetchingUserDetailsLoading = false;
      state.userDetails = action.payload.data.user;
      state.userPermissions = ["super_admin"];
    },
    authSignInFailure: (state, action) => {
      state.fetchingUserDetailsLoading = false;
      state.userDetails = {};
      state.loginError = action.payload.error;
    },
    authSignOut: (state, action) => {
      state.fetchingUserDetailsLoading = false;
      state.userDetails = {};
      state.userPermissions = [];
    },
  },
});

export const adminSignIn = body => async dispatch => {
  dispatch(authSignIn());
  return axios
    .post(`/login`, body)
    .then(res => {
      dispatch(authSignInSuccess(res.data));
      localStorage.setItem("user-token", res.data.data.token);
      localStorage.setItem("user-role", res.data.data.user.role_name);
    })
    .catch(error => {
      dispatch(authSignInFailure({ error: error.response.data.message }));
    });
};

export const getUserDetails = () => async dispatch => {
  dispatch(authSignIn());
  axios
    .get(`/user-profile`)
    .then(res => {
      dispatch(authSignInSuccess({ data: { user: res.data.data } }));
    })
    .catch(error => {
      dispatch(authSignInFailure({ error: error.response.data.message }));
    });
};

export const logout = callback => async dispatch => {
  dispatch(authSignOut());
  callback();
};

export const {
  authSignIn,
  authSignInSuccess,
  authSignInFailure,
  authSignOut,
} = authSlice.actions;

export default authSlice.reducer;
