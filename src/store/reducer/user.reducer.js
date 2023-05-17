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
} from "../action/actionType";

let initialState = {
  userDetails: {},
  updateUserProfileLoading: false,

  fetchingUserDetailsLoading: false,
  fetchingUserDetailsError: "",

  userCreateExtraFieldLoading: false,
  userCreateExtraFieldError: "",
  userPermissions: [],
  fetchingTeachersListLoading: false,
  teachersList: [],
  studentList: [],
  allUserList: [],
  fetchingAllUserListLoading: false,
  fetchingAllUserListError: "",

  addNewStudentLoading: false,
  addNewUserError: "",

  addNewStudentsLoading: false,
  addNewUsersError: "",
  studentListWithClass: [],
  fetchingAllWithClassLoading: false,
  fetchingAllWithUserListClassError: "",

  editUserDetailsLoading: false,
  editUserDetailsError: "",

  deleteUserLoading: false,

  fetchingAllUserListFromGoogleClassRoomLoading: false,
  fetchingAllUserListFromGoogleClassRoomError: "",

  addSubUpdatedDate: "",
  mulDivUpdatedDate: "",
  totalStudents: 0,
  studentIndividual: [],
  fetchingStudentIndividualLoading: false,
  fetchingStudentIndividualError: "",
  studentsGroupReport: [],
  fetchingStudentsGroupReportLoading: false,
  fetchingStudentsGroupReportError: "",

  growthGaugeReport: [],
  fetchingGrowthGaugeReportLoading: false,
  fetchingGrowthGaugeReportError: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_USER_LIST:
      return {
        ...state,
        fetchingAllUserListLoading: true,
        fetchingAllUserListError: "",
      };
    case FETCH_ALL_USER_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllUserListLoading: false,
        studentList: action.payload.users,
        totalStudents: action.payload.total_students,
      };
    case FETCH_ALL_USER_LIST_FAILURE:
      return {
        ...state,
        fetchingAllUserListLoading: false,
        fetchingAllUserListError: action.payload.error,
      };
    case FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM:
      return {
        ...state,
        fetchingAllUserListFromGoogleClassRoomLoading: true,
        fetchingAllUserListFromGoogleClassRoomError: "",
      };
    case FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM_SUCCESS:
      return {
        ...state,
        fetchingAllUserListFromGoogleClassRoomLoading: false,
        studentList: action.payload,
      };
    case FETCH_ALL_USER_LIST_FROM_GOOGLE_CLASSROOM_FAILURE:
      return {
        ...state,
        fetchingAllUserListFromGoogleClassRoomLoading: false,
        fetchingAllUserListFromGoogleClassRoomError: action.payload.error,
      };
    case ADD_USER:
      return {
        ...state,
        addNewStudentLoading: true,
        addNewUserError: "",
      };
    case ADD_USER_SUCCESS:
      const updatedStudentList = [action.payload, ...state.studentList].sort(
        (a, b) => {
          let fa = a.profile.last_name.toLowerCase(),
            fb = b.profile.last_name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        },
      );
      return {
        ...state,
        addNewStudentLoading: false,
        studentList: updatedStudentList,
      };
    case ADD_USER_FAILURE:
      return {
        ...state,
        addNewStudentLoading: false,
        addNewUserError: action.payload.error,
      };
    case ADD_USERS:
      return {
        ...state,
        addNewStudentsLoading: true,
        addNewUsersError: "",
      };
    case ADD_USERS_SUCCESS:
      const newStudentList = [...action.payload, ...state.studentList].sort(
        (a, b) => {
          let fa = a.profile.last_name.toLowerCase(),
            fb = b.profile.last_name.toLowerCase();

          if (fa < fb) {
            return -1;
          }
          if (fa > fb) {
            return 1;
          }
          return 0;
        },
      );
      return {
        ...state,
        addNewStudentsLoading: false,
        studentList: newStudentList,
      };
    case ADD_USERS_FAILURE:
      return {
        ...state,
        addNewStudentsLoading: false,
        addNewUsersError: action.payload.error,
      };

    case FETCH_ALL_USER_WITH_CLASS_LIST:
      return {
        ...state,
        fetchingAllWithClassLoading: true,
        fetchingAllUserListError: "",
      };
    case FETCH_ALL_USER_WITH_CLASS_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllWithClassLoading: false,
        studentListWithClass: action.payload,
      };
    case FETCH_ALL_USER_WITH_CLASS_LIST_FAILURE:
      return {
        ...state,
        fetchingAllWithClassLoading: false,
        fetchingAllWithUserListClassError: action.payload.error,
      };
    case HANDLE_USER_ERROR:
      return {
        ...state,
        addNewUserError: "",
      };

    case EDIT_USER:
      return {
        ...state,
        editUserDetailsLoading: true,
        editUserDetailsError: "",
      };
    case EDIT_USER_SUCCESS: {
      let updateStudentList;

      updateStudentList = state.studentList.map(user => {
        if (user.id === action.payload.id) {
          let currentUser = { ...user };
          let userProfile = { ...user.profile };
          userProfile = Object.assign(userProfile, action.payload.profile);
          delete currentUser.profile;
          currentUser.profile = userProfile;

          return currentUser;
        } else {
          return user;
        }
      });

 

      return {
        ...state,
        editUserDetailsLoading: false,

        studentList: updateStudentList,
      };
    }
    case EDIT_USER_FAILURE:
      return {
        ...state,
        editUserDetailsLoading: false,
        editUserDetailsError: action.payload.error,
      };

    ////////////////////////////////////////////////////////////////////////////////////

    case EDIT_MULTIPLE_USER:
      return {
        ...state,
        editUserDetailsLoading: true,
        editUserDetailsError: "",
      };
    case EDIT_MULTIPLE_USER_SUCCESS: {
      let updateStudentList;

      updateStudentList = state.studentList.map(user => {
        // const test = action.payload.usersID.map(student => {
        //   if (user.id === student) {
        //     let currentUser = { ...user };
        //     let updatedStudent = action.payload.data.find(
        //       std => std.id === student,
        //     );

        //     currentUser = Object.assign(currentUser, updatedStudent);

        //     return currentUser;
        //   } else {
        //     return user;
        //   }
        // });
        if (action.payload.usersID.includes(user.id)) {
          // let currentUser = { ...user.profile };
          // let updatedStudent = action.payload.data.find(
          //   std => std.id === user.id,
          // );

          // return Object.assign(currentUser, updatedStudent.profile);
          let currentUser = { ...user };
          let userProfile = { ...user.profile };
          let updateProfile = action.payload.data.find(
            std => std.id === user.id,
          ).profile;

          userProfile = Object.assign(userProfile, updateProfile);

          delete currentUser.profile;
          currentUser.profile = userProfile;

          return currentUser;
        } else {
          return user;
        }
      });

      return {
        ...state,
        editUserDetailsLoading: false,
        studentList: updateStudentList,
      };
    }
    case EDIT_MULTIPLE_USER_FAILURE:
      return {
        ...state,
        editUserDetailsLoading: false,
        editUserDetailsError: action.payload.error,
      };

    case DELETE_USER:
      return {
        ...state,
        deleteUserLoading: true,
        deleteUserError: "",
      };
    case DELETE_USER_SUCCESS: {
      let updateStudentList;

      updateStudentList = state.studentList.filter(
        user => user.id !== action.payload.id,
      );

      return {
        ...state,
        deleteUserLoading: false,

        studentList: updateStudentList,
      };
    }
    case DELETE_USER_FAILURE:
      return {
        ...state,
        deleteUserLoading: false,
        deleteUserError: action.payload.error,
      };

    //////////////////////////////////////////////////////////////////////////

    case DELETE_MULTIPLE_USER:
      return {
        ...state,
        deleteUserLoading: true,
        deleteUserError: "",
      };
    case DELETE_MULTIPLE_USER_SUCCESS: {
      let updateStudentList;

      updateStudentList = state.studentList.filter(user => {
        return !action.payload.includes(user.id);
      });

      return {
        ...state,
        deleteUserLoading: false,

        studentList: updateStudentList,
      };
    }
    case DELETE_MULTIPLE_USER_FAILURE:
      return {
        ...state,
        deleteUserLoading: false,
        deleteUserError: action.payload.error,
      };

    case FETCH_STUDENT_INDIVIDUAL_REPORT:
      return {
        ...state,
        fetchingStudentIndividualLoading: true,
        fetchingStudentIndividualError: "",
      };
    case FETCH_STUDENT_INDIVIDUAL_REPORT_SUCCESS: {
      return {
        ...state,
        fetchingStudentIndividualLoading: false,
        studentIndividual: action.payload,
      };
    }
    case FETCH_STUDENT_INDIVIDUAL_REPORT_FAILURE:
      return {
        ...state,
        fetchingStudentIndividualLoading: false,
        fetchingStudentIndividualError: action.payload.error,
      };
    case FETCH_STUDENTS_GROUP_REPORT:
      return {
        ...state,
        fetchingStudentsGroupReportLoading: true,
        fetchingStudentsGroupReportError: "",
      };
    case FETCH_STUDENTS_GROUP_REPORT_SUCCESS: {
      return {
        ...state,
        fetchingStudentsGroupReportLoading: false,
        studentsGroupReport: action.payload,
      };
    }
    case FETCH_STUDENTS_GROUP_REPORT_FAILURE:
      return {
        ...state,
        fetchingStudentsGroupReportLoading: false,
        fetchingStudentsGroupReportError: action.payload.error,
      };
    case FETCH_GROWTH_GAUGE_REPORT:
      return {
        ...state,
        fetchingGrowthGaugeReportLoading: true,
        fetchingStudentsGroupReportError: "",
      };
    case FETCH_GROWTH_GAUGE_REPORT_SUCCESS: {
      return {
        ...state,
        fetchingGrowthGaugeReportLoading: false,
        growthGaugeReport: action.payload,
      };
    }
    case FETCH_GROWTH_GAUGE_REPORT_FAILURE:
      return {
        ...state,
        fetchingGrowthGaugeReportLoading: false,
        fetchingGrowthGaugeReportError: action.payload.error,
      };
    default:
      return state;
  }
};

export default userReducer;
