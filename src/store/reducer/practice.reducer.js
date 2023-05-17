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
  FETCH_LEVEL_LIFTER_SUBMISSION_COUNT,
  FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_SUCCESS,
  FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_FAILURE,
  FETCH_LEVEL_LIFTER_QUESTION_LIST,
  FETCH_LEVEL_LIFTER_QUESTION_LIST_SUCCESS,
  FETCH_LEVEL_LIFTER_QUESTION_LIST_FAILURE,
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
  START_STUDENT_SESSION_TIMER,
  STOP_STUDENT_SESSION_TIMER,
  FETCH_WEEKLY_SESSION_LIST,
  FETCH_WEEKLY_SESSION_LIST_SUCCESS,
  FETCH_WEEKLY_SESSION_LIST_FAILURE,
  FETCH_MONTLY_SESSION_LIST,
  FETCH_MONTLY_SESSION_LIST_SUCCESS,
  FETCH_MONTLY_SESSION_LIST_FAILURE,
  FETCH_ALL_STRATEGY_LIST,
  FETCH_ALL_STRATEGY_LIST_SUCCESS,
  FETCH_ALL_STRATEGY_LIST_FAILURE,
  UPDATE_PRACTICE_SESSION_PROGRESS_BAR_PERCENTAGE,
  ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION,
  ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_SUCCESS,
  ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_FAILURE,
} from "../action/actionType";

let initialState = {
  fetchingStrategiesLoading: false,
  strategyList: [],
  fetchingStrategiesError: "",
  fetchingPracticeTestQuestionListLoading: false,
  practiceTestQuestionList: [],
  fetchingPracticeTestQuestionListError: "",

  addNewPracticeTestSubmissionLoading: false,
  addNewPracticeTestSubmissionDetails: {},
  addNewPracticeTestSubmissionError: false,
  addPracticeTestAnswerListLoading: false,
  addPracticeTestAnswerListError: "",

  fetchingLevelLifterQuestionListLoading: false,
  levelLifterQuestionList: [],
  levelLifterSubmissionReportDetails: {},
  fetchingLevelLifterQuestionListError: "",

  levelLifterSubmissionDetails: {},
  addNewLevelLifterSubmissionLoading: false,
  addNewLevelLifterSubmissionError: "",

  createSessionLoading: false,
  sessionDetails: {},
  createSessionError: "",

  updateSessionLoading: false,
  updateSessionError: "",

  fetchingSessionListLoading: false,
  fetchingSessionListError: "",
  sessionListByUser: [],
  weeklySessionList: [],
  monthlySessionList: [],

  levelLifterSubmissionCount: 0,
  fetchingLevelLifterSubmissionCountLoading: false,
  fetchingLevelLifterSubmissionCountError: "",

  isSessionStart: false,
  studentSessionTimer: +sessionStorage.getItem("sessionTimer") || 0,

  allStrategyList: [],
  fetchingAllStrategyListLoading: false,
  fetchingAllStrategyListError: "",

  addStudentOrderPracticeTestSubmissionLoading: false,
  addStudentOrderPracticeTestSubmissionDetails: {},
  addStudentOrderPracticeTestSubmissionError: false,

  studentPracticeTestProgressBarPercentage: 0,
};

