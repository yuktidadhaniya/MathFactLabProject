import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useBeforeunload } from "react-beforeunload";
import { useLastLocation } from "react-router-last-location";
import { useHistory } from "react-router-dom";
import WelcomeBeginLevelLifterTest from "./WelcomeBeginLevelLifterTest";
import ChangeMathOperation from "./ChangeMathOperation";
import PracticeQuestionDeckTablePopup from "components/PracticeQuestionDeckTablePopup";
import Questions from "./Questions";
// import PlacementTestCompletion from "components/PlacementTestCompletion";
import LevelLifterBasicCompletion from "components/LevelLifterBasicCompletion";
import {
  updateCurrentLevelLifterSubmissionDetails,
  updateUserLevelId,
  getStrategies,
  updateUserDetails,
} from "store/action";
import { getLevelLifterErrorCountByUser } from "utils/helpers";

const PracticeTest = props => {
  const dispatch = useDispatch();

  // start level lifter test by click on start button
  const [isShowLevelLifterTest, setIsShowLevelLifterTest] = useState(false);
  const [isShowTestingQuestionDeck, setShowTestingQuestionDeck] = useState(
    false,
  );
  const [activeMathOprationIndex, setActiveMathOprationIndex] = useState(0);
  const [
    isShowLevelLifterBasicCompilation,
    setIsShowLevelLifterBasicCompilation,
  ] = useState(false);
  const [mathOperationKeyList, setMathOperationKeyList] = useState([]);
  const [isShowMathOprationTimer, setIsShowMathOprationTimer] = useState(false);
  const [activeQuizLevelList, setActiveQuizLevelList] = useState([]);
  //Question to be add for retake
  const [retakeQuestionCount, setRetakeQuestionCount] = useState([]);
  const [mathOperationResult, setMathOperationResult] = useState({});

  //error count will change base on wrong answer list
  let wrongErrorCount = 0;
  let isCorrectButNotFluentCount = 0;
  let errorPointCount = 0;

  let history = useHistory();
  const lastLocation = useLastLocation();
  const {
    fetchingLevelLifterQuestionListLoading,
    levelLifterQuestionList: submissionDetails,
    levelLifterSubmissionDetails,
    levelLifterSubmissionCount,
  } = useSelector(({ strategy }) => strategy);

  const { userDetails, fetchingUserDetailsLoading } = useSelector(
    ({ auth }) => auth,
  );

  //For Reset data on page reload or tab close
  useBeforeunload(() => "You'll lose your data!");

  useEffect(() => {
    if (Object.keys(submissionDetails).length) {
      //active quiz level list
      let operationKeyList = Object.keys(submissionDetails);

      setMathOperationKeyList(operationKeyList);

      setActiveQuizLevelList(submissionDetails[operationKeyList[0]]);

      setRetakeQuestionCount(
        Math.ceil(
          (+process.env.REACT_APP_LEVEL_LIFTER_WRONG_COUNT_PERC / 100) *
            submissionDetails[operationKeyList[0]].length,
        ),
      );
    }
  }, [Object.keys(submissionDetails).length]); // eslint-disable-line

  // useEffect(() => {
  //   if (
  //     sessionStorage.getItem("isSessionStarted") === "true" &&
  //     (!sessionStorage.getItem("session_id") ||
  //       sessionStorage.getItem("session_id") === "")
  //   ) {
  //     dispatch(startSession());
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  //Start Level Lifter test
  const handleShowLevelLifterTest = () => {
    setIsShowLevelLifterTest(true);
  };

  const handleUpdateUserLevelId = async () => {
    const {
      profile: { student_learning_mode_id },
    } = userDetails;
    await dispatch(updateUserLevelId({ student_learning_mode_id }));
    dispatch(getStrategies());
  };

  const handleCallBackLevelLifterSubmission = () => {
    dispatch(updateUserDetails());
    dispatch(getStrategies());
  };

  const handleUpdateWrongAnswerList = wrongAnswerList => {
    wrongErrorCount = wrongAnswerList.filter(
      answer => !answer.isCorrectButNotFluent,
    ).length;

    //find a correct but not fluent answer
    isCorrectButNotFluentCount = wrongAnswerList.filter(
      answer => answer.isCorrectButNotFluent,
    ).length;

    // Based on isCorrectButNotFluent errorPointCount will be calculate
    // if wrong answer then count will be increase 2
    // if correctBut N0t Fluent answer then count will be increase 1

    errorPointCount = wrongAnswerList.reduce((acc, ans) => {
      if (ans.isCorrectButNotFluent) {
        return (acc = acc + 1);
      } else {
        return (acc = acc + 2);
      }
    }, 0);
  };

  const {
    profile: {
      add_sub_level_id,
      student_learning_mode_id,
      mul_div_level_id,
      allowed_level_lifter_whoopsies,
    },
  } = userDetails;

  let assigned_level_id =
    student_learning_mode_id === 1 ? +add_sub_level_id : +mul_div_level_id;

  // add-sub level E,K,M & mul-div level E,L,N,T
  let completionLevelByStage =
    student_learning_mode_id === 1 ? [6, 11, 13] : [6, 12, 14, 20];

  const handleChangeMathOpration = () => {
    let updatedMathOprationResult = {
      ...mathOperationResult,
      ...{
        [activeMathOprationIndex]: {
          wrongErrorCount: wrongErrorCount,
          isCorrectButNotFluentCount: isCorrectButNotFluentCount,
          errorPointCount: errorPointCount,
        },
      },
    };

    let updatedActiveMathOprationIndex = activeMathOprationIndex + 1;

    if (mathOperationKeyList.length === updatedActiveMathOprationIndex) {
      const totalErrorCount = Object.values(updatedMathOprationResult).reduce(
        (a, b) => a + b.wrongErrorCount,
        0,
      );
      const totalIsCorrectButNotFluentCount = Object.values(
        updatedMathOprationResult,
      ).reduce((a, b) => a + b.isCorrectButNotFluentCount, 0);

      const totalErrorPointCount = Object.values(
        updatedMathOprationResult,
      ).reduce((a, b) => a + b.errorPointCount, 0);
      // #lastlevel
      if (
        (student_learning_mode_id === 1 && +add_sub_level_id < 26) ||
        (student_learning_mode_id === 2 && +mul_div_level_id < 26)
      ) {
        assigned_level_id =
          student_learning_mode_id === 1
            ? +add_sub_level_id === 17
              ? +add_sub_level_id + 9
              : +add_sub_level_id + 1
            : +mul_div_level_id + 1;
      }

      if (
        totalErrorPointCount <=
        getLevelLifterErrorCountByUser(
          allowed_level_lifter_whoopsies,
          levelLifterSubmissionCount,
        )
      ) {
        const body = {
          assigned_level_id,
          status_id: "lss_057c0a98c0ef85878b6b1185",
        };
        // #lastlevel
        if (
          (student_learning_mode_id === 1 && +add_sub_level_id < 26) ||
          (student_learning_mode_id === 2 && +mul_div_level_id < 26)
        ) {
          dispatch(
            updateCurrentLevelLifterSubmissionDetails(
              body,
              levelLifterSubmissionDetails,
              handleUpdateUserLevelId,
              handleCallBackLevelLifterSubmission,
            ),
          );
        } else {
          dispatch(
            updateCurrentLevelLifterSubmissionDetails(
              body,
              levelLifterSubmissionDetails,
              "",
              handleCallBackLevelLifterSubmission,
            ),
          );
          dispatch(getStrategies());
        }

        // assigned_level_id === 12
        //   ? history.replace("/student/practice-test")
        //   : history.replace(
        //       "/student/practice-select-activity?is_level_lifter_success=true",
        //     );

        if (
          completionLevelByStage.includes(assigned_level_id) ||
          (student_learning_mode_id === 1 && +add_sub_level_id === 17) ||
          (student_learning_mode_id === 2 && +mul_div_level_id === 25)
          // assigned_level_id - 1 === 25
          // levelLifterSubmissionCount === 0
          // ||
          // assigned_level_id === 14
        ) {
          setIsShowLevelLifterTest(false);
          setIsShowMathOprationTimer(false);
          setIsShowLevelLifterBasicCompilation(true);
        } else {
          history.replace(
            `/student/practice-select-activity?is_level_lifter_success=true`,
          );
        }
      } else {
        const {
          profile: {
            add_sub_level_id,
            student_learning_mode_id,
            mul_div_level_id,
          },
        } = userDetails;
        const body = {
          assigned_level_id:
            student_learning_mode_id === 1
              ? +add_sub_level_id
              : +mul_div_level_id,
          status_id: "lss_5b926ac2d0943bd829fead7f",
        };
        dispatch(
          updateCurrentLevelLifterSubmissionDetails(
            body,
            levelLifterSubmissionDetails,
            "",
            handleCallBackLevelLifterSubmission,
          ),
        );

        history.replace(
          `/student/practice-select-activity?is_level_lifter_failed=true&error_count=${totalErrorCount}&correct_but_over_time_count=${totalIsCorrectButNotFluentCount}`,
        );
      }
    } else {
      let updatedActiveQuizLevelList =
        submissionDetails[mathOperationKeyList[updatedActiveMathOprationIndex]];

      setRetakeQuestionCount(
        Math.ceil(
          (+process.env.REACT_APP_LEVEL_LIFTER_WRONG_COUNT_PERC / 100) *
            updatedActiveQuizLevelList.length,
        ),
      );
      setMathOperationResult(updatedMathOprationResult);
      setIsShowMathOprationTimer(true);
      setActiveQuizLevelList(updatedActiveQuizLevelList);
      setActiveMathOprationIndex(updatedActiveMathOprationIndex);
    }
  };

  const addQuestionToQuestionList = questionDetails => {
    setActiveQuizLevelList([...activeQuizLevelList, questionDetails]);
  };

  const handleCloseMathOprationTimer = () => {
    setIsShowMathOprationTimer(false);
  };

  // let userAssignedLevel;

  // if (Object.keys(userDetails)) {
  //   if (userDetails.profile.student_learning_mode_id === 1) {
  //     userAssignedLevel =
  //       +userDetails.profile.add_sub_level_id === 12 ? 12 : false;
  //   } else {
  //     userAssignedLevel =
  //       +userDetails.profile.mul_div_level_id === 12 ? 12 : false;
  //   }
  // }

  //rediection only if not rediected from    /student/practice-select-activity
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

  //For now stopped Redirection because we are directly redirect user after login so
  //   IF user's details has been changes redirect to select activity page

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

  return (
    <>
      {fetchingUserDetailsLoading || fetchingLevelLifterQuestionListLoading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100%",
          }}
        >
          <div className="lds-dual-ring"></div>
        </div>
      ) : isShowLevelLifterBasicCompilation ? (
        <LevelLifterBasicCompletion
          updatedAssignedLevel={assigned_level_id}
          learning_mode={student_learning_mode_id}
        />
      ) : !isShowLevelLifterTest ? (
        <WelcomeBeginLevelLifterTest
          isShowTest={handleShowLevelLifterTest}
          handleShowQuestion={() =>
            setShowTestingQuestionDeck(!isShowTestingQuestionDeck)
          }
          closeMathOprationTimer={handleCloseMathOprationTimer}
        />
      ) : isShowMathOprationTimer ? (
        <ChangeMathOperation
          closeMathOprationTimer={handleCloseMathOprationTimer}
          activeMathOpration={mathOperationKeyList[activeMathOprationIndex]}
          handleShowQuestion={() =>
            setShowTestingQuestionDeck(!isShowTestingQuestionDeck)
          }
        />
      ) : activeQuizLevelList.length > 0 ? (
        <>
          <Questions
            //put unique key for question components
            // key={Math.random()}
            activeQuestionList={activeQuizLevelList}
            changeMathOperation={handleChangeMathOpration}
            addQuestionToQuestionList={addQuestionToQuestionList}
            retakeQuestionCount={retakeQuestionCount}
            updateWrongAnswerList={handleUpdateWrongAnswerList}
          />
        </>
      ) : (
        ""
      )}
      {isShowTestingQuestionDeck && (
        <PracticeQuestionDeckTablePopup
          close={() => setShowTestingQuestionDeck(!isShowTestingQuestionDeck)}
          loading={fetchingLevelLifterQuestionListLoading}
          questionList={activeQuizLevelList}
        />
      )}
    </>
  );
};

export default PracticeTest;
