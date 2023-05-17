import {
  HEADER_SEARCH_TEXT,
  HEADER_SEARCH_CLASS_CODE,
  HEADER_RESET_FILTER,
} from "../action/actionType";

let initialState = {
  searchText: "",
  searchClassCode: "",
};

const headerReducer = (state = initialState, action) => {
  switch (action.type) {
    case HEADER_SEARCH_TEXT:
      return {
        ...state,
        searchText: action.payload,
      };
    case HEADER_SEARCH_CLASS_CODE:
      return {
        ...state,
        searchClassCode: action.payload,
      };
    case HEADER_RESET_FILTER:
      return {
        ...state,
        searchText: "",
        searchClassCode: "",
      };

    default:
      return state;
  }
};

export default headerReducer;
