import React, { useState } from "react";
import calcAdditionImg from "assets/images/other/calc-addition.svg";
import calcDivisionImg from "assets/images/other/calc-division.svg";
import calcMultiplicationImg from "assets/images/other/calc-multiplication.svg";
import calcSubtractionImg from "assets/images/other/calc-subtraction.svg";
import Timer from "components/Timer";
import Button from "components/Button";
import ReactGA from "react-ga";
// import useKeypress from "react-use-keypress";

const LevelDirections = props => {
  // const dispatch = useDispatch();
  const { activeMathOpration, handleShowQuestion } = props;

  const [isShowTimer, setIsShowTimer] = useState(false);

  const mathOprationList = {
    Addition: {
      title: "addition",
      img: calcAdditionImg,
    },

    Subtraction: {
      title: "subtraction",
      img: calcSubtractionImg,
    },
    Multiplication: {
      title: "multiplication",
      img: calcMultiplicationImg,
    },
    Division: {
      title: "division",
      img: calcDivisionImg,
    },
  };

  // Key press Event
  // useKeypress("Enter", () => {
  //   // Timeout because its collapsing

  //   const timer = setTimeout(() => {
  //     // Do something when the user has pressed the Space and Enter key
  //     handleStartTimer();
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // });

  const handleStartTimer = () => {
    setIsShowTimer(true);
    if (
      process.env.REACT_APP_ENV !== "development" ||
      process.env.REACT_APP_ENV !== "staging"
    ) {
      ReactGA.event({
        category: `${process.env.REACT_APP_ENV}: Level Lifter  test `,
        action: `Student clicked Begin  ${activeMathOpration} Test`,
        label: "Student page",
      });
    }
  };

  const handleCloseTimer = () => {
    setIsShowTimer(false);
    props.closeMathOprationTimer();
  };

  const handleShowQuestionDeck = () => {
    // dispatch(getLevelLifterQuestionList());
    handleShowQuestion();
  };

  return (
    <>
      <section className="main-test-screen">
        <div className="col-xs-12">
          <div className="row">
            <div className="container">
              <div className="main-test-wrap">
                <div className="main-test-left main-test-cols">
                  <div className="centered-wrap wrap position-relative">
                    <>
                      {/* <span className="watermark-text op-8">Try your best</span> */}
                      <span className="watermark-text op-8">Level Lifter</span>
                      <div className="assessment-content">
                        <div className="level-lifter-wrap">
                          <i className="icon-levellifter"></i>{" "}
                          <span className="btn-text">Level Lifter</span>
                        </div>

                        <p className="mt-5 mb-0">
                          Now get ready for some <br />
                          <span>
                            {mathOprationList[activeMathOpration].title}
                          </span>{" "}
                          problems. <br />
                          <p className="mt-5 mb-0 level-lifter-desc">
                            Level Lifter questions do not have models or hints.
                          </p>
                        </p>
                        {/* <p>
                          Level Lifter questions do not have models or hints.
                        </p> */}
                        <p className="mb-0">
                          Press <b>‘Begin’</b> when you are ready.
                        </p>
                      </div>
                      <div
                        className="test-button-wrap"
                        style={{ height: "80px" }}
                      >
                        {isShowTimer ? (
                          <>
                            <Timer closeTimer={handleCloseTimer} />
                          </>
                        ) : (
                          <Button
                            className="btn btn-test"
                            name={"Begin"}
                            onClick={() => handleStartTimer()}
                          />
                        )}{" "}
                      </div>
                      {/* Only show question in development and staging */}
                      {(process.env.REACT_APP_ENV === "development" ||
                        process.env.REACT_APP_ENV === "staging") && (
                        <div
                          style={{
                            position: "absolute",
                            bottom: 0,
                            right: 0,
                          }}
                        >
                          <button
                            className="btn btn-test"
                            onClick={() => handleShowQuestionDeck()}
                          >
                            Show Qns
                          </button>
                        </div>
                      )}
                      {/* <p className="bottom-no-hint-text">
                        • Level Lifter questions do not have models or hints.
                      </p> */}
                    </>
                  </div>
                </div>
                <div className="main-test-right main-test-cols">
                  <div className="test-vector">
                    <img
                      src={mathOprationList[activeMathOpration].img}
                      className="vec-img"
                      alt="vec-img"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LevelDirections;
