import {
  FETCH_ALL_USER_LIST,
  FETCH_ALL_USER_LIST_SUCCESS,
  FETCH_ALL_USER_LIST_FAILURE,
  ADD_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAILURE,
  ADD_USERS,
  ADD_USERS_SUCCESS,
  ADD_USERS_FAILURE,
  FETCH_ALL_USER_WITH_CLASS_LIST,
  FETCH_ALL_USER_WITH_CLASS_LIST_SUCCESS,
  FETCH_ALL_USER_WITH_CLASS_LIST_FAILURE,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_MULTIPLE_USER,
  DELETE_MULTIPLE_USER_SUCCESS,
  DELETE_MULTIPLE_USER_FAILURE,
  EDIT_USER,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAILURE,
  EDIT_MULTIPLE_USER,
  EDIT_MULTIPLE_USER_SUCCESS,
  EDIT_MULTIPLE_USER_FAILURE,
  HANDLE_USER_ERROR,
  FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM,
  FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM_SUCCESS,
  FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM_FAILURE,
  FETCH_STUDENT_INDIVIDUAL_REPORT,
  FETCH_STUDENT_INDIVIDUAL_REPORT_SUCCESS,
  FETCH_STUDENT_INDIVIDUAL_REPORT_FAILURE,
  FETCH_STUDENTS_GROUP_REPORT,
  FETCH_STUDENTS_GROUP_REPORT_SUCCESS,
  FETCH_STUDENTS_GROUP_REPORT_FAILURE,
  FETCH_GROWTH_GAUGE_REPORT,
  FETCH_GROWTH_GAUGE_REPORT_SUCCESS,
  FETCH_GROWTH_GAUGE_REPORT_FAILURE,
} from "./actionType";
import axios from "config/axios";
import { message } from "antd";

//fetch student list

export const fetchAllUserList = payload => {
  return {
    type: FETCH_ALL_USER_LIST,
    payload: payload,
  };
};

