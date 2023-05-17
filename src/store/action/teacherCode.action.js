// import {
//   DELETE_TEACHER_CODE,
//   DELETE_TEACHER_CODE_FAILURE,
//   DELETE_TEACHER_CODE_SUCCESS,
//   EDIT_TEACHER_CODE,
//   EDIT_TEACHER_CODE_SUCCESS,
//   EDIT_TEACHER_CODE_FAILURE,
// } from "./actionType";
// import axios from "axios";

// export const deleteTeacherCode = payload => {
//   return {
//     type: DELETE_TEACHER_CODE,
//     payload: payload,
//   };
// };

// export const deleteTeacherCodeSuccess = payload => {
//   console.log("payload: ", payload);
//   return {
//     type: DELETE_TEACHER_CODE_SUCCESS,
//     payload: payload,
//   };
// };

// export const deleteTeacherCodeFailure = payload => {
//   return {
//     type: DELETE_TEACHER_CODE_FAILURE,
//     payload: payload,
//   };
// };

// export const removeTeacherCode = handleSuccess => async dispatch => {
//   console.log("dispatch: ", dispatch);
//   dispatch(deleteTeacherCode());

//   axios
//     .delete(`https://dev.mathfactlab.com/api/v1/teachers/1`)
//     .then(res => {
//       console.log("res: ", res);
//       dispatch(deleteTeacherCodeSuccess());
//       handleSuccess && handleSuccess();
//     })
//     .catch(error => {
//       dispatch(
//         deleteTeacherCodeFailure({ error: error.response.data.message }),
//       );
//     });
// };

// export const editTeacherCode = payload => {
//   return {
//     type: EDIT_TEACHER_CODE,
//     payload: payload,
//   };
// };
// export const editTeacherCodeSuccess = payload => {
//   console.log("payload: ", payload);
//   return {
//     type: EDIT_TEACHER_CODE_SUCCESS,
//     payload: payload,
//   };
// };

// export const editTeacherCodeFailure = payload => {
//   return {
//     type: EDIT_TEACHER_CODE_FAILURE,
//     payload: payload,
//   };
// };

// export const editTeacher = () => {

// };
