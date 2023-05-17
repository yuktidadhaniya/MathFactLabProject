import {
  FETCH_QUESTION_LIST,
  FETCH_QUESTION_LIST_SUCCESS,
  FETCH_QUESTION_LIST_FAILURE,
  FETCH_LEVEL_LIST,
  FETCH_LEVEL_LIST_SUCCESS,
  FETCH_LEVEL_LIST_FAILURE,
  ADD_NEW_SUBMISSION,
  ADD_NEW_SUBMISSION_SUCCESS,
  ADD_NEW_SUBMISSION_FAILURE,
  FETCH_LAST_SUBMISSION_DETAILS,
  FETCH_LAST_SUBMISSION_DETAILS_SUCCESS,
  FETCH_LAST_SUBMISSION_DETAILS_FAILURE,
  UPDATE_CURRENT_QUESTION,
  UPDATE_CURRENT_SUBMISSION,
  UPDATE_CURRENT_SUBMISSION_SUCCESS,
  UPDATE_CURRENT_SUBMISSION_FAILURE,
  ADD_ANSWER,
  ADD_ANSWER_SUCCESS,
  ADD_ANSWER_FAILURE,
  UPDATE_WRONG_QUESTION_COUNT,
  FETCH_LEVEL_LEARNING_MODE_LIST,
  FETCH_LEVEL_LEARNING_MODE_LIST_SUCCESS,
  FETCH_LEVEL_LEARNING_MODE_LIST_FAILURE,
} from "../action/actionType";
// import _ from "lodash"
let initialState = {
  questionList: [],
  fetchingQuestionListLoading: false,
  fetchingQuestionListError: "",
  levelList: [],
  fetchingLevelListLoading: false,
  fetchingLevelListError: "",
  levelLearningModeList: [],
  fetchingLevelLearningModeListLoading: false,
  fetchingLevelLearningModeListError: "",
  //new submission
  addingNewSubmissionLoading: false,
  activeSubmissionDetails: {},
  addingNewSubmissionError: "",
  //last submission
  fetchingSubmissionDetailsLoading: false,
  submissionDetails: [],
  fetchingSubmissionDetailsError: "",
  //Quiz questions data
  totalQuizLevel: "",
  isQuizStarted: false,
  isQuizCompleted: false,
  isQuizFailed: false,
  quizData: null,
  currentQuestionCount: 0,
  rightAnswerCount: 0,
  wrongAnswerCount: 0,
  totalQuestionCount: 0,
  userActiveQuizLevelId: "",
  quizContinuesCount: 0,
};
const quizReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_LEVEL_LIST:
      return {
        ...state,
        isQuizStarted: false,
        isQuizCompleted: false,
        isQuizFailed: false,
        fetchingLevelListLoading: true,
        fetchingLevelListError: "",
      };
    case FETCH_LEVEL_LIST_SUCCESS:
      return {
        ...state,
        fetchingLevelListLoading: false,
        levelList: action.payload,
      };
    case FETCH_LEVEL_LIST_FAILURE:
      return {
        ...state,
        fetchingLevelListLoading: false,
        fetchingLevelListError: action.payload.error,
      };

    case FETCH_LEVEL_LEARNING_MODE_LIST:
      return {
        ...state,
        isQuizStarted: false,
        isQuizCompleted: false,
        isQuizFailed: false,
        fetchingLevelLearningModeListLoading: true,
        fetchingLevelLearningModeListError: "",
      };
    case FETCH_LEVEL_LEARNING_MODE_LIST_SUCCESS:
      return {
        ...state,
        fetchingLevelLearningModeListLoading: false,
        levelLearningModeList: action.payload,
      };
    case FETCH_LEVEL_LEARNING_MODE_LIST_FAILURE:
      return {
        ...state,
        fetchingLevelLearningModeListLoading: false,
        fetchingLevelLearningModeListError: action.payload.error,
      };

    case FETCH_QUESTION_LIST:
      return {
        ...state,
        fetchingQuestionListLoading: true,
        fetchingQuestionListError: "",
      };
    case FETCH_QUESTION_LIST_SUCCESS:
      return {
        ...state,
        fetchingQuestionListLoading: false,
        questionList: action.payload,
      };
    case FETCH_QUESTION_LIST_FAILURE:
      return {
        ...state,
        fetchingQuestionListLoading: false,
        fetchingQuestionListError: action.payload.error,
      };
    case ADD_NEW_SUBMISSION:
      return {
        ...state,
        addingNewSubmissionLoading: true,
        addingNewSubmissionError: "",
      };
    case ADD_NEW_SUBMISSION_SUCCESS:
      return {
        ...state,
        addingNewSubmissionLoading: false,
        activeSubmissionDetails: action.payload,
      };
    case ADD_NEW_SUBMISSION_FAILURE:
      return {
        ...state,
        addingNewSubmissionLoading: false,
        addingNewSubmissionError: action.payload.error,
      };
    case FETCH_LAST_SUBMISSION_DETAILS:
      return {
        ...state,
        fetchingSubmissionDetailsLoading: true,
        fetchingSubmissionDetailsError: "",
      };
    case FETCH_LAST_SUBMISSION_DETAILS_SUCCESS: {
      return {
        ...state,
        submissionDetails: action.payload.submissionDetails,
        fetchingSubmissionDetailsLoading: false,
      };
    }
    case FETCH_LAST_SUBMISSION_DETAILS_FAILURE:
      return {
        ...state,
        fetchingSubmissionDetailsLoading: false,
        fetchingSubmissionDetailsError: action.payload.error,
      };
    case UPDATE_CURRENT_QUESTION:
      return {
        ...state,
        currentQuestion: action.payload + 1,
      };
    case UPDATE_WRONG_QUESTION_COUNT:
      return {
        ...state,
        wrongAnswer: action.payload + 1,
      };
    case ADD_ANSWER:
      return {
        ...state,
        addingNewAnswerLoading: true,
        addingNewAnswerError: "",
      };
    case ADD_ANSWER_SUCCESS: {
      return {
        ...state,
      };
    }
    case ADD_ANSWER_FAILURE:
      return {
        ...state,
        addingNewAnswerLoading: false,
        addingNewAnswerError: action.payload.error,
      };
    case UPDATE_CURRENT_SUBMISSION:
      return {
        ...state,
        updatingSubmissionLoading: true,
        updatingSubmissionError: "",
      };
    case UPDATE_CURRENT_SUBMISSION_SUCCESS: {
      return {
        ...state,

        updatingSubmissionLoading: false,
      };
    }
    case UPDATE_CURRENT_SUBMISSION_FAILURE:
      return {
        ...state,
        updatingSubmissionLoading: false,
        updatingSubmissionError: action.payload.error,
      };
    default:
      return state;
  }
};
export default quizReducer;
