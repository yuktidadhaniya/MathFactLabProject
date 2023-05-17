import {
  FETCH_LEVEL_LIST,
  FETCH_LEVEL_LIST_SUCCESS,
  FETCH_LEVEL_LIST_FAILURE,
  FETCH_QUESTION_LIST,
  FETCH_QUESTION_LIST_SUCCESS,
  FETCH_QUESTION_LIST_FAILURE,
  ADD_NEW_SUBMISSION,
  ADD_NEW_SUBMISSION_SUCCESS,
  ADD_NEW_SUBMISSION_FAILURE,
  FETCH_LAST_SUBMISSION_DETAILS,
  FETCH_LAST_SUBMISSION_DETAILS_SUCCESS,
  FETCH_LAST_SUBMISSION_DETAILS_FAILURE,
  UPDATE_CURRENT_QUESTION,
  UPDATE_WRONG_QUESTION_COUNT,
  UPDATE_CURRENT_SUBMISSION,
  UPDATE_CURRENT_SUBMISSION_SUCCESS,
  UPDATE_CURRENT_SUBMISSION_FAILURE,
  ADD_ANSWER,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAILURE,
  FETCH_LEVEL_LEARNING_MODE_LIST,
  FETCH_LEVEL_LEARNING_MODE_LIST_SUCCESS,
  FETCH_LEVEL_LEARNING_MODE_LIST_FAILURE,
} from "./actionType";
import axios from "config/axios";

// get Questions List By level
export const fetchQuestionsList = payload => {
  return {
    type: FETCH_QUESTION_LIST,
    payload: payload,
  };
};

