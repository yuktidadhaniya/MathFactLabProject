import { combineReducers } from "redux";

import user from "./user.reducer";
import auth from "./auth.reducer";
import notification from "./notifications.reducer";
import quiz from "./quiz.reducer";
import strategy from "./practice.reducer";
import classCode from "./classCode.reducer";
import header from "./header.reducer";

const appReducer = combineReducers({
  user,
  auth,
  notification,
  quiz,
  strategy,
  classCode,
  header,
});

const rootReducer = (state, action) => {
  if (action.type === "AUTH_USER_LOGOUT_SUCCESS") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
