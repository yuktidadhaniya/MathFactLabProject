import {
  FETCH_ALL_CLASS_CODE_LIST,
  FETCH_ALL_CLASS_CODE_LIST_SUCCESS,
  FETCH_ALL_CLASS_CODE_LIST_FAILURE,
  ADD_SELECTED_CLASS_CODE,
  ADD_SELECTED_CLASS_CODE_SUCCESS,
  ADD_SELECTED_CLASS_CODE_FAILURE,
  ADD_CLASS_CODE,
  ADD_CLASS_CODE_SUCCESS,
  ADD_CLASS_CODE_FAILURE,
  DELETE_CLASS_CODE,
  DELETE_CLASS_CODE_SUCCESS,
  DELETE_CLASS_CODE_FAILURE,
  EDIT_CLASS_CODE,
  EDIT_CLASS_CODE_SUCCESS,
  EDIT_CLASS_CODE_FAILURE,
  HANDLE_CLASS_CODE_ERROR,
  FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM,
  FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM_SUCCESS,
  FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM_FAILURE,
  FETCH_CLASS_LINK_CLASSES,
  FETCH_CLASS_LINK_CLASSES_SUCCESS,
  FETCH_CLASS_LINK_CLASSES_FAILURE,
  ADD_SELECTED_CLASS_LINK_CLASS,
  ADD_SELECTED_CLASS_LINK_CLASS_SUCCESS,
  ADD_SELECTED_CLASS_LINK_CLASS_FAILURE,
  DELETE_TEACHER_CODE,
  DELETE_TEACHER_CODE_FAILURE,
  DELETE_TEACHER_CODE_SUCCESS,
} from "./actionType";
import axios from "config/axios";
import { message } from "antd";

//fetch class code list

export const fetchAllClassCodeList = payload => {
  return {
    type: FETCH_ALL_CLASS_CODE_LIST,
    payload: payload,
  };
};

