import {
  FETCH_STRATEGIES,
  FETCH_STRATEGIES_SUCCESS,
  FETCH_STRATEGIES_FAILURE,
  FETCH_PRACTICE_TEST_QUESTION_LIST,
  FETCH_PRACTICE_TEST_QUESTION_LIST_SUCCESS,
  FETCH_PRACTICE_TEST_QUESTION_LIST_FAILURE,
  ADD_NEW_PRACTICE_TEST_SUBMISSION,
  ADD_NEW_PRACTICE_TEST_SUBMISSION_SUCCESS,
  ADD_NEW_PRACTICE_TEST_SUBMISSION_FAILURE,
  ADD_BATCH_PRACTICE_TEST_ANSWER_LIST,
  ADD_BATCH_PRACTICE_TEST_ANSWER_LIST_SUCCESS,
  ADD_BATCH_PRACTICE_TEST_ANSWER_LIST_FAILURE,
  FETCH_LEVEL_LIFTER_QUESTION_LIST,
  FETCH_LEVEL_LIFTER_QUESTION_LIST_SUCCESS,
  FETCH_LEVEL_LIFTER_QUESTION_LIST_FAILURE,
  FETCH_LEVEL_LIFTER_SUBMISSION_COUNT,
  FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_SUCCESS,
  FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_FAILURE,
  ADD_LEVEL_LIFTER_ANSWER,
  ADD_LEVEL_LIFTER_ANSWER_SUCCESS,
  ADD_LEVEL_LIFTER_ANSWER_FAILURE,
  ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION,
  ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION_SUCCESS,
  ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION_FAILURE,
  UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION,
  UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION_SUCCESS,
  UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION_FAILURE,
  START_SESSION,
  START_SESSION_SUCCESS,
  START_SESSION_FAILURE,
  END_SESSION,
  END_SESSION_SUCCESS,
  END_SESSION_FAILURE,
  FETCH_ALL_SESSION_LIST,
  FETCH_ALL_SESSION_LIST_SUCCESS,
  FETCH_ALL_SESSION_LIST_FAILURE,
  FETCH_WEEKLY_SESSION_LIST,
  FETCH_WEEKLY_SESSION_LIST_SUCCESS,
  FETCH_WEEKLY_SESSION_LIST_FAILURE,
  FETCH_MONTLY_SESSION_LIST,
  FETCH_MONTLY_SESSION_LIST_SUCCESS,
  FETCH_MONTLY_SESSION_LIST_FAILURE,
  START_STUDENT_SESSION_TIMER,
  STOP_STUDENT_SESSION_TIMER,
  FETCH_ALL_STRATEGY_LIST,
  FETCH_ALL_STRATEGY_LIST_SUCCESS,
  FETCH_ALL_STRATEGY_LIST_FAILURE,
  UPDATE_PRACTICE_SESSION_PROGRESS_BAR_PERCENTAGE,
  ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION,
  ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_SUCCESS,
  ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_FAILURE,
} from "./actionType";
import axios from "config/axios";
import { gaErrorLogger } from "utils/helpers";

export const fetchStrategies = payload => {
  return {
    type: FETCH_STRATEGIES,
    payload: payload,
  };
};

export const fetchStrategiesSuccess = payload => {
  return {
    type: FETCH_STRATEGIES_SUCCESS,
    payload: payload,
  };
};

export const fetchStrategiesFailure = payload => {
  return {
    type: FETCH_STRATEGIES_FAILURE,
    payload: payload,
  };
};

export const getStrategies = (learning_mode, level_index) => async dispatch => {
  dispatch(fetchStrategies());
  axios
    .get(
      `/strategies/by-user${
        learning_mode ? `?learning_mode=${learning_mode}` : ""
      }${level_index ? `&level_index=${level_index}` : ""}`,
    )
    .then(res => {
      dispatch(fetchStrategiesSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchStrategiesFailure({ error: error?.response?.data?.message }),
      );
      gaErrorLogger(error, "getStrategies");
    });
};

export const fetchPracticeTestQuestionList = payload => {
  return {
    type: FETCH_PRACTICE_TEST_QUESTION_LIST,
    payload: payload,
  };
};

