import React from "react";

import "assets/sass/components/button-ant.scss";
import { EnterOutlined } from "@ant-design/icons";
import { strategyDetailBySlug } from "config/const";

function NumberPad(props) {
  const {
    handleEnterInput,
    passEnteredAnswer,
    inputAnswer,
    hintClickedCount,
    resetTimer,
    showNextQuestion,
    userClickedHintCount,
    questionDetails,
    questionDetails: { slug, checkedField },
    handleRightAnswer,
    handleWrongAnswer,
  } = props;

  const handleEnteredInput = event => {
    if (inputAnswer.length <= 2) {
      handleEnterInput(inputAnswer + event);
    }
  };

  const handleErase = () => {
    handleEnterInput("");
  };

  const checkAnswerFn = (answer, questionDetails) => {
    //add hint count in question details for checking answer is with hint or without hint use
    let updatedQuestionDetails = Object.assign(questionDetails, {
      hintClickedCount,
      userClickedHintCount,
    });

    // find active strategy enum
    const activeStrategyEnum = Object.keys(strategyDetailBySlug).find(
      strategyEnum => strategyDetailBySlug[strategyEnum].slug === slug,
    );
    const handleRightAnswerTimer = () => {
      setTimeout(() => {
        handleRightAnswer(false);
        // if (practiceTestQuestionList.length !== currentQuestionIndex + 1) {
        handleEnterInput("");
        // }
        showNextQuestion(answer, updatedQuestionDetails);
        resetTimer(0);
      }, strategyDetailBySlug[activeStrategyEnum].rightAnswerTime);
      passEnteredAnswer(answer);
      // +process.env.REACT_APP_RIGHT_ANSWER_TIME
    };

    const handleWrongAnswerTimer = () => {
      setTimeout(() => {
        handleWrongAnswer(false);
        // if (practiceTestQuestionList.length !== currentQuestionIndex + 1) {
        handleEnterInput("");
        // }
        showNextQuestion(answer, updatedQuestionDetails);
        resetTimer(0);
        passEnteredAnswer("");
      }, strategyDetailBySlug[activeStrategyEnum].wrongAnswerTime);
      passEnteredAnswer(answer);
    };

    if (answer + "" === questionDetails[checkedField] + "") {
      handleRightAnswer(true);
      handleRightAnswerTimer();
    } else {
      handleWrongAnswer(true);
      handleWrongAnswerTimer();
    }
  };

  return (
    <>
      <div className="number-pad">
        <div className="number-pad-row">
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(1)}
          >
            1
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(2)}
          >
            2
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(3)}
          >
            3
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(4)}
          >
            4
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(5)}
          >
            5
          </div>
          <div className="number-pad-enter-cell" onClick={() => handleErase()}>
            Erase
          </div>
        </div>
        <div className="number-pad-row">
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(6)}
          >
            6
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(7)}
          >
            7
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(8)}
          >
            8
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(9)}
          >
            9
          </div>
          <div
            className="number-pad-cell"
            onClick={() => handleEnteredInput(0)}
          >
            0
          </div>
          <div
            className="number-pad-enter-cell"
            onClick={() => checkAnswerFn(inputAnswer, questionDetails)}
          >
            <EnterOutlined />
            Enter
          </div>
        </div>
      </div>
    </>
  );
}

export default NumberPad;