export const fetchAllClassCodeListSuccess = payload => {
  return {
    type: FETCH_ALL_CLASS_CODE_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchAllClassCodeListFailure = payload => {
  return {
    type: FETCH_ALL_CLASS_CODE_LIST_FAILURE,
    payload: payload,
  };
};
export const getClassCodeList = () => async dispatch => {
  dispatch(fetchAllClassCodeList());

  axios
    .get(`/classes`)
    .then(res => {
      dispatch(fetchAllClassCodeListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchAllClassCodeListFailure({ error: error.response.data.message }),
      );
    });
};

export const fetchAllClassCodeListFromGoogleClassRoom = payload => {
  return {
    type: FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM,
    payload: payload,
  };
};

export const fetchAllClassCodeListFromGoogleClassRoomSuccess = payload => {
  return {
    type: FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM_SUCCESS,
    payload: payload,
  };
};

export const fetchAllClassCodeListFromGoogleClassRoomFailure = payload => {
  return {
    type: FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM_FAILURE,
    payload: payload,
  };
};
export const getClassCodeListFromGoogleClassRoom = (
  body,
  handleShowClassSelectDailog,
  handleCallBackSyncToGoogle,
) => async dispatch => {
  dispatch(fetchAllClassCodeListFromGoogleClassRoom());
  console.log("body", body);

  axios
    // .get(`/google-classroom/import-classes`)
    .post(`/google-classroom/sync`, body)

    .then(res => {
      if (!res.data.error) {
        dispatch(
          fetchAllClassCodeListFromGoogleClassRoomSuccess(res.data.data),
        );
        handleShowClassSelectDailog && handleShowClassSelectDailog();
      } else {
        handleCallBackSyncToGoogle &&
          handleCallBackSyncToGoogle(res.data.message);
      }
    })
    .catch(error => {
      dispatch(
        fetchAllClassCodeListFromGoogleClassRoomFailure({
          error: error.response.data.message,
        }),
      );
      handleCallBackSyncToGoogle &&
        handleCallBackSyncToGoogle(error.response.data.message);
    });
};

// Add New class code
export const createNewClassCode = payload => {
  return {
    type: ADD_CLASS_CODE,
    payload: payload,
  };
};

export const createNewClassCodeSuccess = payload => {
  return {
    type: ADD_CLASS_CODE_SUCCESS,
    payload: payload,
  };
};

export const createNewClassCodeFailure = payload => {
  return {
    type: ADD_CLASS_CODE_FAILURE,
    payload: payload,
  };
};

export const addNewClassCode = (body, handleSuccess) => async dispatch => {
  console.log("body: ", body);
  dispatch(createNewClassCode());

  axios
    .post(`/classes`, body)
    .then(res => {
      dispatch(createNewClassCodeSuccess(res.data.data));
      handleSuccess && handleSuccess(res.data.data);
      message.success("Class Added successfully.");
    })
    .catch(error => {
      dispatch(
        createNewClassCodeFailure({ error: error.response.data.message }),
      );
      message.error(error.response.data.message);
    });
};

// Edit class code
export const updateClassCode = payload => {
  return {
    type: EDIT_CLASS_CODE,
    payload: payload,
  };
};

export const updateClassCodeSuccess = payload => {
  return {
    type: EDIT_CLASS_CODE_SUCCESS,
    payload: payload,
  };
};

export const updateClassCodeFailure = payload => {
  return {
    type: EDIT_CLASS_CODE_FAILURE,
    payload: payload,
  };
};

export const editClassCode = (
  cls_id,
  body,
  handleSuccess,
) => async dispatch => {
  dispatch(updateClassCode());

  axios
    .put(`classes/${cls_id}`, body)
    .then(res => {
      dispatch(updateClassCodeSuccess(res.data.data));

      handleSuccess && handleSuccess();
      message.success("Class Added successfully.");
    })
    .catch(error => {
      dispatch(updateClassCodeFailure({ error: error.response.data.message }));
      message.error(error.response.data.message);
    });
};

// Delete class code

export const deleteClassCode = payload => {
  return {
    type: DELETE_CLASS_CODE,
    payload: payload,
  };
};

export const deleteClassCodeSuccess = payload => {
  return {
    type: DELETE_CLASS_CODE_SUCCESS,
    payload: payload,
  };
};

export const deleteClassCodeFailure = payload => {
  return {
    type: DELETE_CLASS_CODE_FAILURE,
    payload: payload,
  };
};

export const removeClassCode = (cls_id, handleSuccess) => async dispatch => {
  dispatch(deleteClassCode());

  axios
    .delete(`/classes/${cls_id}`)
    .then(res => {
      dispatch(deleteClassCodeSuccess(cls_id));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(deleteClassCodeFailure({ error: error.response.data.message }));
    });
};

export const handleClassCodeError = payload => {
  return {
    type: HANDLE_CLASS_CODE_ERROR,
    payload: payload,
  };
};

//Sync Selected class

export const addSelectedClassCodeSuccess = payload => {
  return {
    type: ADD_SELECTED_CLASS_CODE,
    payload: payload,
  };
};

export const addSelectedClassCodeSuccessSuccess = payload => {
  return {
    type: ADD_SELECTED_CLASS_CODE_SUCCESS,
    payload: payload,
  };
};

export const addSelectedClassCodeSuccessFailure = payload => {
  return {
    type: ADD_SELECTED_CLASS_CODE_FAILURE,
    payload: payload,
  };
};

export const syncSelectedClass = (
  selectedClass,
  handleSuccess,
) => async dispatch => {
  dispatch(addSelectedClassCodeSuccess());

  axios
    .get(`/google-classroom/import-classes?classIds=${selectedClass}`)
    .then(res => {
      dispatch(addSelectedClassCodeSuccessSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        addSelectedClassCodeSuccessFailure({
          error: error.response.data.message,
        }),
      );
    });
};

//Class link Sync Selected class

export const fetchClassLinkClassesSync = payload => {
  return {
    type: FETCH_CLASS_LINK_CLASSES,
    payload: payload,
  };
};

export const fetchClassLinkClassesSuccess = payload => {
  return {
    type: FETCH_CLASS_LINK_CLASSES_SUCCESS,
    payload: payload,
  };
};

export const fetchClassLinkClassesFailure = payload => {
  return {
    type: FETCH_CLASS_LINK_CLASSES_FAILURE,
    payload: payload,
  };
};

export const fetchClassLinkClasses = handleSuccess => async dispatch => {
  dispatch(fetchClassLinkClassesSync());

  axios
    .get(`/class-link/sync`)
    // .post(`/google-classroom/sync`)
    .then(res => {
      dispatch(fetchClassLinkClassesSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        fetchClassLinkClassesFailure({
          error: error.response.data.message,
        }),
      );
    });
};

//Class link Sync Selected classes
export const addSelectedClassLinkClass = payload => {
  return {
    type: ADD_SELECTED_CLASS_LINK_CLASS,
    payload: payload,
  };
};

export const addSelectedClassLinkClassSuccess = payload => {
  return {
    type: ADD_SELECTED_CLASS_LINK_CLASS_SUCCESS,
    payload: payload,
  };
};

export const addSelectedClassLinkClassFailure = payload => {
  return {
    type: ADD_SELECTED_CLASS_LINK_CLASS_FAILURE,
    payload: payload,
  };
};

export const syncSelectedClassLinkStudents = (
  selectedClass,
  handleSuccess,
) => async dispatch => {
  dispatch(addSelectedClassLinkClass());

  axios
    .get(`/class-link/import-classes?classIds=${selectedClass}`)
    .then(res => {
      dispatch(addSelectedClassLinkClassSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        addSelectedClassLinkClassFailure({
          error: error.response.data.message,
        }),
      );
    });
};

//delete teacher code
export const deleteTeacherCode = payload => {
  return {
    type: DELETE_TEACHER_CODE,
    payload: payload,
  };
};

export const deleteTeacherCodeSuccess = payload => {
  console.log("payload: ", payload);
  return {
    type: DELETE_CLASS_CODE_SUCCESS,
    payload: payload,
  };
};

export const deleteTeacherCodeFailure = payload => {
  return {
    type: DELETE_TEACHER_CODE_FAILURE,
    payload: payload,
  };
};

export const removeTeacherCode = handleSuccess => async dispatch => {
  console.log("dispatch: ", dispatch);
  dispatch(deleteTeacherCode());

  axios
    .delete(`https://dev.mathfactlab.com/api/v1/teachers/1`)
    .then(res => {
      console.log("res: ", res);
      dispatch(deleteTeacherCodeSuccess());
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        deleteTeacherCodeFailure({ error: error.response.data.message }),
      );
    });
};