export const fetchPracticeTestQuestionListSuccess = payload => {
  return {
    type: FETCH_PRACTICE_TEST_QUESTION_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchPracticeTestQuestionListFailure = payload => {
  return {
    type: FETCH_PRACTICE_TEST_QUESTION_LIST_FAILURE,
    payload: payload,
  };
};

export const getPracticeTestQuestionList = (
  slug,
  learning_mode,
  level_index,
  set_no,
  orderType,
) => async dispatch => {
  dispatch(fetchPracticeTestQuestionList());
  if (learning_mode === 1) {
    axios
      // .get(`/strategies/questions/${slug}`)
      .get(
        `/strategies/questions/${slug}?newStratergy=1${
          learning_mode ? `&learning_mode=${learning_mode}` : ""
        }${level_index ? `&level_index=${level_index}` : ""}${
          set_no ? `&set_no=${set_no}` : ""
        }${orderType ? `&order=${orderType}` : ""}`,
      )

      .then(res => {
        dispatch(fetchPracticeTestQuestionListSuccess(res.data.data));
      })
      .catch(error => {
        dispatch(
          fetchPracticeTestQuestionListFailure({
            error: error?.response?.data?.message,
          }),
        );
        gaErrorLogger(error, "getPracticeTestQuestionList");
      });
  } else {
    axios

      .get(
        `/strategies/questions/${slug}?newStratergy=2${
          learning_mode ? `&learning_mode=${learning_mode}` : ""
        }${level_index ? `&level_index=${level_index}` : ""}${
          set_no ? `&set_no=${set_no}` : ""
        }${orderType ? `&order=${orderType}` : ""}`,
      )
      .then(res => {
        dispatch(fetchPracticeTestQuestionListSuccess(res.data.data));
      })
      .catch(error => {
        dispatch(
          fetchPracticeTestQuestionListFailure({
            error: error?.response?.data?.message,
          }),
        );
        gaErrorLogger(error, "getPracticeTestQuestionList");
      });
  }
};

//Add practice test submission

export const createPracticeTestSubmission = payload => {
  return {
    type: ADD_NEW_PRACTICE_TEST_SUBMISSION,
    payload: payload,
  };
};

export const createPracticeTestSubmissionSuccess = payload => {
  return {
    type: ADD_NEW_PRACTICE_TEST_SUBMISSION_SUCCESS,
    payload: payload,
  };
};

export const createPracticeTestSubmissionFailure = payload => {
  return {
    type: ADD_NEW_PRACTICE_TEST_SUBMISSION_FAILURE,
    payload: payload,
  };
};

export const addNewPracticeTestSubmission = body => async dispatch => {
  dispatch(createPracticeTestSubmission());
  axios
    .post(`/practice-test/submissions`, body)
    .then(res => {
      dispatch(createPracticeTestSubmissionSuccess(res.data.data));
      sessionStorage.setItem("practice_test_submissions_id", res.data.data.id);
    })
    .catch(error => {
      dispatch(
        createPracticeTestSubmissionFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "addNewPracticeTestSubmission");
    });
};

//Submit practice test  batch answer list
export const createBatchPracticeTestSubmission = payload => {
  return {
    type: ADD_BATCH_PRACTICE_TEST_ANSWER_LIST,
    payload: payload,
  };
};

export const createBatchPracticeTestSubmissionSuccess = payload => {
  return {
    type: ADD_BATCH_PRACTICE_TEST_ANSWER_LIST_SUCCESS,
    payload: payload,
  };
};

export const createBatchPracticeTestSubmissionFailure = payload => {
  return {
    type: ADD_BATCH_PRACTICE_TEST_ANSWER_LIST_FAILURE,
    payload: payload,
  };
};

export const addBatchPracticeTestAnswerList = (
  body,
  handleSuccess,
) => async dispatch => {
  dispatch(createBatchPracticeTestSubmission());
  axios
    .post(`/batch-practice-test/answers`, body)
    .then(res => {
      dispatch(createBatchPracticeTestSubmissionSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        createBatchPracticeTestSubmissionFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "addBatchPracticeTestAnswerList");
    });
};

//fetch level lifter submission count
export const fetchLevelLifteSubmissionCount = payload => {
  return {
    type: FETCH_LEVEL_LIFTER_SUBMISSION_COUNT,
    payload: payload,
  };
};

export const fetchLevelLifteSubmissionCountSuccess = payload => {
  return {
    type: FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_SUCCESS,
    payload: payload,
  };
};

export const fetchLevelLifteSubmissionCountFailure = payload => {
  return {
    type: FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_FAILURE,
    payload: payload,
  };
};

export const getLevelLifterSubmissionCount = () => async dispatch => {
  dispatch(fetchLevelLifteSubmissionCount());

  axios
    .get(`/level-lifter-test/submissions-count`)
    .then(res => {
      dispatch(fetchLevelLifteSubmissionCountSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchLevelLifteSubmissionCountFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "getLevelLifterSubmissionCount");
    });
};

//practice test question list
export const fetchLevelLifterQuestionList = payload => {
  return {
    type: FETCH_LEVEL_LIFTER_QUESTION_LIST,
    payload: payload,
  };
};

export const fetchLevelLifterQuestionListSuccess = payload => {
  return {
    type: FETCH_LEVEL_LIFTER_QUESTION_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchLevelLifterQuestionListFailure = payload => {
  return {
    type: FETCH_LEVEL_LIFTER_QUESTION_LIST_FAILURE,
    payload: payload,
  };
};

export const getLevelLifterQuestionList = (
  type,
  userID,
  learningMode,
  submissionID,
) => async dispatch => {
  dispatch(fetchLevelLifterQuestionList());

  axios
    .get(
      `/test/get-level-lifter-questions${type ? "?type=attempted" : ""}${
        userID ? `${type ? "&" : "?"}user_id=${userID}` : ""
      }${learningMode ? `&learning_mode=${learningMode}` : ""}${
        submissionID ? `&submission_id=${submissionID}` : ""
      }`,
    )
    .then(res => {
      dispatch(fetchLevelLifterQuestionListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchLevelLifterQuestionListFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "getLevelLifterQuestionList");
    });
};
//level lifter  list
export const addNewLevelLifterSubmission = payload => {
  return {
    type: ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION,
    payload: payload,
  };
};

export const addNewLevelLifterSubmissionSuccess = payload => {
  return {
    type: ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION_SUCCESS,
    payload: payload,
  };
};

export const addNewLevelLifterSubmissionFailure = payload => {
  return {
    type: ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION_FAILURE,
    payload: payload,
  };
};

export const createNewLevelLifterSubmission = (
  body,
  handleSuccess,
  student_user_id,
) => async dispatch => {
  dispatch(addNewLevelLifterSubmission());

  axios
    .post(
      `/level-lifter-test/submissions?${
        student_user_id ? `student_user_id=${student_user_id}` : ""
      }`,
      body,
    )
    .then(res => {
      dispatch(addNewLevelLifterSubmissionSuccess(res.data.data));
      handleSuccess && handleSuccess();
    })
    .catch(error => {
      dispatch(
        addNewLevelLifterSubmissionFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "createNewLevelLifterSubmission");
    });
};

//add new level lifter answer
export const createLevelLifterAnswer = payload => {
  return {
    type: ADD_LEVEL_LIFTER_ANSWER,
    payload: payload,
  };
};

export const createLevelLifterAnswerSuccess = payload => {
  return {
    type: ADD_LEVEL_LIFTER_ANSWER_SUCCESS,
    payload: payload,
  };
};

export const createLevelLifterAnswerFailure = payload => {
  return {
    type: ADD_LEVEL_LIFTER_ANSWER_FAILURE,
    payload: payload,
  };
};

export const addLevelLifterAnswer = answerBody => async dispatch => {
  dispatch(createLevelLifterAnswer());

  axios
    .post(`/level-lifter-test/answers`, answerBody)
    .then(res => {
      dispatch(createLevelLifterAnswerSuccess({}));
    })

    .catch(error => {
      dispatch(
        createLevelLifterAnswerFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "addLevelLifterAnswer");
    });
};

//update current level lifter submission
export const editCurrentLevelLifterSubmissionDetails = payload => {
  return {
    type: UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION,
    payload: payload,
  };
};

export const editCurrentLevelLifterSubmissionDetailsSuccess = payload => {
  return {
    type: UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION_SUCCESS,
    payload: payload,
  };
};

export const editCurrentLevelLifterSubmissionDetailsFailure = payload => {
  return {
    type: UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION_FAILURE,
    payload: payload,
  };
};

export const updateCurrentLevelLifterSubmissionDetails = (
  body,
  activeSubmissionDetails,
  handleSuccess,
  handleCallbackFetchStrategies,
  student_user_id,
) => async dispatch => {
  dispatch(editCurrentLevelLifterSubmissionDetails());

  axios
    .put(
      `/level-lifter-test/submissions/${activeSubmissionDetails.id}?${
        student_user_id ? `student_user_id=${student_user_id}` : ""
      }`,
      body,
    )
    .then(res => {
      dispatch(editCurrentLevelLifterSubmissionDetailsSuccess({}));
      handleSuccess && handleSuccess();
      handleCallbackFetchStrategies && handleCallbackFetchStrategies();
    })
    .catch(error => {
      dispatch(
        editCurrentLevelLifterSubmissionDetailsFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "updateCurrentLevelLifterSubmissionDetails");
    });
};

//start session
export const createStudentSession = payload => {
  return {
    type: START_SESSION,
    payload: payload,
  };
};

export const createStudentSessionSuccess = payload => {
  return {
    type: START_SESSION_SUCCESS,
    payload: payload,
  };
};

export const createStudentSessionFailure = payload => {
  return {
    type: START_SESSION_FAILURE,
    payload: payload,
  };
};

export const startSession = body => async dispatch => {
  dispatch(createStudentSession());

  axios
    .post(`/student/sessions`, body)
    .then(res => {
      dispatch(createStudentSessionSuccess(res.data.data));
      sessionStorage.setItem("session_id", res.data.data.id);
    })
    .catch(error => {
      dispatch(
        createStudentSessionFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "startSession");
    });
};

//end session
export const endStudentSession = payload => {
  return {
    type: END_SESSION,
    payload: payload,
  };
};

export const endStudentSessionSuccess = payload => {
  return {
    type: END_SESSION_SUCCESS,
    payload: payload,
  };
};

export const endStudentSessionFailure = payload => {
  return {
    type: END_SESSION_FAILURE,
    payload: payload,
  };
};

export const endSession = (sessionId, body) => async dispatch => {
  dispatch(endStudentSession());

  return axios
    .put(`/student/sessions/${sessionId}`, body)
    .then(res => {
      dispatch(endStudentSessionSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        endStudentSessionFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "endSession");
    });
};

//get all session details by student id
export const fetchStudentSessionList = payload => {
  return {
    type: FETCH_ALL_SESSION_LIST,
    payload: payload,
  };
};

export const fetchStudentSessionListSuccess = payload => {
  return {
    type: FETCH_ALL_SESSION_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchStudentSessionListFailure = payload => {
  return {
    type: FETCH_ALL_SESSION_LIST_FAILURE,
    payload: payload,
  };
};

export const getSessionDetailsByStudentID = (
  userID,
  page,
  limit,
  start_date,
  end_date,
) => async dispatch => {
  dispatch(fetchStudentSessionList({ page }));
  axios
    // .get(`/user/sessions?user_id=${userID}`)
    .get(
      `/student/sessions?user_id=${userID}${page ? `&page=${page}` : ""}${
        limit ? `&limit=${limit}` : ""
      }${start_date ? `&start_date=${start_date}` : ""}${
        end_date ? `&end_date=${end_date}` : ""
      }`,
    )
    .then(res => {
      dispatch(fetchStudentSessionListSuccess({ res: res.data.data, page }));
    })
    .catch(error => {
      dispatch(
        fetchStudentSessionListFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "getSessionDetailsByStudentID");
    });
};
// start student session timer

export const startStudentSessionTimer = payload => {
  return {
    type: START_STUDENT_SESSION_TIMER,
    payload: payload,
  };
};

export const stopStudentSessionTimer = payload => {
  return {
    type: STOP_STUDENT_SESSION_TIMER,
    payload: payload,
  };
};

//weekly session details
export const fetchWeeklyStudentSessionList = payload => {
  return {
    type: FETCH_WEEKLY_SESSION_LIST,
    payload: payload,
  };
};

export const fetchWeeklyStudentSessionListSuccess = payload => {
  return {
    type: FETCH_WEEKLY_SESSION_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchWeeklyStudentSessionListFailure = payload => {
  return {
    type: FETCH_WEEKLY_SESSION_LIST_FAILURE,
    payload: payload,
  };
};

export const getWeeklySessionDetailsByStudentID = (
  userID,
  start_date,
  end_date,
) => async dispatch => {
  dispatch(fetchWeeklyStudentSessionList());
  axios

    .get(
      `/student/sessions?user_id=${userID}${
        start_date ? `&start_date=${start_date}` : ""
      }${end_date ? `&end_date=${end_date}` : ""}`,
    )
    .then(res => {
      dispatch(fetchWeeklyStudentSessionListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchWeeklyStudentSessionListFailure({
          error: error?.response?.data?.message,
        }),
      );
    });
};

//monthly session details

export const fetchMonthlyStudentSessionList = payload => {
  return {
    type: FETCH_MONTLY_SESSION_LIST,
    payload: payload,
  };
};

export const fetchMonthlyStudentSessionListSuccess = payload => {
  return {
    type: FETCH_MONTLY_SESSION_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchMonthlyStudentSessionListFailure = payload => {
  return {
    type: FETCH_MONTLY_SESSION_LIST_FAILURE,
    payload: payload,
  };
};

export const getMonthlySessionDetailsByStudentID = (
  userID,

  start_date,
  end_date,
) => async dispatch => {
  dispatch(fetchMonthlyStudentSessionList());
  axios

    .get(
      `/student/sessions?user_id=${userID}${
        start_date ? `&start_date=${start_date}` : ""
      }${end_date ? `&end_date=${end_date}` : ""}`,
    )
    .then(res => {
      dispatch(fetchMonthlyStudentSessionListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchMonthlyStudentSessionListFailure({
          error: error?.response?.data?.message,
        }),
      );
    });
};

//all strategy list

export const fetchAllStrategyList = payload => {
  return {
    type: FETCH_ALL_STRATEGY_LIST,
    payload: payload,
  };
};

export const fetchAllStrategyListSuccess = payload => {
  return {
    type: FETCH_ALL_STRATEGY_LIST_SUCCESS,
    payload: payload,
  };
};

export const fetchAllStrategyListFailure = payload => {
  return {
    type: FETCH_ALL_STRATEGY_LIST_FAILURE,
    payload: payload,
  };
};
export const getAllStrategyList = () => async dispatch => {
  dispatch(fetchAllStrategyList());

  axios
    .get(`/strategies`)
    .then(res => {
      dispatch(fetchAllStrategyListSuccess(res.data.data));
    })
    .catch(error => {
      dispatch(
        fetchAllStrategyListFailure({ error: error?.response?.data?.message }),
      );
      gaErrorLogger(error, "getAllStrategyList");
    });
};

export const updatePracticeSessionProgressBarCount = (
  currentQuestionIndex,
  totalPracticeTestQuestion,
) => {
  const payload = { currentQuestionIndex, totalPracticeTestQuestion };
  return {
    type: UPDATE_PRACTICE_SESSION_PROGRESS_BAR_PERCENTAGE,
    payload: payload,
  };
};

export const createStudentOrderPracticeTestSubmission = payload => {
  return {
    type: ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION,
    payload: payload,
  };
};

export const createStudentOrderPracticeTestSubmissionSuccess = payload => {
  return {
    type: ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_SUCCESS,
    payload: payload,
  };
};

export const createStudentOrderPracticeTestSubmissionFailure = payload => {
  return {
    type: ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_FAILURE,
    payload: payload,
  };
};

export const addStudentOrderPracticeTestSubmission = (
  slug,
  learning_mode,
  level_index,
  orderType,
) => async dispatch => {
  dispatch(fetchPracticeTestQuestionList());
  axios
    .get(
      `/teaching-tool/strategy/questions/${slug}${
        level_index ? `?level_index=${level_index}` : ""
      }${learning_mode ? `&learning_mode=${learning_mode}` : ""}${
        orderType ? `&order=${orderType}` : ""
      }`,
    )
    .then(res => {
      dispatch(fetchPracticeTestQuestionListSuccess(res.data.data));
      sessionStorage.setItem("practice_test_submissions_id", res.data.data.id);
    })
    .catch(error => {
      dispatch(
        fetchPracticeTestQuestionListFailure({
          error: error?.response?.data?.message,
        }),
      );
      gaErrorLogger(error, "addStudentOrderPracticeTestSubmission");
    });
};