export const fetchQuestionsListSuccess = payload => {
  return {
    type: FETCH_QUESTION_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchQuestionsListFailure = payload => {
  return {
    type: FETCH_QUESTION_LIST_FAILURE,
    payload: payload,
  };
};

export const getQuestionsList = body => async dispatch => {
  dispatch(fetchQuestionsList());
  axios
    .get(`/placement-test/questions/2`, body)
    .then(res => {
      dispatch(fetchQuestionsListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchQuestionsListFailure({
          error: error.response.data.errors.message,
        }),
      );
    });
};

// get  Level List
export const fetchLevelsList = payload => {
  return {
    type: FETCH_LEVEL_LIST,
    payload: payload,
  };
};

export const fetchLevelsListSuccess = payload => {
  return {
    type: FETCH_LEVEL_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchLevelsListFailure = payload => {
  return {
    type: FETCH_LEVEL_LIST_FAILURE,
    payload: payload,
  };
};

export const getLevelsList = () => async dispatch => {
  dispatch(fetchLevelsList());
  axios
    .get(`/placement-test/levels`)
    .then(res => {
      dispatch(fetchLevelsListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchLevelsListFailure({ error: error.response.data.errors.message }),
      );
    });
};

// get  Level learning mode List
export const fetchLevelsLearningModeList = payload => {
  return {
    type: FETCH_LEVEL_LEARNING_MODE_LIST,
    payload: payload,
  };
};

export const fetchLevelsLearningModeListSuccess = payload => {
  return {
    type: FETCH_LEVEL_LEARNING_MODE_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchLevelsLearningModeListFailure = payload => {
  return {
    type: FETCH_LEVEL_LEARNING_MODE_LIST_FAILURE,
    payload: payload,
  };
};

export const getLevelsLearningModeList = () => async dispatch => {
  dispatch(fetchLevelsLearningModeList());
  axios
    .get(`/levels`)
    .then(res => {
      dispatch(fetchLevelsLearningModeListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchLevelsLearningModeListFailure({
          error: error.response.data.errors.message,
        }),
      );
    });
};

//add new submission
export const addNewSubmission = payload => {
  return {
    type: ADD_NEW_SUBMISSION,
    payload: payload,
  };
};

export const addNewSubmissionSuccess = payload => {
  return {
    type: ADD_NEW_SUBMISSION_SUCCESS,
    payload: payload,
  };
};

export const addNewSubmissionFailure = payload => {
  return {
    type: ADD_NEW_SUBMISSION_FAILURE,
    payload: payload,
  };
};

export const createNewSubmission = (body, handleSuccess) => async dispatch => {
  dispatch(addNewSubmission());
  axios
    .post(`/placement-test/submissions`, body)
    .then(res => {
      dispatch(addNewSubmissionSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        addNewSubmissionFailure({ error: error.response.data.errors.message }),
      );
    });
};

//get last submission details

export const fetchLastSubmissionDetails = payload => {
  return {
    type: FETCH_LAST_SUBMISSION_DETAILS,
    payload: payload,
  };
};

export const fetchLastSubmissionDetailsSuccess = payload => {
  return {
    type: FETCH_LAST_SUBMISSION_DETAILS_SUCCESS,
    payload: payload,
  };
};

export const fetchLastSubmissionDetailsFailure = payload => {
  return {
    type: FETCH_LAST_SUBMISSION_DETAILS_FAILURE,
    payload: payload,
  };
};

export const getSubmissionDetails = (
  userDetails,
  type = "",
) => async dispatch => {
  dispatch(fetchLastSubmissionDetails());

  axios
    .get(
      `/users/${userDetails.id}/get-detailed-last-submission?learning_mode=${
        userDetails.profile.student_learning_mode_id
      }${type ? "&type=attempted" : ""}`,
    )
    .then(res => {
      dispatch(
        fetchLastSubmissionDetailsSuccess({
          submissionDetails: res.data.data,
        }),
      );
    })
    .catch(error => {
      dispatch(
        fetchLastSubmissionDetailsFailure({
          error: error.response.data.errors.message,
        }),
      );
    });
};
//update current submission
export const editCurrentSubmissionDetails = payload => {
  return {
    type: UPDATE_CURRENT_SUBMISSION,
    payload: payload,
  };
};

export const editCurrentSubmissionDetailsSuccess = payload => {
  return {
    type: UPDATE_CURRENT_SUBMISSION_SUCCESS,
    payload: payload,
  };
};

export const editCurrentSubmissionDetailsFailure = payload => {
  return {
    type: UPDATE_CURRENT_SUBMISSION_FAILURE,
    payload: payload,
  };
};

export const updateCurrentSubmissionDetails = (
  body,
  activeSubmissionDetails,
) => async dispatch => {
  dispatch(editCurrentSubmissionDetails());

  axios
    .put(`/placement-test/submissions/${activeSubmissionDetails.id}`, body)
    .then(res => {
      dispatch(editCurrentSubmissionDetailsSuccess({}));
    })
    .catch(error => {
      dispatch(
        editCurrentSubmissionDetailsFailure({
          error: error.response.data.errors.message,
        }),
      );
    });
};

//increment current question
export const updateCurrentQuestion = currentQuestion => {
  return {
    type: UPDATE_CURRENT_QUESTION,
    payload: currentQuestion,
  };
};

export const updateWrongQuestionCount = wrongQuestion => {
  return {
    type: UPDATE_WRONG_QUESTION_COUNT,
    payload: wrongQuestion,
  };
};

//add new answer
export const createAnswer = payload => {
  return {
    type: ADD_ANSWER,
    payload: payload,
  };
};

export const createAnswerSuccess = payload => {
  return {
    type: ADD_ANSWER_SUCCESS,
    payload: payload,
  };
};

export const createAnswerFailure = payload => {
  return {
    type: ADD_ANSWER_FAILURE,
    payload: payload,
  };
};

export const addAnswer = answerBody => async dispatch => {
  dispatch(createAnswer());

  axios
    .post(`/placement-test/answers`, answerBody)
    .then(res => {
      dispatch(createAnswerSuccess({}));
    })

    .catch(error => {
      dispatch(
        createAnswerFailure({
          error: error.response.data.errors.message,
        }),
      );
    });
};