export const fetchAllUserListSuccess = payload => {
  return {
    type: FETCH_ALL_USER_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchAllUserListFailure = payload => {
  return {
    type: FETCH_ALL_USER_LIST_FAILURE,
    payload: payload,
  };
};
export const getUsersList = (
  role_id,
  add_sub_start_date,
  mul_div_start_date,
  page,
  limit,
) => async dispatch => {
  dispatch(fetchAllUserList());

  axios
    // .get(`/users?class_code=${teacher_class_code}&role_id=${role_id}`)
    .get(
      `/teacher?role_id=${role_id}${
        add_sub_start_date ? `&add_sub_start_date=${add_sub_start_date}` : ""
      }${
        mul_div_start_date ? `&mul_div_start_date=${mul_div_start_date}` : ""
      }`,
    )
    // pagination API
    // .get(
    //   `/teacher?role_id=${role_id}${
    //     add_sub_start_date ? `&add_sub_start_date=${add_sub_start_date}` : ""
    //   }${
    //     mul_div_start_date ? `&mul_div_start_date=${mul_div_start_date}` : ""
    //   }${page ? `&page=${page}` : ""}${limit ? `&limit=${limit}` : ""}`,
    // )

    .then(res => {
      dispatch(fetchAllUserListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(fetchAllUserListFailure({ error: error.response.data.message }));
    });
};

//fetch from google class room

export const fetchAllUserListFromGoogleClassRoom = payload => {
  return {
    type: FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM,
    payload: payload,
  };
};

export const fetchAllUserListFromGoogleClassRoomSuccess = payload => {
  return {
    type: FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM_SUCCESS,
    payload: payload,
  };
};

export const fetchAllUserListFromGoogleClassRoomFailure = payload => {
  return {
    type: FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM_FAILURE,
    payload: payload,
  };
};
export const getUsersListFromGoogleClassRoom = classId => async dispatch => {
  dispatch(fetchAllUserListFromGoogleClassRoom());

  axios
    .get(`/google-classroom/import-students?classId=${classId}`)
    .then(res => {
      dispatch(fetchAllUserListFromGoogleClassRoomSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchAllUserListFromGoogleClassRoomFailure({
          error: error.response.data.message,
        }),
      );
    });
};

// Add New Student
export const createNewUser = payload => {
  return {
    type: ADD_USER,
    payload: payload,
  };
};

export const createNewUserSuccess = payload => {
  return {
    type: ADD_USER_SUCCESS,
    payload: payload,
  };
};

export const createNewUserFailure = payload => {
  return {
    type: ADD_USER_FAILURE,
    payload: payload,
  };
};

export const addNewUser = (body, handleSuccess) => async dispatch => {
  dispatch(createNewUser());
  let isEdit = false;
  axios
    .post(`/users`, body)
    .then(res => {
      dispatch(createNewUserSuccess(res.data.data));
      handleSuccess && handleSuccess(isEdit);
    })
    .catch(error => {
      dispatch(createNewUserFailure({ error: error.response.data.message }));
      message.error(error.response.data.message || "Something went wrong!");
    });
};

// Edit Student
export const updateUser = payload => {
  return {
    type: EDIT_USER,
    payload: payload,
  };
};

export const updateUserSuccess = payload => {
  return {
    type: EDIT_USER_SUCCESS,
    payload: payload,
  };
};

export const updateUserFailure = payload => {
  return {
    type: EDIT_USER_FAILURE,
    payload: payload,
  };
};

export const editUser = (stdId, body, handleSuccess) => async dispatch => {
  dispatch(updateUser());
  let isEdit = true;
  axios
    .put(`/user/${stdId}`, body)
    .then(res => {
      dispatch(updateUserSuccess(res.data.data));

      handleSuccess && handleSuccess(isEdit, res.data.data.first_name);
      message.success("Student has been updated successfully.");
    })
    .catch(error => {
      dispatch(updateUserFailure({ error: error.response.data.message }));
      message.error(error.response.data.message || "Something went wrong!");
    });
};

export const updateMultipleUser = payload => {
  return {
    type: EDIT_MULTIPLE_USER,
    payload: payload,
  };
};

export const updateMultipleUserSuccess = (data, usersID) => {
  const payload = { data, usersID };
  return {
    type: EDIT_MULTIPLE_USER_SUCCESS,
    payload: payload,
  };
};

export const updateMultipleUserFailure = payload => {
  return {
    type: EDIT_MULTIPLE_USER_FAILURE,
    payload: payload,
  };
};

export const editMultipleUser = (
  usersID,
  body,
  handleSuccess,
) => async dispatch => {
  dispatch(updateMultipleUser());
  let isEdit = true;

  axios
    .put(`/users/${usersID}`, body)
    .then(res => {
      dispatch(updateMultipleUserSuccess(res.data.data, usersID));

      handleSuccess && handleSuccess(isEdit, res.data.data.first_name);
      message.success("Students has been updated successfully.");
    })
    .catch(error => {
      dispatch(
        updateMultipleUserFailure({ error: error.response.data.message }),
      );
      message.error("Something went wrong!");
    });
};

// Delete Student

export const deleteUser = payload => {
  return {
    type: DELETE_USER,
    payload: payload,
  };
};

export const deleteUserSuccess = payload => {
  return {
    type: DELETE_USER_SUCCESS,
    payload: payload,
  };
};

export const deleteUserFailure = payload => {
  return {
    type: DELETE_USER_FAILURE,
    payload: payload,
  };
};

export const removeUser = (user, handleSuccess) => async dispatch => {
  dispatch(deleteUser());

  axios
    .delete(`/users/${user.id}`)
    .then(res => {
      dispatch(deleteUserSuccess(user));

      handleSuccess && handleSuccess();
      message.success("Student has been deleted successfully.");
    })
    .catch(error => {
      dispatch(deleteUserFailure({ error: error.response.data.message }));
      message.error("Something went wrong!");
    });
};

export const deleteMultipleUser = payload => {
  return {
    type: DELETE_MULTIPLE_USER,
    payload: payload,
  };
};

export const deleteMultipleUserSuccess = payload => {
  return {
    type: DELETE_MULTIPLE_USER_SUCCESS,
    payload: payload,
  };
};

export const deleteMultipleUserFailure = payload => {
  return {
    type: DELETE_MULTIPLE_USER_FAILURE,
    payload: payload,
  };
};

export const removeMultipleUser = (ids, handleSuccess) => async dispatch => {
  dispatch(deleteMultipleUser());
  axios
    .delete(`/users/${ids.join(",")}`)
    .then(res => {
      dispatch(deleteMultipleUserSuccess(ids));
      handleSuccess && handleSuccess();
      message.success("Students has been deleted successfully.");
    })
    .catch(error => {
      dispatch(
        deleteMultipleUserFailure({ error: error.response.data.message }),
      );
      message.error("Something went wrong!");
    });
};

export const handleUserError = payload => {
  return {
    type: HANDLE_USER_ERROR,
    payload: payload,
  };
};

// Add New Student
export const createNewUsers = payload => {
  return {
    type: ADD_USERS,
    payload: payload,
  };
};

export const createNewUsersSuccess = payload => {
  return {
    type: ADD_USERS_SUCCESS,
    payload: payload,
  };
};

export const createNewUsersFailure = payload => {
  return {
    type: ADD_USERS_FAILURE,
    payload: payload,
  };
};

export const addNewUsers = (
  body,
  handleCreateNewUsersSuccess,
) => async dispatch => {
  dispatch(createNewUsers());
  axios
    .post(`/users/students`, body)
    .then(res => {
      dispatch(createNewUsersSuccess(res.data.data));
      handleCreateNewUsersSuccess && handleCreateNewUsersSuccess();
      message.success("Students has been added successfully.");
    })
    .catch(error => {
      dispatch(createNewUsersFailure({ error: error.response.message }));
      message.error("Something went wrong!");
    });
};

//fetch student list

export const fetchAllUserWithClassesList = payload => {
  return {
    type: FETCH_ALL_USER_WITH_CLASS_LIST,
    payload: payload,
  };
};

export const fetchAllUserWithClassesListSuccess = payload => {
  return {
    type: FETCH_ALL_USER_WITH_CLASS_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchAllUserWithClassesListFailure = payload => {
  return {
    type: FETCH_ALL_USER_WITH_CLASS_LIST_FAILURE,
    payload: payload,
  };
};
export const getUsersWithClassesList = class_code => async dispatch => {
  dispatch(fetchAllUserWithClassesList());

  axios
    .get(`/users?class_code=${class_code}&role_id=${3}`)

    .then(res => {
      dispatch(fetchAllUserWithClassesListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchAllUserWithClassesListFailure({
          error: error.response.data.message,
        }),
      );
    });
};

//fetch student list

export const fetchStudentIndividualReport = payload => {
  return {
    type: FETCH_STUDENT_INDIVIDUAL_REPORT,
    payload: payload,
  };
};

export const fetchStudentIndividualReportSuccess = payload => {
  return {
    type: FETCH_STUDENT_INDIVIDUAL_REPORT_SUCCESS,
    payload: payload,
  };
};

export const fetchStudentIndividualReportFailure = payload => {
  return {
    type: FETCH_STUDENT_INDIVIDUAL_REPORT_FAILURE,
    payload: payload,
  };
};
export const getStudentIndividualReport = (
  user_id,
  from_date,
  to_date,
) => async dispatch => {
  dispatch(fetchStudentIndividualReport());

  axios
    // .get(`/users?class_code=${teacher_class_code}&role_id=${role_id}`)
    .get(
      `/student/individual-report?user_id=${user_id}${
        from_date ? `&from_date=${from_date}` : ""
      }${to_date ? `&to_date=${to_date}` : ""}`,
    )

    .then(res => {
      dispatch(fetchStudentIndividualReportSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchStudentIndividualReportFailure({
          error: error.response.data.message,
        }),
      );
    });
};

export const fetchStudentsGroupReport = payload => {
  return {
    type: FETCH_STUDENTS_GROUP_REPORT,
    payload: payload,
  };
};

export const fetchStudentsGroupReportSuccess = payload => {
  return {
    type: FETCH_STUDENTS_GROUP_REPORT_SUCCESS,
    payload: payload,
  };
};

export const fetchStudentsGroupReportFailure = payload => {
  return {
    type: FETCH_STUDENTS_GROUP_REPORT_FAILURE,
    payload: payload,
  };
};
export const getStudentsGroupReport = (
  user_ids,
  from_date,
  to_date,
) => async dispatch => {
  dispatch(fetchStudentsGroupReport());

  axios
    // .get(`/users?class_code=${teacher_class_code}&role_id=${role_id}`)
    .get(
      `/students/group-report?user_ids=${user_ids}${
        from_date ? `&from_date=${from_date}` : ""
      }${to_date ? `&to_date=${to_date}` : ""}`,
    )

    .then(res => {
      dispatch(fetchStudentsGroupReportSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchStudentsGroupReportFailure({
          error: error.response.data.message,
        }),
      );
    });
};

export const fetchGrowthGaugeReport = payload => {
  return {
    type: FETCH_GROWTH_GAUGE_REPORT,
    payload: payload,
  };
};

export const fetchGrowthGaugeReportSuccess = payload => {
  return {
    type: FETCH_GROWTH_GAUGE_REPORT_SUCCESS,
    payload: payload,
  };
};

export const fetchGrowthGaugeReportFailure = payload => {
  return {
    type: FETCH_GROWTH_GAUGE_REPORT_FAILURE,
    payload: payload,
  };
};
export const getGrowthGaugeReport = (
  learning_mode_id,
  after_date,
  before_date,
  class_code,
) => async dispatch => {
  dispatch(fetchGrowthGaugeReport());

  axios
    .get(
      `/class/growth-report/?learning_mode_id=${learning_mode_id}${
        after_date ? `&after_date=${after_date}` : ""
      }${before_date ? `&before_date=${before_date}` : ""}${
        class_code ? `&class_code=${class_code}` : ""
      }`,
    )

    .then(res => {
      dispatch(fetchGrowthGaugeReportSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchGrowthGaugeReportFailure({
          error: error.response.data.message,
        }),
      );
    });
};
