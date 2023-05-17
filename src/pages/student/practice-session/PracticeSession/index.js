import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useLastLocation } from "react-router-last-location";
import { checkedObjList } from "config/const";
import Timer from "./Timer";
import Question from "./Question";
import { useDispatch } from "react-redux";
import {
  addBatchPracticeTestAnswerList,
  getStrategies,
  updatePracticeSessionProgressBarCount,
} from "store/action";
import _ from "lodash";
import QuestionDeckTablePopup from "components/QuestionDeckTablePopup";
import { getFluencyRateByLevel } from "utils/helpers";

// import {
//   sampleDigitMinusMultiple,
//   sampleDigitPlusMultiple,
//   sampleDigitMinusTwoDigits,
//   sampleDigitPlusTwoDigits,
//   sampleDigitPlusTwoDigitsOfNine,
//   sampleDigitMinusTwoDigitsOfNine,
// } from "utils/data2";

function PracticeSession(props) {
  let location = useLocation();
  const { strategySlug } = props;
  const query = new URLSearchParams(location.search);
  // let location = useLocation();
  // const sampleDataListByQuery = {
  //   "2-digit-minus-multiple": sampleDigitMinusMultiple,
  //   "2-digit-plus-multiple": sampleDigitPlusMultiple,
  //   "2-digit-minus-2-digit": sampleDigitMinusTwoDigits,
  //   "2-digit-plus-2-digit": sampleDigitPlusTwoDigits,
  //   "2-digit-minus-2-digit-of-nine": sampleDigitMinusTwoDigitsOfNine,
  //   "2-digit-plus-2-digit-of-nine": sampleDigitPlusTwoDigitsOfNine,
  // };
  // const query = new URLSearchParams(location.search);
  // let practiceTestQuestionList
  // let practiceTestQuestionList =
  //   sampleDataListByQuery[query.get("strategy-type")];
  const dispatch = useDispatch();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const [seconds, setSeconds] = useState(0);

  const [practiceStrategyScore, setPracticeStrategyScore] = useState(0);
  const [prevScore, setPrevScore] = useState(0);
  const [isChangeNumPadLayout, setIsShowNumPadLayout] = useState(false);
  const slug = encodeURI(query.get("strategy-type"));

  useEffect(() => {
    const contains = (target, pattern) => {
      let value = 0;
      pattern.forEach(function(word) {
        value = value + target.includes(word);
      });
      return value === 1;
    };
    if (
      contains(slug, [
        "tens-on-a-place-value-chart",
        "open-arrays",
        "five-is-half-of-ten",
        "nines-patterns",
        "eleven-patterns",
        "quarters",
        "missing-addend",
        "ten-frames",
      ])
    ) {
      setIsShowNumPadLayout(true);
    }
  }, [slug]);

  const handleChangeKeypadLayout = () => {
    setIsShowNumPadLayout(!isChangeNumPadLayout);
  };
  let history = useHistory();

  const onEveryTimerChange = seconds => {
    setSeconds(seconds);
  };

  // const isShowTestingQuestionDeck = query.get("isShowQuestionDeck") === "true";
  const [submittedAnswerList, setSubmittedAnswerList] = useState([]);
  const [isShowTestingQuestionDeck, setShowTestingQuestionDeck] = useState(
    false,
  );
  const lastLocation = useLastLocation();

  const [wrongCount, setWrongCount] = useState(0);

  const { userDetails } = useSelector(({ auth }) => auth);
  //redirection only if not redirected from    /student/practice-select-activity
  useEffect(() => {
    if (lastLocation) {
      if (
        lastLocation &&
        lastLocation.pathname !== "/student/practice-select-activity"
      ) {
        history.replace("/student/practice-select-activity");
      }
    } else {
      history.replace("/student/practice-select-activity");
    }
  }, []); // eslint-disable-line

  const {
    practiceTestQuestionList,
    addNewPracticeTestSubmissionDetails,
    studentPracticeTestProgressBarPercentage,
  } = useSelector(({ strategy }) => strategy);

  //potential point calculation
  const correctAnswerInTimePotentialPoint = Number(
    (1000 / practiceTestQuestionList.length).toFixed(2),
  );
  const correctAnswerOverTimePotentialPoint = Number(
    (correctAnswerInTimePotentialPoint / 2).toFixed(2),
  );
  const skippedAnswerPotentialPoint = Number(
    (correctAnswerInTimePotentialPoint / 4).toFixed(2),
  );

  //Redirection IF user's details has been changes
  // redirected to select activity page
  useEffect(() => {
    if (Object.keys(userDetails).length) {
      if (
        userDetails.profile.student_learning_mode_id !==
        +sessionStorage.getItem("user_learning_mode")
      ) {
        history.replace("/student/practice-select-activity");
      }
    }
  }, []); // eslint-disable-line

  //fetch strategy list after practice session submission
  const handleSuccessAddPracticeTestSubmission = () => {
    dispatch(getStrategies());
  };
  const handleShowNextQuestion = (answer, questionDetails) => {
    const { level_index } = questionDetails;
    // if (answer !== questionDetails.checkedField) {
    //   setWrongCount(wrongCount + 1);
    // } else {
    if (answer + "" !== questionDetails[questionDetails.checkedField] + "") {
      setWrongCount(wrongCount + 1);
    } else {
      let updatedPracticeStrategyScore;
      const submittedAnswer = {
        question_id: questionDetails.id,
        strategy_id: questionDetails.strategy_id,
        answer:
          questionDetails.checkedField === checkedObjList[3] ||
          questionDetails.checkedField === checkedObjList[4]
            ? questionDetails.correct_answer + ""
            : answer,
        retry_count: 1,
        is_correct: 1,
        time_taken_in_secs: seconds,
      };

      const fluencyRateByLevel = getFluencyRateByLevel(
        userDetails.profile.student_learning_mode_id,
        level_index,
      );

      let questionScoreCount =
        questionDetails.userClickedHintCount > 0 ||
        seconds >
          userDetails.profile.max_timeout_correct_ans_secs *
            fluencyRateByLevel ||
        wrongCount > 0
          ? correctAnswerOverTimePotentialPoint
          : correctAnswerInTimePotentialPoint;

      updatedPracticeStrategyScore = practiceStrategyScore + questionScoreCount;
      // setPrevScore(practiceStrategyScore);
      // setPracticeStrategyScore(updatedPracticeStrategyScore);

      //round float number
      setPrevScore(Number(practiceStrategyScore.toFixed(2)));
      setPracticeStrategyScore(Number(updatedPracticeStrategyScore.toFixed(2)));

      setSubmittedAnswerList([...submittedAnswerList, submittedAnswer]);
      setWrongCount(0);
      if (practiceTestQuestionList.length === currentQuestionIndex + 1) {
        dispatch(
          updatePracticeSessionProgressBarCount(
            currentQuestionIndex,
            practiceTestQuestionList.length,
          ),
        );

        // send extra params if grp strategy compelted
        if (strategySlug.includes("stage")) {
          history.replace("/student/practice-select-activity?is_grp_str=true");
        } else {
          history.replace("/student/practice-select-activity");
        }
        // setTimeout(() => {

        // }, 1000);

        const practice_test_submissions_id = sessionStorage.getItem(
          "practice_test_submissions_id",
        );

        const body = {
          practice_test_submission_id: _.isEmpty(
            addNewPracticeTestSubmissionDetails,
          )
            ? practice_test_submissions_id
            : addNewPracticeTestSubmissionDetails.id,
          answers: [...submittedAnswerList, submittedAnswer],
          score: updatedPracticeStrategyScore,
          // score: 0,
        };
        dispatch(
          addBatchPracticeTestAnswerList(
            body,
            handleSuccessAddPracticeTestSubmission,
          ),
        );
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        // current index as param to calculate progress count
        dispatch(
          updatePracticeSessionProgressBarCount(
            currentQuestionIndex,
            practiceTestQuestionList.length,
          ),
        );
      }
    }
  };
  function handleSkipQuesion(questionDetails) {
    let updatedPracticeStrategyScore;

    updatedPracticeStrategyScore =
      practiceStrategyScore + skippedAnswerPotentialPoint;
    // setPrevScore(practiceStrategyScore);
    // setPracticeStrategyScore(updatedPracticeStrategyScore);

    //round float number
    setPrevScore(Number(practiceStrategyScore.toFixed(2)));
    setPracticeStrategyScore(Number(updatedPracticeStrategyScore.toFixed(2)));

    if (practiceTestQuestionList.length === currentQuestionIndex + 1) {
      setCurrentQuestionIndex(0);
      setWrongCount(0);
      setSeconds(0);
      const submittedAnswer = {
        question_id: questionDetails.id,
        strategy_id: questionDetails.strategy_id,
        answer: "",
        retry_count: 1,
        is_correct: 0,
        time_taken_in_secs: seconds,
      };

      dispatch(
        updatePracticeSessionProgressBarCount(
          currentQuestionIndex,
          practiceTestQuestionList.length,
        ),
      );
      // setTimeout(() => {
      if (strategySlug.includes("stage")) {
        history.replace("/student/practice-select-activity?is_grp_str=true");
      } else {
        history.replace("/student/practice-select-activity");
      }
      // }, 1000);

      const practice_test_submissions_id = sessionStorage.getItem(
        "practice_test_submissions_id",
      );

      const body = {
        practice_test_submission_id: _.isEmpty(
          addNewPracticeTestSubmissionDetails,
        )
          ? practice_test_submissions_id
          : addNewPracticeTestSubmissionDetails.id,
        answers: [...submittedAnswerList, submittedAnswer],

        //for now just passed static score
        // score: 0,

        score: updatedPracticeStrategyScore,
      };
      dispatch(
        addBatchPracticeTestAnswerList(
          body,
          handleSuccessAddPracticeTestSubmission,
        ),
      );
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // current index as param to calculate progress count
      dispatch(
        updatePracticeSessionProgressBarCount(
          currentQuestionIndex,
          practiceTestQuestionList.length,
        ),
      );
      setWrongCount(0);
      setSeconds(0);
      const submittedAnswer = {
        question_id: questionDetails.id,
        strategy_id: questionDetails.strategy_id,
        answer: "",
        retry_count: 1,
        is_correct: 0,
        time_taken_in_secs: seconds,
      };
      setSubmittedAnswerList([...submittedAnswerList, submittedAnswer]);
    }
  }
  if (!practiceTestQuestionList.length) {
    return null;
  }

  return (
    <>
      <div key={currentQuestionIndex}>
        <Timer
          questionKey={currentQuestionIndex}
          rightAnswerTime={
            userDetails.profile.max_timeout_correct_ans_secs *
            getFluencyRateByLevel(
              userDetails.profile.student_learning_mode_id,
              practiceTestQuestionList[currentQuestionIndex].level_index,
            )
          }
          timeoutFn={onEveryTimerChange}
          onEverySecondChanged={onEveryTimerChange}
          showQuestionTimer={
            process.env.REACT_APP_IS_SHOW_BACKGROUND_TIMER === "YES"
          }
        />

        <Question
          questionDetails={practiceTestQuestionList[currentQuestionIndex]}
          showNextQuestion={handleShowNextQuestion}
          seconds={seconds}
          resetTimer={seconds => setSeconds(seconds)}
          wrongCount={wrongCount}
          handleSkipQuesion={handleSkipQuesion}
          handleShowQuestion={() =>
            setShowTestingQuestionDeck(!isShowTestingQuestionDeck)
          }
          prevScore={prevScore}
          practiceStrategyScore={practiceStrategyScore}
          currentQuestionIndex={currentQuestionIndex}
          practiceTestQuestionList={practiceTestQuestionList}
          studentPracticeTestProgressBarPercentage={
            studentPracticeTestProgressBarPercentage
          }
          isChangeNumPadLayout={isChangeNumPadLayout}
          changeKeypadLayout={handleChangeKeypadLayout}
        />
      </div>

      {isShowTestingQuestionDeck && (
        <QuestionDeckTablePopup
          close={() => setShowTestingQuestionDeck(!isShowTestingQuestionDeck)}
          loading={false}
          questionList={practiceTestQuestionList}
        />
      )}
    </>
  );
}

export default PracticeSession;
