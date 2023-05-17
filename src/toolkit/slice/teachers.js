import { createSlice } from "@reduxjs/toolkit";
import axios from "config/axios";
// import { error } from "pdf-lib";
import { message } from "antd";
const initialState = {
  fetchTeachersLoading: false,
  teachers: [],
  fetchTeachersError: "",
  deleteTeacherLoading: false,
  deleteTeacherError: "",
  editTeacherLoading: false,
  editTeacherError: "",
};

export const teachersSlice = createSlice({
  name: "teachers",
  initialState,
  reducers: {
    fetchTeachers: state => {
      state.fetchTeachersLoading = true;
    },
    fetchTeachersSuccess: (state, action) => {
      state.fetchTeachersLoading = false;
      state.teachers = action.payload.data;
    },
    fetchTeachersFailure: (state, action) => {
      state.fetchTeachersLoading = false;
      state.fetchTeachersError = action.payload.error;
    },
    deleteTeacher: state => {
      state.deleteTeacherLoading = true;
    },
    deleteTeacherSuccess: (state, action) => {
      let updateTeacherList;
      updateTeacherList = state.teachers.filter(
        activeTeacherList => activeTeacherList.id !== action.payload,
      );
      state.teachers = updateTeacherList;
    },
    deleteTeachersFailure: (state, action) => {
      state.deleteTeacherLoading = false;
      state.deleteTeacherError = action.payload.error;
    },
    editTeacher: state => {
      state.editTeacherLoading = true;
    },
    editTeacherSuccess: (state, action) => {
      console.log("action: ", action);
      console.log("state: ", state);
      const updateTeacherList = state.teachers.map(activeTeacherList => {
        if (activeTeacherList.id === action.payload.id) {
          return action.payload;
        }
        return activeTeacherList;
      });
      state.teachers = updateTeacherList;
    },
    editTeacherFailure: (state, action) => {
      state.editTeacherLoading = false;
      state.editTeacherError = action.payload.error;
    },

    addTeacher: () => {},
    addTeacherSuccess: () => {},
    addTeacherFailure: () => {},
  },
});

export const getTeachers = () => async dispatch => {
  dispatch(fetchTeachers());
  axios
    .get(`/users/teachers?role_id=2`)
    .then(res => {
      console.log("res", res);
      dispatch(fetchTeachersSuccess(res.data));
    })
    .catch(error => {
      dispatch(fetchTeachersFailure({ error: error.response.data.message }));
    });
};
export const deleteTeachers = user_id => async dispatch => {
  console.log("user_id: ", user_id);

  dispatch(deleteTeacher());
  axios
    .delete(`/remove/teachers/${user_id}`)
    .then(res => {
      console.log("res", res);
      dispatch(deleteTeacherSuccess(user_id));
      message.success("Teacher Deleted successfully.");
    })
    .catch(error => {
      alert("Error!");
      dispatch(deleteTeachersFailure({ error: error.response.data.message }));
    });
};
export const editTeachers = (
  user_id,
  body,
  handleSuccess,
) => async dispatch => {
  console.log("body1: ", body);
  console.log("user_id", user_id);
  dispatch(editTeacher());

  axios
    .put(`/update/teachers/${user_id}`, body)
    .then(res => {
      console.log("res: ", res);
      dispatch(editTeacherSuccess(res.data.data));

      handleSuccess && handleSuccess();
      message.success("Class Added successfully.");
    })
    .catch(error => {
      dispatch(editTeacherFailure({ error: error.response.data.message }));
      message.error(error.response.data.message);
    });
};
export const TeacherAdd = () => {};

export const {
  fetchTeachers,
  fetchTeachersSuccess,
  fetchTeachersFailure,
  deleteTeacher,
  deleteTeacherSuccess,
  deleteTeachersFailure,
  editTeacher,
  editTeacherSuccess,
  editTeacherFailure,
  addTeacher,
  addTeacherSuccess,
  addTeacherFailure,
} = teachersSlice.actions;

export default teachersSlice.reducer;
