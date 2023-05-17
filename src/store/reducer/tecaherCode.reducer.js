// import {
//   DELETE_TEACHER_CODE,
//   DELETE_TEACHER_CODE_FAILURE,
//   DELETE_TEACHER_CODE_SUCCESS,
// } from "./actionType";

// let initialState = {
//   teacherCodeList: [],
// };

// const teacherReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case DELETE_TEACHER_CODE:
//       return {
//         deleteTeacherCodeLoading: true,
//         deleteTeacherCodeError: "",
//       };
//     case DELETE_TEACHER_CODE_SUCCESS: {
//       let updatedTeacherList;
//       updatedTeacherList = state.teacherCodeList.filter(
//         activeTeacherList => activeTeacherList.id !== action.payload,
//       );

//       return {
//         ...state,
//         deleteClassCodeLoading: false,
//         TeacherList: updatedTeacherList,
//       };
//     }
//     case DELETE_TEACHER_CODE_FAILURE:
//       return {
//         ...state,
//         deleteTeacherCodeLoading: false,
//         deleteTeacherCodeError: action.payload.error,
//       };
//   }
// };
// export default teacherReducer;
