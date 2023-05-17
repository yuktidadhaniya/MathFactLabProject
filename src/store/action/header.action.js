import {
  HEADER_SEARCH_TEXT,
  HEADER_SEARCH_CLASS_CODE,
  HEADER_RESET_FILTER,
} from "./actionType";

export const headerSearchText = payload => {
  return {
    type: HEADER_SEARCH_TEXT,
    payload: payload,
  };
};

export const headerSearchClassCode = payload => {
  return {
    type: HEADER_SEARCH_CLASS_CODE,
    payload: payload,
  };
};

export const headerResetFilter = payload => {
  return {
    type: HEADER_RESET_FILTER,
    payload: payload,
  };
};
