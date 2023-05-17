import {
  FETCH_ALL_CLASS_CODE_LIST,
  FETCH_ALL_CLASS_CODE_LIST_SUCCESS,
  FETCH_ALL_CLASS_CODE_LIST_FAILURE,
  ADD_CLASS_CODE,
  ADD_CLASS_CODE_SUCCESS,
  ADD_CLASS_CODE_FAILURE,
  ADD_SELECTED_CLASS_CODE,
  ADD_SELECTED_CLASS_CODE_SUCCESS,
  ADD_SELECTED_CLASS_CODE_FAILURE,
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
} from "../action/actionType";

let initialState = {
  //delete
  teacherCodeList: [],
  //fetch
  classCodeList: [],
  fetchingAllClassCodeListLoading: false,
  fetchingAllClassCodeListError: "",

  //fetch from google classroom
  allClassCodeList: [],
  fetchingAllClassCodeListFromGoogleClassRoomLoading: false,
  fetchingAllClassCodeListFromGoogleClassRoomError: "",

  //class link classes
  classLinkClassList: [],
  fetchingClassLinkClassListLoading: false,
  fetchingClassLinkClassListLoadingError: "",

  //add
  addNewClassCodeLoading: false,
  addNewClassCodeError: "",

  //update
  editClassCodeDetailsLoading: false,
  editClassCodeDetailsError: "",

  //delete
  deleteClassCodeLoading: false,
  deleteClassCodeError: "",

  syncGoogleClassLoading: false,
  syncClassLinkClassLoading: false,

  //delete
  deleteTeacherCodeLoading: false,
  deleteTeacherCodeError: "",
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_ALL_CLASS_CODE_LIST:
      return {
        ...state,
        fetchingAllClassCodeListLoading: true,
        fetchingAllClassCodeListError: "",
      };
    case FETCH_ALL_CLASS_CODE_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllClassCodeListLoading: false,
        classCodeList: action.payload,
      };
    case FETCH_ALL_CLASS_CODE_LIST_FAILURE:
      return {
        ...state,
        fetchingAllClassCodeListLoading: false,
        fetchingAllClassCodeListError: action.payload.error,
      };

    case FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM:
      return {
        ...state,
        fetchingAllClassCodeListFromGoogleClassRoomLoading: true,
        fetchingAllClassCodeListFromGoogleClassRoomError: "",
      };
    case FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM_SUCCESS:
      return {
        ...state,
        fetchingAllClassCodeListFromGoogleClassRoomLoading: false,
        allClassCodeList: action.payload,
      };
    case FETCH_ALL_CLASS_CODE_LIST_FROM_GOOGLE_CLASSROOM_FAILURE:
      return {
        ...state,
        fetchingAllClassCodeListFromGoogleClassRoomLoading: false,
        fetchingAllClassCodeListFromGoogleClassRoomError: action.payload.error,
      };

    case FETCH_CLASS_LINK_CLASSES:
      return {
        ...state,
        fetchingClassLinkClassListLoading: true,
        fetchingClassLinkClassListLoadingError: "",
      };
    case FETCH_CLASS_LINK_CLASSES_SUCCESS:
      return {
        ...state,
        fetchingClassLinkClassListLoading: false,
        classLinkClassList: action.payload,
      };
    case FETCH_CLASS_LINK_CLASSES_FAILURE:
      return {
        ...state,
        fetchingClassLinkClassListLoading: false,
        fetchingClassLinkClassListLoadingError: action.payload.error,
      };

    case ADD_SELECTED_CLASS_CODE:
      return {
        ...state,
        syncGoogleClassLoading: true,
      };
    case ADD_SELECTED_CLASS_CODE_SUCCESS:
      return {
        ...state,
        syncGoogleClassLoading: false,
      };
    case ADD_SELECTED_CLASS_CODE_FAILURE:
      return {
        ...state,
        syncGoogleClassLoading: false,
      };
    case ADD_CLASS_CODE:
      return {
        ...state,
        addNewClassCodeLoading: true,
        addNewClassCodeError: "",
      };
    case ADD_CLASS_CODE_SUCCESS:
      return {
        ...state,
        addNewClassCodeLoading: false,
        classCodeList: [action.payload, ...state.classCodeList],
      };
    case ADD_CLASS_CODE_FAILURE:
      return {
        ...state,
        addNewClassCodeLoading: false,
        addNewClassCodeError: action.payload.error,
      };

    case HANDLE_CLASS_CODE_ERROR:
      return {
        ...state,
        addNewClassCodeError: "",
      };

    case EDIT_CLASS_CODE:
      return {
        ...state,
        editClassCodeDetailsLoading: true,
        editClassCodeDetailsError: "",
      };
    case EDIT_CLASS_CODE_SUCCESS: {
      let updateClassCodeList;

      updateClassCodeList = state.classCodeList.map(user => {
        if (user.id === action.payload.id) {
          return action.payload;
        } else {
          return user;
        }
      });

      return {
        ...state,
        editClassCodeDetailsLoading: false,
        classCodeList: updateClassCodeList,
      };
    }
    case EDIT_CLASS_CODE_FAILURE:
      return {
        ...state,
        editClassCodeDetailsLoading: false,
        editClassCodeDetailsError: action.payload.error,
      };

    case DELETE_CLASS_CODE:
      return {
        ...state,
        deleteClassCodeLoading: true,
        deleteClassCodeError: "",
      };
    case DELETE_CLASS_CODE_SUCCESS: {
      let updateClassCodeList;
      updateClassCodeList = state.classCodeList.filter(
        classCode => classCode.id !== action.payload,
      );

      return {
        ...state,
        deleteClassCodeLoading: false,
        classCodeList: updateClassCodeList,
      };
    }
    case DELETE_CLASS_CODE_FAILURE:
      return {
        ...state,
        deleteClassCodeLoading: false,
        deleteClassCodeError: action.payload.error,
      };
    case ADD_SELECTED_CLASS_LINK_CLASS:
      return {
        ...state,
        syncClassLinkClassLoading: true,
      };
    case ADD_SELECTED_CLASS_LINK_CLASS_SUCCESS:
      return {
        ...state,
        syncClassLinkClassLoading: false,
      };
    case ADD_SELECTED_CLASS_LINK_CLASS_FAILURE:
      return {
        ...state,
        syncClassLinkClassLoading: false,
      };

    
    default:
      return state;
  }
};

export default userReducer;
