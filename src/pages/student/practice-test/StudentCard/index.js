import React, { useState, useEffect } from "react";
import Timer from "./Timer";
import KeyboardEventHandler from "react-keyboard-event-handler";

function Question(props) {
  const [currentAnswer, setCurrentAnswer] = useState("");

  const {
    questionDetails,
    // questionDetails: { correct_answer: correctAnswer },
    questionDetails: { question },
    checkAnswerFn,
    duration,
    currentQuestionCount,
  } = props;

  const handleChangeInputAnswer = e => {
    setCurrentAnswer(e.target.value);
  };

  useEffect(() => {
    process.env.REACT_APP_IS_SET_DEFAULT_CORRECT_ANSWER == "YES" &&
      setCurrentAnswer(questionDetails.correct_answer);
  }, [questionDetails]); // eslint-disable-line

  const onEveryTimerChange = currentSeconds => {
    props.sentCurrnetSeconds(currentSeconds);
  };
  return (
    <>
      <Timer
        duration={duration}
        timeoutFn={checkAnswerFn(currentAnswer, questionDetails)}
        onEverySecondChanged={onEveryTimerChange}
        // plz remove rply second
      />
      <section className="main-test-screen has-full-background">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols wrap">
                  <div className="centered-wrap wrap position-relative">
                    <div className="assessment-input-wrapper font-150 text-white text-center">
                      <span>{question}</span>
                      <span>=</span>
                      {/* <div className="input-design"> */}
                      <KeyboardEventHandler
                        handleKeys={["enter", "space"]}
                        onKeyEvent={checkAnswerFn(
                          currentAnswer,
                          questionDetails,
                        )}
                        className="input-design"
                      >
                        <input
                          autoFocus
                          type="text"
                          placeholder=""
                          className="input-field"
                          onChange={e => handleChangeInputAnswer(e)}
                        />
                      </KeyboardEventHandler>
                      {/* </div> */}
                    </div>

                    {questionDetails.level_index === 0 &&
                    currentQuestionCount === 0 ? (
                      <div className="notify-text-wrap">
                        <span className="notify-text">
                          Type the number that you see.
                        </span>
                      </div>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Question;