const strategy = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_STRATEGIES:
      return {
        ...state,
        fetchingStrategiesLoading: true,
        teacherSignupError: "",
      };
    case FETCH_STRATEGIES_SUCCESS:
      return {
        ...state,
        fetchingStrategiesLoading: false,
        strategyList: action.payload,
      };
    case FETCH_STRATEGIES_FAILURE:
      return {
        ...state,
        fetchingStrategiesLoading: false,
        fetchingStrategiesError: action.payload.error,
      };
    case FETCH_PRACTICE_TEST_QUESTION_LIST:
      return {
        ...state,

        fetchingPracticeTestQuestionListLoading: true,
        fetchingPracticeTestQuestionListError: "",
        practiceTestQuestionList: [],
        // For Null Progress
        studentPracticeTestProgressBarPercentage: 0,
      };
    case FETCH_PRACTICE_TEST_QUESTION_LIST_SUCCESS:
      return {
        ...state,

        fetchingPracticeTestQuestionListLoading: false,
        practiceTestQuestionList: action.payload,

        studentPracticeTestProgressBarPercentage:
          1 * (100 / action.payload.length),
      };
    case FETCH_PRACTICE_TEST_QUESTION_LIST_FAILURE:
      return {
        ...state,
        fetchingPracticeTestQuestionListLoading: false,
        fetchingPracticeTestQuestionListError: action.payload.error,
      };

    case ADD_NEW_PRACTICE_TEST_SUBMISSION:
      return {
        ...state,
        addNewPracticeTestSubmissionLoading: true,
        addNewPracticeTestSubmissionError: "",
      };
    case ADD_NEW_PRACTICE_TEST_SUBMISSION_SUCCESS:
      return {
        ...state,
        addNewPracticeTestSubmissionLoading: false,
        addNewPracticeTestSubmissionDetails: action.payload,
      };
    case ADD_NEW_PRACTICE_TEST_SUBMISSION_FAILURE:
      return {
        ...state,
        addNewPracticeTestSubmissionLoading: false,
        addNewPracticeTestSubmissionError: action.payload.error,
      };

    case ADD_BATCH_PRACTICE_TEST_ANSWER_LIST:
      return {
        ...state,
        addPracticeTestAnswerListLoading: true,
        addPracticeTestAnswerListError: "",
      };
    case ADD_BATCH_PRACTICE_TEST_ANSWER_LIST_SUCCESS:
      return {
        ...state,
        addPracticeTestAnswerListLoading: false,
      };
    case ADD_BATCH_PRACTICE_TEST_ANSWER_LIST_FAILURE:
      return {
        ...state,
        addPracticeTestAnswerListLoading: false,
        addPracticeTestAnswerListError: action.payload.error,
      };
    case FETCH_LEVEL_LIFTER_SUBMISSION_COUNT:
      return {
        ...state,
        fetchingLevelLifterSubmissionCountLoading: true,
        fetchingLevelLifterSubmissionCountError: "",
      };
    case FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_SUCCESS:
      return {
        ...state,
        fetchingLevelLifterSubmissionCountLoading: false,
        levelLifterSubmissionCount: action.payload,
      };
    case FETCH_LEVEL_LIFTER_SUBMISSION_COUNT_FAILURE:
      return {
        ...state,
        fetchingLevelLifterSubmissionCountLoading: false,
        fetchingLevelLifterSubmissionCountError: action.payload.error,
      };
    case FETCH_LEVEL_LIFTER_QUESTION_LIST:
      return {
        ...state,
        fetchingLevelLifterQuestionListLoading: true,
        fetchingLevelLifterQuestionListError: "",
        levelLifterQuestionList: [],
        levelLifterSubmissionReportDetails: {},
      };
    case FETCH_LEVEL_LIFTER_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        fetchingLevelLifterQuestionListLoading: false,
        levelLifterQuestionList: action.payload.questions,
        levelLifterSubmissionReportDetails: action.payload,
      };
    case FETCH_LEVEL_LIFTER_QUESTION_LIST_FAILURE:
      return {
        ...state,
        fetchingLevelLifterQuestionListLoading: false,
        fetchingLevelLifterQuestionListError: action.payload.error,
      };
    case ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION:
      return {
        ...state,
        addNewLevelLifterSubmissionLoading: true, //we have put timer of 5sec that's why we are not changing state here
        addNewLevelLifterSubmissionError: "",
      };
    case ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION_SUCCESS:
      return {
        ...state,
        addNewLevelLifterSubmissionLoading: false,
        levelLifterSubmissionDetails: action.payload,
      };
    case ADD_NEW_LEVEL_LIFTER_TEST_SUBMISSION_FAILURE:
      return {
        ...state,
        addNewLevelLifterSubmissionLoading: false,
        addNewLevelLifterSubmissionError: action.payload.error,
      };
    case UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION:
      return {
        ...state,
      };
    case UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION_SUCCESS:
      return {
        ...state,
        levelLifterSubmissionCount: state.levelLifterSubmissionCount + 1,
      };
    case UPDATE_CURRENT_LEVEL_LIFTER_SUBMISSION_FAILURE:
      return {
        ...state,
      };
    case START_SESSION:
      return {
        ...state,
        createSessionLoading: true, //we have put timer of 5sec that's why we are not changing state here
        addNewLevelLifterSubmissionError: "",
      };
    case START_SESSION_SUCCESS:
      return {
        ...state,
        createSessionLoading: false,
        sessionDetails: action.payload,
      };
    case START_SESSION_FAILURE:
      return {
        ...state,
        createSessionLoading: false,
        createSessionError: action.payload.error,
      };

    case END_SESSION:
      return {
        ...state,
        updateSessionLoading: true, //we have put timer of 5sec that's why we are not changing state here
        updateSessionError: "",
      };
    case END_SESSION_SUCCESS:
      return {
        ...state,
        updateSessionLoading: false,
        sessionDetails: action.payload,
      };
    case END_SESSION_FAILURE:
      return {
        ...state,
        updateSessionLoading: false,
        updateSessionError: action.payload.error,
      };

    case FETCH_ALL_SESSION_LIST:
      //reset  data  if page is 1
      return {
        ...state,
        fetchingSessionListLoading: true, //we have put timer of 5sec that's why we are not changing state here
        fetchingSessionListError: "",
        sessionListByUser:
          action.payload.page === 1 ? [] : state.sessionListByUser,
        totalSessionLengthByUser: "",
        totalCompletedSessionLengthByUser: "",
        studentSessionStartDate: "",
      };
    case FETCH_ALL_SESSION_LIST_SUCCESS:
      return {
        ...state,
        fetchingSessionListLoading: false,
        sessionListByUser:
          action.payload.page === 1
            ? [...action.payload.res.sessions]
            : [...state.sessionListByUser, ...action.payload.res.sessions],

        totalSessionLengthByUser: action.payload.res.total_sessions,
        totalCompletedSessionLengthByUser:
          action.payload.res.total_completed_sessions,
        studentSessionStartDate: action.payload.res.session_start_date,
      };
    case FETCH_ALL_SESSION_LIST_FAILURE:
      return {
        ...state,
        fetchingSessionListLoading: false,
        fetchingSessionListError: action.payload.error,
      };
    case START_STUDENT_SESSION_TIMER:
      sessionStorage.setItem("sessionTimer", state.studentSessionTimer + 1);
      return {
        ...state,
        isSessionStart: true,
        studentSessionTimer: state.studentSessionTimer + 1,
      };

    case STOP_STUDENT_SESSION_TIMER:
      return {
        ...state,
        isSessionStart: false,
        studentSessionTimer: 0,
      };
    case FETCH_WEEKLY_SESSION_LIST:
      return {
        ...state,
        fetchingSessionListLoading: true, //we have put timer of 5sec that's why we are not changing state here
        fetchingSessionListError: "",
        weeklySessionList: [],
      };
    case FETCH_WEEKLY_SESSION_LIST_SUCCESS:
      return {
        ...state,
        fetchingSessionListLoading: false,
        weeklySessionList: action.payload,
      };
    case FETCH_WEEKLY_SESSION_LIST_FAILURE:
      return {
        ...state,
        fetchingSessionListLoading: false,
        fetchingSessionListError: action.payload.error,
      };
    case FETCH_MONTLY_SESSION_LIST:
      return {
        ...state,
        fetchingSessionListLoading: true, //we have put timer of 5sec that's why we are not changing state here
        fetchingSessionListError: "",
        monthlySessionList: [],
      };
    case FETCH_MONTLY_SESSION_LIST_SUCCESS:
      return {
        ...state,
        fetchingSessionListLoading: false,
        monthlySessionList: action.payload,
      };
    case FETCH_MONTLY_SESSION_LIST_FAILURE:
      return {
        ...state,
        fetchingSessionListLoading: false,
        fetchingSessionListError: action.payload.error,
      };
    case FETCH_ALL_STRATEGY_LIST:
      return {
        ...state,
        fetchingAllStrategyListLoading: true,
        fetchingAllStrategyListError: "",
      };
    case FETCH_ALL_STRATEGY_LIST_SUCCESS:
      return {
        ...state,
        fetchingAllStrategyListLoading: false,
        allStrategyList: action.payload.filter(strategy => strategy.isViewable),
      };
    case FETCH_ALL_STRATEGY_LIST_FAILURE:
      return {
        ...state,
        fetchingAllStrategyListLoading: false,
        fetchingAllStrategyListError: action.payload.error,
      };
    case UPDATE_PRACTICE_SESSION_PROGRESS_BAR_PERCENTAGE:
      const {
        currentQuestionIndex,

        totalPracticeTestQuestion,
      } = action.payload;
      const addedIndex = 2;
      return {
        ...state,

        studentPracticeTestProgressBarPercentage:
          (currentQuestionIndex + addedIndex) *
          (100 / totalPracticeTestQuestion),
      };

    case ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION:
      return {
        ...state,
        addStudentOrderPracticeTestSubmissionLoading: true,
        addStudentOrderPracticeTestSubmissionError: "",
      };
    case ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_SUCCESS:
      return {
        ...state,
        addStudentOrderPracticeTestSubmissionLoading: false,
        addStudentOrderPracticeTestSubmissionDetails: action.payload,
      };
    case ADD_STUDENT_ORDER_PRACTICE_TEST_SUBMISSION_FAILURE:
      return {
        ...state,
        addStudentOrderPracticeTestSubmissionLoading: false,
        addStudentOrderPracticeTestSubmissionError: action.payload.error,
      };

    default:
      return state;
  }
};

export default strategy;
